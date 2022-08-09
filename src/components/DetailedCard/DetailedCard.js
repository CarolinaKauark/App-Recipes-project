import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShareButton from '../ShareButton';
import FavoriteButton from '../FavoriteButton';
//
function DetailedCard(props) {
  const {
    type,
    nationality,
    category,
    alcoholicOrNot,
    name,
    image,
    doneDate,
    tags,
    index,
    id,
  } = props;
  return (
    <div className="card mb-3 mx-3 bg-light">
      <h5
        data-testid={ `${index}-horizontal-name` }
        className="card-title text-center mt-2"
      >
        {name}
      </h5>
      <Link to={ `/${type}s/${id}` }>
        <img
          className="card-img-top img-thumbnail"
          width={ 100 }
          src={ image }
          alt=""
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <ShareButton
            className="p-2"
            dataTest={ `${index}-horizontal-share-btn` }
            path={ `/${type}s/${id}` }
          />
          { doneDate ? (
            <p
              className="pt-4"
              data-testid={ `${index}-horizontal-done-date` }
            >
              {doneDate.split('T')[0]}

            </p>)
            : (
              <FavoriteButton
                className="p-2"
                dataTest={ `${index}-horizontal-favorite-btn` }
                info={ props }
              />
            )}
        </div>
        <div className="d-flex justify-content-between mt-2">
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {type === 'food' ? `${nationality} - ${category}` : alcoholicOrNot}
          </p>
          { tags?.length ? tags.map((tag, i) => (
            <span key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</span>
          )) : null}
        </div>
      </div>
    </div>
  );
}

DetailedCard.propTypes = {
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  doneDate: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string.isRequired,
};

DetailedCard.defaultProps = {
  doneDate: undefined,
  tags: undefined,
};

export default DetailedCard;
