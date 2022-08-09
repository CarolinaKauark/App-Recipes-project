// A função recebe a receita (que é um objeto com várias keys diferentes)
// Retorna um array de objetos com uma key ingredient e outra measure
// Exemplo de retorno:
// [
//   { ingredient: 'soy sauce', measure: '3/4 cup' },
//   { ingredient: 'water', measure: '1/2 cup' },
// ]

const getIngredientAndMeasureList = (recipe) => {
  const keyList = Object.keys(recipe);
  const keyIngredients = keyList.filter((key) => key.includes('strIngredient'));
  const list = keyIngredients.reduce((acc, key, index) => {
    if (recipe[key]) {
      return [...acc, { ingredient: recipe[key],
        measure: recipe[`strMeasure${index + 1}`] }];
    }
    return acc;
  }, []);

  return list;
};

export default getIngredientAndMeasureList;
