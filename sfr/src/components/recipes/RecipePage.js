import React, { useContext, useEffect } from 'react';
import AxiosAuth from '../../utils/AxiosAuth'
import { useParams } from 'react-router-dom';

// Context
import { RecipeContext } from '../../context/RecipeContext'

const RecipePage = () => {
    const [recipes, setRecipes] = useContext(RecipeContext);
    const { id } = useParams();

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


    if (!recipes) {
        return <div>Loading Recipe...</div>;
    }

    return (
        <div className="">
            <div className="recipe-wrapper">
                <h2>{recipes.recipeName}</h2>
                <h4>From: {recipes.source}</h4>
                <h4>{recipes.categoryName}</h4>
                <div className="ingredients-directions-wrapper">
                    <div className="ingredientList">
                        Ingredients: <p>{recipes.ingredientList}</p>
                    </div>
                    <div className="directions">
                        Directions: <p>{recipes.directions}</p>
                    </div>
                </div>

            </div>
            <div className="btn btn-md btn-primary">Edit</div>
        </div>
    );
};

export default RecipePage;
