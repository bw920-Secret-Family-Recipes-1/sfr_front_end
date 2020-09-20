import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RecipeList from './components/recipes/RecipeList';
import { RecipeProvider } from './context/RecipeContext';

import './App.css';
import Navigation from './components/Navigation';
import PrivateRoute from './components/PrivatRoute';

import PopulatedSignUpForm from './components/forms/AddUserForm';
import SingleRecipe from './components/forms/AddRecipeForm';

function App() {
  return (
    <Router>
      <RecipeProvider>
        <div className="App">
          <Navigation />
          <Switch>
            <PrivateRoute exact path="/recipe-page" component={RecipeList} />
            <Route exact path='/sign-up' component={PopulatedSignUpForm}/>
            <Route exact path='/addRecipePage' component={SingleRecipe}/>
            <RecipeList />
          </Switch>
        </div>
      </RecipeProvider>
    </Router>
  );
}

export default App;
