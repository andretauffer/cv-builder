import React, { useEffect, useReducer } from "react";


export const Context = React.createContext();


export const initialState = {
  selected: undefined,
  keywords: []
}

export const reducer = (state, action) => {
  const actions = {
    "SET_SELECTED": () => ({
      ...state,
      selected: action.selected,
    }),
    "SET_KEYWORDS": () => ({
      ...state,
      keywords: action.keywords,
    }),
    "UNSELECT": () => initialState,
    "default": () => ({ ...state })
  };


  return actions[action.type] ? actions[action.type]() : actions["default"]();
}
