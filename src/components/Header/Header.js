import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Title from './Title';
import ProfileIcon from './ProfileIcon';
import SearchBar from '../Search/SearchBar';
import SearchIcon from '../Search/SearchIcon';

const Header = ({ title }) => {
  const [searchEnable, setSearchEnable] = useState(false);
  const haveSearch = ['/foods', '/drinks'];
  const location = useLocation();

  const handleSearch = () => {
    setSearchEnable(!searchEnable);
  };

  return (
    <>
      <Navbar bg="light" className="border-bottom border-success bg-gradient">
        <Nav className="col-3 justify-content-start">
          <ProfileIcon />
        </Nav>
        <Nav className="col-6 justify-content-center">
          <Title title={ title } />
        </Nav>
        <Nav className="col-3 justify-content-end">
          { haveSearch.includes(location.pathname)
          && <SearchIcon handleSearch={ handleSearch } /> }
        </Nav>
      </Navbar>
      { searchEnable && <SearchBar /> }
    </>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
