import React from 'react';
import { Link } from 'react-router-dom';


const RecipeCard = ({ recipeName, source, id }) => {

    return (
        <Link to={`/recipe/${id}`}>
            <div className="recipe-card">
                <h3 className="recipe-name">{recipeName}</h3>
                <p>By: {source}</p>
            </div>
        </Link>
    )
}

export default RecipeCard;