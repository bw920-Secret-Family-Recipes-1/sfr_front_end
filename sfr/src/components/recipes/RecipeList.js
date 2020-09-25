import React, { useContext, useEffect, useState } from 'react';
import AxiosAuth from '../../utils/AxiosAuth'
import RecipeCard from './RecipeCard'

// Context
import { RecipeContext } from '../../context/RecipeContext'
import AuthState from '../../context/AuthState';
import AuthContext from '../../context/AuthContext';


const { user } = AuthContext;
const [recipes, setRecipes] = useState([]);
useEffect(() => {
    const getRecipes = () => {
        AxiosAuth()
            .get(`https://secretrecipebw.herokuapp.com/users/${user.userId}/recipes`)
            .then(res => {
                console.log('recipes: ', res);
                setRecipes(res.data);
            })
            .catch(error => {
                console.error('Server Error', error);
            });
    }
    getRecipes();
}, []);





const RecipeList = () => {
    const [recipes] = useContext(RecipeContext);

    return (
        <div >
            <div className="user-banner">
                <h3>My Recipes {recipes.message}!</h3>
            </div>

            <div className="recipe-list">
                {recipes.map(recipe => (
                    <div key={recipe.id}>
                        <RecipeCard
                            recipeName={recipe.recipeName}
                            source={recipe.source}
                            ingredients={recipe.ingredients}
                            id={recipe.id}
                        />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default RecipeList;