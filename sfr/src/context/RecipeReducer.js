import {
    GET_RECIPES,
    ADD_RECIPE,
    DELETE_RECIPE,
    UPDATE_RECIPE,
} from './Types';

export default (state, action) => {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipe: action.payload
            };

        case ADD_RECIPE:
            return {
                ...state,
                recipes: [action.payload, ...state.recipes]
            };

        case DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter(recipe => recipe.id !== action.payload)
            };

        case UPDATE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.map(recipe =>
                    recipe.id === action.payload.id ? action.payload : recipe
                )
            };

        default:
            return state;
    }
};