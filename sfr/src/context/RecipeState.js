import React, { useReducer } from 'react';
import AxiosAuth  from '../../utils/AxiosAuth';
import RecipeContext from './recipeContext';


export const GET_RECIPES = 'GET_RECIPES';
export const ADD_RECIPES = 'ADD_RECIPES';
export const DELETE_RECIPES = 'DELETE_RECIPES';
export const UPDATE_RECIPES = 'UPDATE_RECIPES';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

const RecipeState = props => {
    const initialState = {
        recipes: []
    };

    const [state, dispatch] = useReducer(recipeReducer, initialState);

    // Get recipes
    const getRecipe = id => {
        AxiosAuth()
            .get(`/recipes/${id}`)
            .then(res =>
                dispatch({
                    type: GET_RECIPES,
                    payload: res.data
                })
            )
            .catch(err => console.log(err));
    };

    // Add recipe
    const addRecipe = recipe => {
        AxiosAuth()
            .post('/recipes', recipe)
            .then(res =>
                dispatch({
                    type: ADD_recipe,
                    payload: res.data
                })
            )
            .catch(err => console.log(err));
    };

    // Delete recipe
    const deleteRecipe = id => {
        AxiosAuth()
            .delete(`/recipes/${id}`)
            .then(dispatch({ type: DELETE_RECIPE, payload: id }))
            .catch(err => console.log(err));
    };

    // Update recipe
    

    return (
        <RecipeContext.Provider
            value={{
                recipes: state.recipes,
                getRecipe,
                addRecipe,
                deleteRecipe,
            }}
        >
            {props.children}
    </RecipeContext.Provider>
    );
};

export default RecipeState;