const getRecipeAPI = async (type, id) => {
  const response = await fetch(`https://www.the${type}db.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data[type === 'meal' ? 'meals' : 'drinks'][0];
};

export default getRecipeAPI;
