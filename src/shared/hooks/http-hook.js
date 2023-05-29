import { useEffect } from "react";
import { useRef } from "react";
import { useCallback, useState } from "react";

export const useHttpClient = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {

        setLoading(true);
        const httpAbortCtrll = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrll)

        try {
            const response = await fetch(
                url, {
                method,
                headers,
                body,
                signal: httpAbortCtrll.signal
            }
            );

            const responseData = await response.json();

            activeHttpRequests.current = activeHttpRequests.current.filter(reqCrl=>reqCrl!==httpAbortCtrll)

            if (!response.ok) {
                throw new Error(responseData.message)
            }

            setLoading(false)
            return responseData;

        } catch (err) {
            setError(err.message);
            setLoading(false)
            throw err;
        }
        setLoading(false)
    }, [])

    const clearError = () => {
        setError(null)
    }

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach((abortCtrll) => {
                abortCtrll.abort()
            })
        }
    }, [])

    return { loading, error, sendRequest, clearError }

}