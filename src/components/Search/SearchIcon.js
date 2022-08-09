import React from 'react';
import PropTypes from 'prop-types';

import { Image } from 'react-bootstrap';
import searchIcon from '../../images/searchIcon.svg';

const SearchIcon = ({ handleSearch }) => (
  <Image
    type="button"
    id="search-top-btn"
    src={ searchIcon }
    onClick={ handleSearch }
    data-testid="search-top-btn"
  />
);

SearchIcon.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default SearchIcon;
