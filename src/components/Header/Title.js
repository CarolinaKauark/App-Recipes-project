import React from 'react';
import { Navbar } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Title = ({ title }) => (
  <Navbar.Text>
    <h2
      className="text-dark text-uppercase text-center"
      data-testid="page-title"
    >
      { title }
    </h2>
  </Navbar.Text>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
