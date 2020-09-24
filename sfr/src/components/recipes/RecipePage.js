import React, { useContext, useEffect, useState } from 'react';
import AxiosAuth from '../../utils/AxiosAuth'
import { useParams, Link } from 'react-router-dom';

// Context
import { RecipeContext } from '../../context/RecipeContext'
// Style
import './recipe.css';

const initialRecipe = {
    
}

const RecipePage = () => {
    const [recipes, setRecipes] = useContext(RecipeContext);
    const { id } = useParams();

    const [editing, setEditing] = useState(false);
    const [colorToEdit, setColorToEdit] = useState(initialRecipe);

    useEffect(() => {
        AxiosAuth()
            .get(`https://secretrecipebw.herokuapp.com/recipes/${id}`)
            .then(res => {
                setRecipes(res.data[0]);
                console.log('from recipePAGE:', res.data[0])
            })
            .catch(err => {
                console.error(err);
            });
    }, [id]);

    const deleteRecipe = recipe => {
        AxiosAuth()
            .delete(`https://secretrecipebw.herokuapp.com/recipes/${id}`)
            .then((res) => {
                setRecipes(recipes.filter((thisRecipe) => thisRecipe.id !== id))
                console.log(`Deleted ${recipe.id}`, res)
                window.location.assign('/user');
            })
            .catch(err => console.log('error deleting recipe',err));
    };

    // AxiosAuth()
    //     .put(`https://secretrecipebw.herokuapp.com/recipes/${Edit.id}`, recipeToEdit)
    //     .then((res) => {
    //         const editedRecipe = recipes.filter((recipe) => recipe.id !== recipeToEdit.id);
    //         updateRecipe([...editedRecipe, { ...recipeToEdit }]);
    //         console.log(`Saved ${res.data.recipe}`, res)
    //     })
    //     .catch((err) => console.log(err));


    if (!recipes) {
        return <div>Loading Recipe...</div>;
    }


    return (
        <div className="recipe-page-container">
            <Link className="btn btn-md btn-primary" to={`/recipe/`}>Edit</Link>
            <button onClick={() => deleteRecipe(recipes.id)}>Delete</button>
            <div className="recipe-wrapper">
                <h2 className="recipe-name">{recipes.recipeName}</h2>
                <em className="category">{recipes.categoryName}</em>
                <h4 className="source">By: {recipes.source}</h4>
                <div className="ingredients-directions-wrapper">
                    <div className="ingredientList">
                        <h4>Ingredients: </h4>
                        <p>{recipes.ingredientList}</p>
                    </div>
                    <div className="directions">
                        <h4>Directions: </h4>
                        <p>{recipes.directions}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RecipePage;
