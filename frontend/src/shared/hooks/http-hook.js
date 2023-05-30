import { useEffect } from "react";
import { useRef } from "react";
import { useCallback, useState } from "react";

export const useHttpClient = () => {
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    const activeHttpRequests = useRef([]); // Ref to keep track of active HTTP requests

    // Function to send HTTP requests
    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {})  => {

        setLoading(true); // Start loading

        const httpAbortCtrl = new AbortController(); // Create an AbortController for the request
        activeHttpRequests.current.push(httpAbortCtrl); // Add the AbortController to the list of active requests

        try {
            const response = await fetch(url, {
                method,
                headers,
                body,
                signal: httpAbortCtrl.signal // Pass the AbortSignal to the request
            });

            const responseData = await response.json();

            // Remove the completed request's AbortController from the list of active requests
            activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl);

            if (!response.ok) {
                throw new Error(responseData.message);
            }

            setLoading(false); // Finish loading
            return responseData;

        } catch (err) {
            setError(err.message);
            setLoading(false); // Finish loading
            throw err;
        }
    }, []);

    // Function to clear the error
    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        // Cleanup function to abort all active requests when the component unmounts
        return () => {
            activeHttpRequests.current.forEach((abortCtrl) => {
                abortCtrl.abort(); // Abort each active request
            });
        };
    }, []);

    // Return the state and functions as an object
    return { loading, error, sendRequest, clearError };
};
