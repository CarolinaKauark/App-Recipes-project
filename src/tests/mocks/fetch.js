import mealdbResponse from "./mealdbResponse"
import cocktaildbResponse from './cocktaildbResponse'
import { cocktaildbCategories, mealdbCategories } from "./categoriesResponse";
import beefMeals from "../../../cypress/mocks/beefMeals";
import { mealById } from "./mealById";
import { drinkById } from "./drinkById";
import chickenQuery from "./chickenQuery";
import arrabiataQuery from "./arrabiataQuery";
import letterVQuery from './letterVQuery'
import loremipsumQuery from './loremipsumQuery'
import arrabiataById from './arrabiataById'

export const MEALDB_REQUEST_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
export const COCKTAILDB_REQUEST_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
export const MEALDB_CATEGORIES_REQUEST_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
export const COCKTAILDB_CATEGORIES_REQUEST_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
export const BEEFMEALS_REQUEST_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef'
export const MEALBYID_REQUEST_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977'
export const DRINKBYID_REQUEST_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997'
export const MEALDB_QUERYNAME_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=arrabiata'
export const COCKTAILDB_QUERYFIRST_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=v'
export const MEALDB_QUERYINGREDIENT_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken'
export const COCKTAILDB_QUERYBYNAME_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=loremipsum'
export const ARRABIATA_BYID_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771'

const mockFetch = (url) => Promise.resolve({
  json: () => {
    switch (url) {
      case MEALDB_REQUEST_URL:
        return Promise.resolve(mealdbResponse);   
      case COCKTAILDB_REQUEST_URL:
        return Promise.resolve(cocktaildbResponse);
      case MEALDB_CATEGORIES_REQUEST_URL:
        return Promise.resolve(mealdbCategories);
      case COCKTAILDB_CATEGORIES_REQUEST_URL:
        return Promise.resolve(cocktaildbCategories)
      case BEEFMEALS_REQUEST_URL:
        return Promise.resolve(beefMeals)
      case MEALBYID_REQUEST_URL:
        return Promise.resolve(mealById)
      case DRINKBYID_REQUEST_URL:
        return Promise.resolve(drinkById)
      case MEALDB_QUERYNAME_URL:
        return Promise.resolve(arrabiataQuery)
      case COCKTAILDB_QUERYFIRST_URL:
        return Promise.resolve(letterVQuery)
      case MEALDB_QUERYINGREDIENT_URL:
        return Promise.resolve(chickenQuery)
      case COCKTAILDB_QUERYBYNAME_URL:
        return Promise.resolve(loremipsumQuery)
      case ARRABIATA_BYID_URL:
        return Promise.resolve(arrabiataById)
      default:
        break;
    }} 
})

export default mockFetch