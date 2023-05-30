import React from 'react';

import UserItem from './UserItem';
import './UsersList.css';

const UsersList = props => {
  // Check if there are no users
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No users found.</h2>
      </div>
    );
  }

  // Render the list of users
  return (
    <ul className="users-list">
      {props.items.map(user => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          docCount={user.docs.length}
        />
      ))}
    </ul>
  );
};

export default UsersList;
