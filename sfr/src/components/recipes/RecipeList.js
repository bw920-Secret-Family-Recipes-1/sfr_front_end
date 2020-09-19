import React, { useState, useContext } from 'react';
import RecipeCard from './RecipeCard'
import {RecipeContext} from '../../context/RecipeContext'


const RecipeList = () => {
    const [recipes, setRecipes] = useContext(RecipeContext)

    return (
        <div>
            {recipes.map(user => (
                <div key={user.id}>
                    <RecipeCard name={user.recipe.recipeName} description={user.recipe.description}/>
                </div>
            ))}
        </div>
    )
}

export default RecipeList;