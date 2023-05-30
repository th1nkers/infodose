import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
  // Custom HTTP hook for making API requests
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Send a GET request to fetch users from the API
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );

        // Update the state with the fetched users
        setLoadedUsers(responseData.users);
      } catch (err) {
        // Handle any errors that occur during the request
      }
    };

    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {/* Display an error modal if there is an error */}
      <ErrorModal error={error} onClear={clearError} />

      {/* Display a loading spinner while the request is in progress */}
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {/* Display the list of users if they are loaded */}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
