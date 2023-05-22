import React from 'react';

import './FieldItem.css';

const FieldItem = props => {
  return (
    <li className="field-item">
      <div className="field-item__content">
        <div className="field-item__image">
          <img src={props.field_image} alt={props.field_name} />
        </div>
        <div className="field-item__info">
          <h2>{props.field_name}</h2>
          <h3>
            {props.field_count} {props.field_count === 1 ? 'Topic' : 'Topics'}
          </h3>
        </div>
      </div>
    </li>
  );
};

export default FieldItem;
