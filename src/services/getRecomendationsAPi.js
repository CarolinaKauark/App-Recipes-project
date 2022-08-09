const getRecomendationApi = async (type, result) => {
  const response = await fetch(`https://www.the${type}db.com/api/json/v1/1/search.php?s=`);
  const data = await response.json();
  const arr = [];
  for (let i = 0; i < +'6'; i += 1) {
    arr.push(data[result][i]);
  }
  return arr;
};

export default getRecomendationApi;
