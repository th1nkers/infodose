import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './Auth.css';
import { useState, useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const Auth = () => {
  // Context for authentication
  const auth = useContext(AuthContext);

  // State for login/signup mode
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Custom HTTP hook for making API requests
  const { loading, error, sendRequest, clearError } = useHttpClient();

  // Form hook for managing form state and input validation
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  // Switch between login and signup modes
  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
          isValid: false},
        image:{
          value: null,
          isValid: false
        }},
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  // Submit the login/signup form
  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        // Send a POST request to log in the user
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );

        // Log in the user and update the authentication context
        auth.login(responseData.userId, responseData.token);
      } catch (err) {
        // Handle any errors that occur during the login request
      }
    } else {
      try {

        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('name', formState.inputs.name.value);
        formData.append('image', formState.inputs.image.value);

        // Send a POST request to sign up the user
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          'POST',
          formData
        );

        // Log in the user and update the authentication context
        auth.login(responseData.userId, responseData.token);
      } catch (err) {
        // Handle any errors that occur during the signup request
      }
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {loading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && <ImageUpload id="image" onInput={inputHandler}/>}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 5 characters."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'Login' : 'Signup'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          Switch to {isLoginMode ? 'Signup' : 'Login'}!
        </Button>
      </Card>
    </>
  );
};

export default Auth;
