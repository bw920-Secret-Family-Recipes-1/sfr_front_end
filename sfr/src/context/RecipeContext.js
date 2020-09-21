import React, { useState, createContext } from 'react';

export const RecipeContext = createContext();

export const RecipeProvider = (props) => {
    const [recipes, setRecipes] = useState([
        {
            id: 1,
            firstName: "bob",
            lastName: "johnson",
            email: "bob@email.com",
            password: "pass1",
            recipe: {
                recipeName: "Apple Pie",
                category: "dessert",
                ingredientList: ["1 apple", "1 cup sugar", "1 pie crust"],
                directions: "",
                description: "An American classic",
            }
        },
        {
            id: 2,
            firstName: "leah",
            lastName: "raw",
            email: "leah@email.com",
            password: "pass2",
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

