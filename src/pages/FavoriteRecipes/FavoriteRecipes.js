import React, { useContext, useState } from 'react';
import DetailedCard from '../../components/DetailedCard/DetailedCard';
import Header from '../../components/Header/Header';
import Context from '../../context/Context';

function FavoriteRecipes() {
  const headerTitle = 'Favorite Recipes';
  const [filter, setFilter] = useState('');
  const { favorites } = useContext(Context);

  const options = [
    { title: 'All', name: 'all', value: '' },
    { title: 'Food', name: 'food', value: 'food' },
    { title: 'Drink', name: 'drink', value: 'drink' },
  ];

  const handleChange = ({ target: { value } }) => {
    setFilter(value);
  };

  const display = favorites.filter(({ type }) => type.includes(filter));

  return (
    <>
      <Header title={ headerTitle } />
      <main id="favoriterecipes-page">
        <form className="my-2 mx-3 btn btn-lg border border-3 col-11">
          {options.map(({ title, name, value }) => (
            <label
              key={ name }
              data-testid={ `filter-by-${name}-btn` }
              htmlFor={ `filter-by-${name}-btn` }
              className="form-check form-check-inline"
            >
              <input
                id={ `filter-by-${name}-btn` }
                type="radio"
                name="filter"
                checked={ filter === value }
                value={ value }
                onChange={ handleChange }
                className="form-check-input"
              />
              {title}
            </label>
          ))}
        </form>
        <section>
          {display.map((obj, i) => (
            <DetailedCard
              { ...obj }
              index={ i }
              key={ i }
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default FavoriteRecipes;
