import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import getRecipeAPI from '../../services/getRecipeAPI';
import ShareButton from '../../components/ShareButton';
import FavoriteButton from '../../components/FavoriteButton';
import RecipeInfo from '../../components/RecipeInfo/RecipeInfo';
import getIngredientAndMeasureList from '../../helpers/getIngredientAndMeasureList';
import useLocalStorage from '../../hooks/useLocalStorage';

// Tem q refatorar
async function getRecipe(setRecipe, inProgress, setInProgress, { id, path, type: ls }) {
  const isFood = path.includes('food');
  const type = isFood ? 'meal' : 'cocktail';
  const response = await getRecipeAPI(type, id);
  const ingredients = getIngredientAndMeasureList(response);
  const strType = isFood ? 'Meal' : 'Drink';
  const strCategory = isFood ? 'Category' : 'Alcoholic';
  setRecipe({
    ...response,
    isDetails: false,
    isFood,
    id: response[`id${strType}`],
    title: response[`str${strType}`],
    img: response[`str${strType}Thumb`],
    category: response[`str${strCategory}`],
    instructions: response.strInstructions,
    video: response.strYoutube,
    ingredients,
  });

  if (!inProgress[ls]?.[id]) {
    setInProgress((prev) => ({
      ...prev,
      [ls]: {
        [id]: ingredients.map((obj) => ({
          ...obj,
          checked: false,
        })),
      },
    }));
  }
}

const getRecipeDone = (recipe, path) => {
  const strType = path.includes('food') ? 'Meal' : 'Drink';
  return ({
    id: recipe[`id${strType}`],
    type: path.includes('food') ? 'food' : 'drink',
    nationality: recipe.strArea || '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe[`str${strType}`],
    image: recipe[`str${strType}Thumb`],
    doneDate: new Date(),
    tags: recipe.strTags ? recipe.strTags.split(',') : [],
  });
};
//

function RecipeInProgress({ match: { params: { id }, path }, history }) {
  const [recipe, setRecipe] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState();
  const [type, setType] = useState(path.includes('food') ? 'meals' : 'cocktails');

  const [
    inProgress,
    setInProgress,
  ] = useLocalStorage('inProgressRecipes', {});
  const [, setIsDone] = useLocalStorage('doneRecipes', []);

  useEffect(() => {
    getRecipe(setRecipe, inProgress, setInProgress, { id, path, type });
    setType(path.includes('food') ? 'meals' : 'cocktails');
  }, [id, path, inProgress, setInProgress, type]);

  useEffect(() => {
    setIsButtonDisabled(inProgress[type]?.[id]
      && !inProgress[type]?.[id].every(({ checked }) => checked));
  }, [inProgress, type, id]);

  const handleIngredientCheck = ({ target }) => {
    const { checked } = target;
    target
      .parentElement
      .style
      .textDecoration = checked ? 'line-through' : 'initial';

    setInProgress((prev) => ({
      ...prev,
      [type]: {
        [id]: prev[type][id].map((obj) => (obj.ingredient !== target.value
          ? obj
          : {
            ...obj,
            checked,
          })),
      },
    }));
  };

  const handleDoneRecipe = () => {
    const recipeDone = getRecipeDone(recipe, path);
    setIsDone((prev) => ([
      ...prev,
      {
        ...recipeDone,
      },
    ]));

    history.push('/done-recipes');
  };

  return !recipe ? null : (
    <div>
      <div className="d-flex justify-content-between m-3">
        <ShareButton />
        <FavoriteButton
          info={ recipe }
          id={ path.includes('food') ? recipe.idMeal : recipe.idDrink }
        />
      </div>
      {!inProgress[type]?.[id] ? null
        : (
          <div>
            <RecipeInfo
              recipe={ {
                ...recipe,
                ingredients: inProgress[type][id],
              } }
              handleChange={ handleIngredientCheck }
              checkedIngredients={ inProgress[id] }
            />
            <Button
              variant="outline-success"
              data-testid="finish-recipe-btn"
              type="button"
              disabled={ isButtonDisabled }
              onClick={ handleDoneRecipe }
              className="col-11 mb-3 ml-3"
            >
              Finalizar
            </Button>

          </div>
        ) }
    </div>
  );
}

RecipeInProgress.propTypes = {
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

export default RecipeInProgress;
