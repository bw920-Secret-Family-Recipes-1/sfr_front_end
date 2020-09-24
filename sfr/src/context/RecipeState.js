import React, { useReducer } from 'react';
import AxiosAuth from '../../utils/AxiosAuth';
import {RecipeContext} from './RecipeContext'
import RecipeReducer from './RecipeReducer';
import { GET_RECIPES, ADD_RECIPE, DELETE_RECIPE, UPDATE_RECIPE } from '../Types';

const RecipeState = props => {
    const initialState = {
        recipes: []
    };

    const [state, dispatch] = useReducer(RecipeReducer, initialState);

    const getRecipes = id => {
        AxiosAuth()
            .get(`/recipes/${id}`)
            .then(res => {
                console.log("recipe:", res)
                dispatch({
                    type: GET_RECIPES,
                    payload: res.data
                })
            }
            )
            .catch(err => console.log(err));
    };

    const addRecipe = recipe => {
        AxiosAuth()
            .post('/recipes', recipe)
            .then(res =>
                dispatch({
                    type: ADD_RECIPE,
                    payload: res.data
                })
            )
            .catch(err => console.log(err));
    };

    const deleteRecipe = id => {
        AxiosAuth()
            .delete(`/recipes/${id}`)
            .then(dispatch({ type: DELETE_RECIPE, payload: id }))
            .catch(err => console.log(err));
    };

    const updateRecipe = (id, recipe) => {
        AxiosAuth()
            .put(`/recipes/${id}`, recipe)
            .then(res => {
                dispatch({ type: UPDATE_RECIPE, payload: res.data });
            })
            .catch(err => console.log(err));
    };

    return (
        <RecipeContext.Provider
            value={{
                recipes: state.recipes,
                getRecipes,
                addRecipe,
                deleteRecipe,
                updateRecipe
            }}
        >
            {props.children}
        </RecipeContext.Provider>
    );
};

export default RecipeState;