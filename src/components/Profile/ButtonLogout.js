import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ButtonLogout = ({ handleLogout }) => (
  <Container className="mb-3">
    <Link to="/">
      <Button
        type="button"
        variant="success"
        id="profile-logout-btn"
        className="col-12"
        onClick={ handleLogout }
        data-testid="profile-logout-btn"
      >
        Logout
      </Button>
    </Link>
  </Container>
);

ButtonLogout.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default ButtonLogout;
