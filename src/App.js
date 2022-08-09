import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';

import {
  Login,
  Recipes,
  RecipeDetails,
  RecipeInProgress,
  DoneRecipes,
  FavoriteRecipes,
  Profile,
} from './pages';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/foods/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route exact path="/foods/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/foods" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </Provider>
  );
}

export default App;
