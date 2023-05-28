import React, { useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import './DocItem.css';
import Button from '../../shared/components/FormElements/Button'
import Modal from '../../shared/components/UIElements/Modal'
import { useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';

const DocItem = props => {

  const auth = useContext(AuthContext)

  const [showMap, setShowMap] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true)
  }

  const closeDeleteWarningHandler = () => {
    setShowConfirmModal(false)
  }

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false)
    console.log('Deleting..');
  }

  return (
    <>
      <Modal show={showMap} onCancel={closeMapHandler} header={props.address} contentClass="doc-item__modal-content"
        footerClass="place-item__modal-content"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <h2>The Map!</h2>
        </div>
      </Modal>

      <Modal
        show={showConfirmModal}
        onCancel={closeDeleteWarningHandler}
        header="Are you sure?"
        footerClass="doc-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={closeDeleteWarningHandler}>Cancel</Button>
            <Button danger onClick={confirmDeleteHandler}>Delete</Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this doc? Please note that it can't be undone thereafter.
        </p>
      </Modal>

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
            <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
            {auth.isLoggedIn && (<> <Button to={`/docs/${props.id}`}>EDIT</Button>
              <Button danger onClick={showDeleteWarningHandler} >DELETE</Button></>)}
          </div>
        </Card>
      </li>
    </>
  );
};

export default DocItem;
