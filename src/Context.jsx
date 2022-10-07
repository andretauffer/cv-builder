import React, { useEffect, useReducer } from "react";


export const Context = React.createContext();


export const initialState = {
  selected: undefined,
  keywords: [],
  mode: "basic"
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
    "SET_MODE": () => ({
      ...state,
      mode: action.mode
    }),
    "default": () => ({ ...state })
  };


  return actions[action.type] ? actions[action.type]() : actions["default"]();
}
