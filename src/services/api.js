const getUrl = (type, { option, value }, category) => {
  if (category && category !== 'All') return `https://www.the${type}db.com/api/json/v1/1/filter.php?c=${category}`;
  switch (option) {
  case 'name':
    return `https://www.the${type}db.com/api/json/v1/1/search.php?s=${value}`;
  case 'first-letter':
    return `https://www.the${type}db.com/api/json/v1/1/search.php?f=${value}`;
  case 'ingredient':
    return `https://www.the${type}db.com/api/json/v1/1/filter.php?i=${value}`;
  default:
    throw new Error('Opção inválida provida para fetchRecipes');
  }
};

const fetchRecipes = async (type, query, category) => {
  const URL = getUrl(type, query, category);
  const LIMIT = 12;
  const response = await fetch(URL)
    .then((data) => (data.json()))
    .then((data) => Object.values(data)[0]);
  return response ? response.slice(0, LIMIT) : [];
};

export const fetchCategories = async (type) => {
  const URL = `https://www.the${type}db.com/api/json/v1/1/list.php?c=list`;
  const LIMIT = 5;
  return fetch(URL)
    .then((data) => data.json())
    .then(
      (obj) => Object.values(obj)[0],
    )
    .then((arr) => arr.slice(0, LIMIT))
    .then((arr) => [...arr, {
      strCategory: 'All',
    }])
    .catch(console.error);
};

export default fetchRecipes;
