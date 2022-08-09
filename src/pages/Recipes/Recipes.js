import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Context from '../../context/Context';
import fetchRecipes, { fetchCategories } from '../../services/api';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BasicCard from '../../components/BasicCard/BasicCard';

function Recipes({ location: { pathname }, history }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();

  const { search } = useContext(Context);

  const headerTitle = pathname === '/foods' ? 'Foods' : 'Drinks';

  useEffect(() => {
    const getRecipes = async () => {
      const db = pathname === '/foods' ? 'meal' : 'cocktail';
      let response = await fetchRecipes(db, search, category);
      setRecipes(response);
      if (response.length === 1 && !category) {
        const type = pathname === '/foods' ? 'Meal' : 'Drink';
        history.push(`${pathname}/${response[0][`id${type}`]}`);
      }
      if (response.length === 0) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      response = await fetchCategories(db);
      setCategories(response);
    };
    getRecipes();
  }, [pathname, history, category, search]);

  const handleCategoryChange = ({ target }) => {
    const { value } = target;
    setCategory((prev) => {
      if (value === prev) {
        target.checked = false;
        return undefined;
      }
      return value;
    });
  };

  return (
    <>
      <Header title={ headerTitle } />
      <main className="footer-space">
        <div>
          <form className="my-2 mx-3 btn btn-md border border-3 col-auto bg-light">
            { categories.length > 0 && categories.map(({ strCategory }, i) => (
              <label
                key={ i }
                htmlFor={ `${strCategory}-category-filter` }
                data-testid={ `${strCategory}-category-filter` }
                className="form-check form-check-inline"
              >
                <input
                  onClick={ handleCategoryChange }
                  type="radio"
                  name="category"
                  value={ strCategory }
                  id={ `${strCategory}-category-filter` }
                  className="form-check-input"
                />
                {strCategory}
              </label>
            ))}
          </form>
          <div className="mx-3">
            { recipes.length > 0 && recipes.map((recipe, i) => (
              <BasicCard
                { ...recipe }
                index={ i }
                pathname={ pathname }
                key={ i }
                dataTitle={ `${i}-card-name` }
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

Recipes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Recipes;
