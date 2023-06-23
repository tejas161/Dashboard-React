import React, { useContext, useReducer } from 'react';
import reducer from './Reducer';
const AppContext = React.createContext();

const initialState = {
    userTyped: ""
}

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const updateSearch = (value) => {
        return dispatch({
            type: "Search_Update",
            payload: {
                userTyped: value
            }
        });
    };
    return (
        <AppContext.Provider value={{ ...state, updateSearch }} >
            {children}
        </AppContext.Provider>
    );
};


const useGlobalContext = () => {
    return useContext(AppContext);
}


export { AppContext, AppProvider, useGlobalContext };

