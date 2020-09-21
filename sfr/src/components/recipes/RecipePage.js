import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeContext } from '../../context/RecipeContext'
import AxiosAuth from '../../utils/AxiosAuth';

const RecipePage = () => {
    const [recipes, setRecipes] = useContext(RecipeContext)
    // const { id } = useParams();

    // useEffect(() => {
    //     AxiosAuth()
    //         .get(`https://secretrecipebw.herokuapp.com/auth/recipe/${id}`)
    //         .then(response => {
    //             setRecipe(response.data);
    //             console.log('updated the movie');
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }, [id]);



    // if (!recipes) {
    //     return <div>Loading...</div>;
    // }

    const { recipeName, ingredientList, directions, description } = recipes;
    return (
        <div className="recipe-page-wrapper">
            <div className="recipe-card">
                <h2 className="recipe-name">{recipeName}</h2>
                <div className="description">
                    <p>{description}</p>
                </div>
                <div className="ingredient-list">
                    <h3>Ingredients</h3>
                    {ingredientList.map(ingredient => (
                        <div className="ingredient">
                            {ingredient}
                        </div>
                    ))}
                    <div className="directions">
                        <h3>Directions</h3>
                    </div>
                </div>
            </div>
            <div className="save-button">Save</div>
        </div >
    );
}

export default RecipePage;
