import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import PrivateRoute from './components/PrivatRoute';
import RecipeList from './components/recipes/RecipeList';
import SingleRecipe from './components/forms/AddRecipeForm';
import RecipePage from './components/recipes/RecipePage'

import PopulatedSignUpForm from './components/forms/AddUserForm';
import PopulatedLoginForm from './components/forms/Login';

// Styles
import './App.css';
import './components/recipes/recipe.css';

// Context
import { RecipeProvider } from './context/RecipeContext';
import RecipeState from './context/AuthState';
import AuthState from './context/AuthState';


function App() {
  return (
    <RecipeProvider>
      <AuthState>
        <RecipeState>
          <Router>
            <div className="App">
              <Navigation />
              <Switch>
                <Route exact path='/sign-up' component={PopulatedSignUpForm} />
                <Route exact path='/login' component={PopulatedLoginForm} />
                <PrivateRoute exact path="/user" component={RecipeList} />
                <PrivateRoute exact path='/addRecipePage' component={SingleRecipe} />
                <Route path="/:id">
                  <RecipePage />
                </Route>
                <RecipeList />
              </Switch>
            </div>
          </Router>
        </RecipeState>
      </AuthState>
    </RecipeProvider>


  );
}

export default App;
