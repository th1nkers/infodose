import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import './DocItem.css';
import Button from '../../shared/components/UIElements/Button'

const DocItem = props => {
  return (
    <li className="doc-item">
      <Card className="doc-item__content">
        <div className="doc-item__image">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="doc-item__info">
          <h2>{props.title}</h2>
          <h3>{props.address}</h3>
          <p>{props.description}</p>
        </div>
        <div className="doc-item__actions">
          <Button inverse>VIEW ON MAP</Button>
          <Button to={`/docs/${props.id}`}>EDIT</Button>
          <Button danger>DELETE</Button>
        </div>
      </Card>
    </li>
  );
};

export default DocItem;
