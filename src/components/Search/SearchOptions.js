import React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SearchOptions = ({ option, handleChange }) => (
  <Container className="mt-2 mb-1 btn btn-md border border-3 col-12 bg-light">
    <label
      htmlFor="ingredient-search-radio"
      className="form-check form-check-inline"
    >
      <input
        type="radio"
        id="ingredient-search-radio"
        name="search-radio"
        value="ingredient"
        checked={ option === 'ingredient' }
        className="form-check-input"
        onChange={ handleChange }
        data-testid="ingredient-search-radio"
      />
      Ingredient
    </label>
    <label
      htmlFor="name-search-radio"
      className="form-check form-check-inline"
    >
      <input
        type="radio"
        id="name-search-radio"
        name="search-radio"
        value="name"
        checked={ option === 'name' }
        className="form-check-input"
        onChange={ handleChange }
        data-testid="name-search-radio"
      />
      Name
    </label>
    <label
      htmlFor="first-letter-search-radio"
      className="form-check form-check-inline"
    >
      <input
        type="radio"
        id="first-letter-search-radio"
        name="search-radio"
        value="first-letter"
        checked={ option === 'first-letter' }
        className="form-check-input"
        onChange={ handleChange }
        data-testid="first-letter-search-radio"
      />
      First Letter
    </label>
  </Container>
);

SearchOptions.propTypes = {
  option: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SearchOptions;
