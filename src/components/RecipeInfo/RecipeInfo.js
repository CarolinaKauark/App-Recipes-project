import React from 'react';
import PropTypes from 'prop-types';
import './RecipeInfo.css';
import ListGroup from 'react-bootstrap/ListGroup';

function RecipeInfo({ recipe, handleChange }) {
  const { isDetails, isFood, img,
    title, category, instructions, ingredients, video } = recipe;
  return (
    <div className="recipeInfos m-3">
      <img
        src={ img }
        className="card-img-top img-thumbnail"
        alt="recipePhoto"
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title" className="ricipe-title">
        {title}
      </h2>
      <p data-testid="recipe-category" className="recipe-category">
        {category}
      </p>

      {isDetails ? (
        ingredients.map((ingredient, index) => (
          <ListGroup key={ index }>
            <ListGroup.Item data-testid={ `${index}-ingredient-name-and-measure` }>
              {`${ingredient.measure} ${ingredient.ingredient}`}
            </ListGroup.Item>
          </ListGroup>
        ))) : (
        ingredients.map((ingredient, index) => (
          <div key={ index } className="form-check mb-3 mx-1">
            <label
              htmlFor={ ingredient.ingredient }
              data-testid={ `${index}-ingredient-step` }
              className="form-check-label"
            >
              <input
                className="form-check-input"
                type="checkbox"
                id={ ingredient.ingredient }
                value={ ingredient.ingredient }
                name="ingredientStep"
                onChange={ handleChange }
                checked={ ingredient.checked }
              />
              {`${ingredient.measure} ${ingredient.ingredient}`}
            </label>
          </div>
        )))}

      <p
        data-testid="instructions"
        className="text-justify"
      >
        {instructions}
      </p>
      {isFood ? (
        <div
          data-testid="video"
          className="ratio"
        >
          <iframe
            title="youtube video"
            src={ video.replace('watch?v=', 'embed/') }
            frameBorder="0"
            allowFullScreen
            width="100%"
          />
        </div>) : null}
    </div>
  );
}

RecipeInfo.propTypes = {
  recipe: PropTypes.shape({
    isDetails: PropTypes.bool.isRequired,
    isFood: PropTypes.bool.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.object),
    video: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func,
};

RecipeInfo.defaultProps = {
  handleChange: () => {},
};

export default RecipeInfo;
