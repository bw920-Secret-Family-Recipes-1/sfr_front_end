import React from 'react';

const RecipeCard = (props) => {

    return(
        <div className="recipe-card">
            <h3>{props.name}</h3>
            <p>{props.description}</p>
        </div>
    )
}

export default RecipeCard;