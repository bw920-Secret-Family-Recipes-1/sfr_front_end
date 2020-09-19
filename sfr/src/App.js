import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RecipeList from './components/recipes/RecipeList';
import { RecipeProvider } from './context/RecipeContext';

import './App.css';
import Navigation from './components/Navigation';
import PrivateRoute from './components/PrivatRoute';

function App() {
  return (
    <Router>
      <RecipeProvider>
        <div className="App">
          <Navigation />
          <Switch>
            <PrivateRoute exact path="/recipe-page" component={RecipeList} />
            <RecipeList />
            <Route path='/login' />
          </Switch>
        </div>
      </RecipeProvider>
    </Router>
  );
}

export default App;
