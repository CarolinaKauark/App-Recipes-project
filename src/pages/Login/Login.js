import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  InputGroup,
  Button,
  Container,
} from 'react-bootstrap';

import './login.css';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const formValidation = () => {
    const pwdMin = 6;
    const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailValidation = email.match(emailFormat);
    const pwdValidation = password.length >= pwdMin;
    if (emailValidation && pwdValidation) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
    formValidation();
  };

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
    formValidation();
  };

  const handleClick = () => {
    setEmail(email);
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/foods');
  };

  const titleFontSize = 40;
  const titleStyle = { fontSize: `${titleFontSize}px` };

  return (
    <Container className="pt-3 login">
      <Container className="border border-success rounded bg-light shadow mb-5">
        <h1 className="text-center">
          <span style={ titleStyle }>&#129367;</span>
          Recipes
          <span style={ titleStyle }>&#127865;</span>
        </h1>
      </Container>
      <Form className="border border-success p-3 rounded bg-light shadow">
        <h2 className="text-center">Sign-In</h2>
        <FormGroup className="mb-3" controlId="email">
          <Form.Label>E-mail</Form.Label>
          <InputGroup>
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
              type="email"
              placeholder="Enter Your E-mail"
              value={ email }
              onChange={ handleEmail }
              data-testid="email-input"
            />
          </InputGroup>
        </FormGroup>

        <FormGroup className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <InputGroup.Text>#</InputGroup.Text>
            <Form.Control
              type="password"
              placeholder="Enter Your Password"
              value={ password }
              onChange={ handlePassword }
              data-testid="password-input"
            />
          </InputGroup>
        </FormGroup>

        <FormGroup className="d-grid gap-2" controlId="loginButton">
          <Button
            variant="success"
            type="button"
            disabled={ isDisabled }
            className="col-12"
            onClick={ handleClick }
            data-testid="login-submit-btn"
          >
            Login
          </Button>
        </FormGroup>
      </Form>
    </Container>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
