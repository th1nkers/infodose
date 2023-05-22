import React from 'react';

import FieldItem from './FieldItem';
import './FieldsList.css';

const FieldsList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No fields found.</h2>
      </div>
    );
  }

  return (
    <ul className="fields-list">
      {props.items.map(field => (
        <FieldItem
          key={field.id}
          id={field.id}
          field_image={field.field_image}
          field_name={field.field_name}
          field_counts={field.field_counts}
        />
      ))}
    </ul>
  );
};

export default FieldsList;
