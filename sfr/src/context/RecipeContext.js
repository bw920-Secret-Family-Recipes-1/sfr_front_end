import React, { useState, createContext } from 'react';

export const RecipeContext = createContext();

export const RecipeProvider = (props) => {
    const [recipes, setRecipes] = useState([
        {
            firstName: "bob",
            lastName: "johnson",
            email: "bob@email.com",
            password: "pass1",
            id: 1,
            recipe: {
                recipeName: "Apple Pie",
                category: "dessert",
                ingredientList: ["1 apple", "1 cup sugar", "1 pie crust"],
                directions: "",
                description: "An American classic",
            }
        },
        {
            firstName: "leah",
            lastName: "raw",
            email: "leah@email.com",
            password: "pass2",
            id: 2,
            recipe: {
                recipeName: "Kraft Mac n' Cheese",
                category: "side",
                ingredientList: ["cheese", "milk", "macaroni"],
                directions: "",
                description: "It's the cheesiest",
            },
        },
    ]);

    return (
        <RecipeContext.Provider value={[recipes, setRecipes]}>
            {props.children}
        </RecipeContext.Provider>
    );

}

