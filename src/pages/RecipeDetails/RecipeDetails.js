import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import PropTypes from 'prop-types';
import getIngredientAndMeasureList from '../../helpers/getIngredientAndMeasureList';
import getRecomendationApi from '../../services/getRecomendationsAPi';
import getRecipeAPI from '../../services/getRecipeAPI';
import useLocalStorage from '../../hooks/useLocalStorage';

import RecipeInfo from '../../components/RecipeInfo/RecipeInfo';

import BasicCard from '../../components/BasicCard/BasicCard';
import FavoriteButton from '../../components/FavoriteButton';
import ShareButton from '../../components/ShareButton';
import './RecipeDetails.css';

function RecipeDetails({ match: { params: { id }, path }, history }) {
  const [recipe, setRecipe] = useState();
  const [basicCards, setBasicCards] = useState();
  const [inProgress] = useLocalStorage('inProgressRecipes', {});
  const [isDone] = useLocalStorage('doneRecipes', []);

  useEffect(() => {
    const getRecipe = async () => {
      const type = path.includes('foods') ? 'meal' : 'cocktail';

      const recipeObj = await getRecipeAPI(type, id);
      const ingredients = getIngredientAndMeasureList(recipeObj);

      const strType = path.includes('foods') ? 'Meal' : 'Drink';
      const strCategory = path.includes('foods') ? 'Category' : 'Alcoholic';
      const {
        [`str${strType}`]: title,
        [`str${strType}Thumb`]: img,
        strInstructions: instructions,
        [`str${strCategory}`]: category,
        strYoutube: video,
        [`id${strType}`]: idRecipe,
      } = recipeObj;

      setRecipe({
        ...recipeObj,
        isDetails: true,
        isFood: path.includes('foods'),
        title,
        img,
        category,
        instructions,
        video,
        ingredients,
        idRecipe,
      });
    };
    getRecipe();
  }, [id, path]);

  useEffect(() => {
    const getRecomendation = async () => {
      const type = path.includes('foods') ? 'cocktail' : 'meal';
      const result = path.includes('foods') ? 'drinks' : 'meals';
      const recomendation = await getRecomendationApi(type, result);
      setBasicCards(recomendation);
    };
    getRecomendation();
  }, [path]);

  const isRecipeDone = () => {
    const type = path.includes('foods') ? 'meals' : 'cocktails';
    if (isDone.find((recipeDone) => recipeDone.id === id)) {
      return 'done';
    }
    if (inProgress[type]?.[id]) return 'inProgress';
    return 'new';
  };

  return (
    <section>
      {!recipe ? null : (
        <div>
          <RecipeInfo recipe={ recipe } />
          <div className="d-flex justify-content-between m-3">
            <FavoriteButton
              info={ recipe }
            />
            <ShareButton />
          </div>
        </div>
      )}
      <div className="recomendation">
        {basicCards && basicCards.map((basicCard, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recomendation-card` }
            className="recomendation-card ml-3"
          >
            <BasicCard
              className="recomendation-card-item"
              pathname={ path.includes('foods') ? '/drinks' : '/foods' }
              index={ index }
              { ...basicCard }
              dataTitle={ `${index}-recomendation-title` }
            />
          </div>
        ))}
      </div>
      {(isRecipeDone() === 'done') ? null : (
        <div className="start-recipe-btn">
          <Button
            type="button"
            variant="outline-warning"
            className="start-recipe-btn col-11 mb-3"
            data-testid="start-recipe-btn"
            onClick={ () => history.push(`/${path
              .includes('food') ? 'foods' : 'drinks'}/${id}/in-progress`) }
          >
            { isRecipeDone() === 'inProgress' ? 'Continue Recipe' : 'Start Recipe'}
          </Button>
        </div>) }
    </section>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default RecipeDetails;
