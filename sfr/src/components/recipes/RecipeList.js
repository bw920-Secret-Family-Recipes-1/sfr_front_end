import React, { useContext } from 'react'
import RecipeCard from './RecipeCard'

// Context
import { RecipeContext } from '../../context/RecipeContext'


const RecipeList = () => {
    const [recipes] = useContext(RecipeContext);

    return (
        <div >
            <div className="user-banner">
                <h3>My Recipes!</h3>
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