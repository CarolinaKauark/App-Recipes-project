import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import DetailedCard from '../../components/DetailedCard/DetailedCard';
import useLocalStorage from '../../hooks/useLocalStorage';

function DoneRecipes() {
  // Título apenas para teste
  const headerTitle = 'Done Recipes';
  const [filter, setFilter] = useState('');
  const [isDone] = useLocalStorage('doneRecipes', []);

  const options = [
    { title: 'All', name: 'all', value: '' },
    { title: 'Food', name: 'food', value: 'food' },
    { title: 'Drink', name: 'drink', value: 'drink' },
  ];

  const display = isDone?.length ? isDone
    .filter(({ type }) => type.includes(filter)) : false;

  const handleChange = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <>
      <Header title={ headerTitle } />
      <main id="donerecipes-page">
        <form className="my-2 mx-3 btn btn-lg border border-3 col-11 bg-light">
          {options.map(({ title, name, value }) => (
            <div key={ name } className="form-check form-check-inline">
              <label
                data-testid={ `filter-by-${name}-btn` }
                htmlFor={ `filter-by-${name}-btn` }
                className="form-check-label"
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
            </div>
          ))}
        </form>
        <section>
          {display?.length && display.map((obj, i) => (
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

export default DoneRecipes;
