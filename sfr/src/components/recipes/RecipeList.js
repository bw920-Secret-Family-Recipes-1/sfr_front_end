import React, { useState, useContext, useEffect } from 'react'
import RecipeCard from './RecipeCard'
import { Link, useParams } from 'react-router-dom'
import { RecipeContext } from '../../context/RecipeContext'
import AxiosAuth from '../../utils/AxiosAuth'
import RecipePage from './RecipePage';


const RecipeList = () => {
    const [recipes, setRecipes] = useContext(RecipeContext)
    const { id } = useParams();
    // useEffect(() => {
    //     const getRecipes = () => {
    //         AxiosAuth()
    //             .get('http://localhost:5000/api/movies')
    //             .then(res => {
    //                 setRecipes(res.data);
    //             })
    //             .catch(error => {
    //                 console.error('Server Error', error);
    //             });
    //     }
    //     getRecipes();
    // }, []);

    return (
        <div >
            <div className="user-banner">
                <h3>Welcome back!</h3>
            </div>
            
                <div className="recipe-list">
                    {recipes.map(user => (
                        <div key={user.id}>
                            <RecipeCard
                                name={user.recipe.recipeName}
                                description={user.recipe.description}
                            />
                        </div>
                    ))}
                </div>
            
        </div>
    )
}

export default RecipeList;