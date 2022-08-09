import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './BasicCard.css';

function BasicCard(props) {
  const { pathname, index, dataTitle } = props;
  const type = pathname === '/foods' ? 'Meal' : 'Drink';
  const {
    [`str${type}Thumb`]: img,
    [`str${type}`]: title,
    [`id${type}`]: id,
  } = props;

  return (
    <Link
      className="recipe-card card mb-3 bg-light"
      data-testid={ `${index}-recipe-card` }
      to={ `${pathname}/${id}` }
    >
      <img
        className="recipe-card-img card-img-top img-thumbnail"
        data-testid={ `${index}-card-img` }
        src={ img }
        alt=""
        width={ 100 }
      />
      <p
        className="card-title text-center mt-2 col-12 text-dark"
        data-testid={ dataTitle }
      >
        {title}
      </p>
    </Link>
  );
}

BasicCard.propTypes = {
  pathname: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  dataTitle: PropTypes.string.isRequired,
};

export default BasicCard;
