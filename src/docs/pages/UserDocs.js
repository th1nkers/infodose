import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DocsList from '../components/DocsList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UserDocs = () => {
    const [loadedDocs, setLoadedDocs] = useState();
    const { loading, error, sendRequest, clearError } = useHttpClient();

    const userId = useParams().userid;

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/docs/user/${userId}`
                );
                setLoadedDocs(responseData.docs);
            } catch (err) { }
        };
        fetchDocs();
    }, [sendRequest, userId]);


    return <>
        <ErrorModal error={error} onClear={clearError} />
        {loading && (
            <div className="center">
                <LoadingSpinner />
            </div>
        )}
         {!loading && loadedDocs && <DocsList items={loadedDocs} />}
    </>
}

export default UserDocs
