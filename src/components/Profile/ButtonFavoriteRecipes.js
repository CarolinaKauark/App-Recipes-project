import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const ButtonFavoriteRecipes = () => (
  <Container className="mb-3">
    <Link to="/favorite-recipes">
      <Button
        type="button"
        variant="success"
        id="profile-favorite-btn"
        className="col-12"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </Button>
    </Link>
  </Container>
);

export default ButtonFavoriteRecipes;
