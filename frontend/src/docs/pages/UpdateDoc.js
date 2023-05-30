import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const UpdateDoc = () => {
  const auth = useContext(AuthContext);
  const { loading, error, sendRequest, clearError } = useHttpClient();
  const [loadedDoc, setLoadedDoc] = useState();
  const docId = useParams().docId;
  const history = useHistory();

  // Form state management using the useForm hook
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        // Fetch the document data using the docId from the URL
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/docs/${docId}`
        );
        setLoadedDoc(responseData.doc);

        // Set the initial form data and validity based on the fetched document
        setFormData(
          {
            title: {
              value: responseData.doc.title,
              isValid: true
            },
            description: {
              value: responseData.doc.description,
              isValid: true
            }
          },
          true
        );
      } catch (err) {}
    };
    fetchDoc();
  }, [sendRequest, docId, setFormData]);

  const docUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      // Send a PATCH request to update the document
      await sendRequest(
        `${process.env.REACT_APP_ASSET_URL}/docs/${docId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      // Redirect to the document list after successful update
      history.push('/' + auth.userId + '/docs');
    } catch (err) {}
  };

  if (loading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedDoc && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find doc!</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!loading && loadedDoc && (
        <form className="doc-form" onSubmit={docUpdateSubmitHandler}>
          {/* Input components for title and description */}
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedDoc.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedDoc.description}
            initialValid={true}
          />
          {/* Button to submit the form */}
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE doc
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdateDoc;
