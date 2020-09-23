import { USER_LOADED, LOGIN, UPDATE_USER, LOGOUT } from './Types';
import jwt from 'jwt-decode';

export default (state, action) => {
    switch (action.type) {
        case LOGIN:
            const token = action.payload;
            window.localStorage.setItem('token', token);
            window.localStorage.setItem('user', JSON.stringify(jwt(token)));
            return {
                ...state,
                isAuthenticated: true,
                user: JSON.parse(window.localStorage.getItem('user'))
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: JSON.parse(window.localStorage.getItem('user'))
            };
        case UPDATE_USER:
            return {
                ...state,
                isAuthenticated: true
            };
        case LOGOUT:
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('user');
            return {
                isAuthenticated: false,
                user: null
            };
        default:
            return state;
    }
};