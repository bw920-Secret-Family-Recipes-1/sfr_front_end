
import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
    // If local storage value exists, use for storedValue initial state, else use initialValue
    const [storedValue, setStoredValue] = useState(() => {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });

    // Set local storage value, update storedValue state with new value
    const setValue = value => {
        window.localStorage.setItem(key, JSON.stringify(value));
        setStoredValue(value);
    };

    return [storedValue, setValue];
};