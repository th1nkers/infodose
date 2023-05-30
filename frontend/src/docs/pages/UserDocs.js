import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DocsList from '../components/DocsList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UserDocs = () => {
    const [loadedDocs, setLoadedDocs] = useState();
    const { loading, error, sendRequest, clearError } = useHttpClient();

    // Get the userId from the URL parameters using the useParams hook from React Router
    const userId = useParams().userId;

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                // Fetch user docs using the userId
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/docs/user/${userId}`
                );
                setLoadedDocs(responseData.docs);
            } catch (err) { }
        };
        fetchDocs();
    }, [sendRequest, userId]);


    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {loading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!loading && loadedDocs && <DocsList items={loadedDocs} />}
        </>
    );
}

export default UserDocs;
