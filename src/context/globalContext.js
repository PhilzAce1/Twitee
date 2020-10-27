import React, { createContext, useReducer, useContext } from 'react';
const storedUser = window.localStorage.getItem('user');
let user;
if (storedUser === null || !storedUser || storedUser === 'null') {
  user = {};
} else {
  user = JSON.parse(storedUser);
}
const initialState = {
  user: user,
  posts: [],
};

export const GlobalStateContext = createContext(initialState);
const GlobalDispatchContext = createContext();

const globalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER': {
      return { ...state, user: action.user };
    }
    case 'SET_POST': {
      return { ...state, posts: action.posts };
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalDispatchContext.Provider value={dispatch}>
      <GlobalStateContext.Provider value={state}>
        {children}
      </GlobalStateContext.Provider>
    </GlobalDispatchContext.Provider>
  );
};

export const useGlobalStateContext = () => useContext(GlobalStateContext);
export const useGlobalDispatchContext = () => useContext(GlobalDispatchContext);
