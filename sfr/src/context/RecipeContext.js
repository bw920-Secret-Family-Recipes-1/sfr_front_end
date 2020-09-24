import React, { useState, useEffect, createContext } from 'react';
import AxiosAuth from '../utils/AxiosAuth'

export const RecipeContext = createContext();

export const RecipeProvider = (props) => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const getRecipes = () => {
            AxiosAuth()
                .get('https://secretrecipebw.herokuapp.com/recipes')
                .then(res => {
                    // console.log('recipes: ', res);
                    setRecipes(res.data);
                })
                .catch(error => {
                    console.error('Server Error', error);
                });
        }
        getRecipes();
    }, []);





    return (
        <RecipeContext.Provider value={[recipes, setRecipes]}>
            {props.children}
        </RecipeContext.Provider>
    );

}

