import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const ButtonDoneRecipes = () => (
  <Container className="mb-3">
    <Link to="/done-recipes">
      <Button
        type="button"
        variant="success"
        id="profile-done-btn"
        className="col-12"
        data-testid="profile-done-btn"
      >
        Done Recipes
      </Button>
    </Link>
  </Container>
);

export default ButtonDoneRecipes;
