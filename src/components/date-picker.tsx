import { createContext, useReducer, useContext } from 'react';

const initialState = {
  filter1: '',
  
};

function filterReducer(state:any, action:any) {
  switch (action.type) {
    case 'updateFilters':
      return { ...state, filter1: action.payload };
    

   
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }

}

export const FilterContext = createContext("");

export function FilterProvider(props:any) {
  const [state, dispatch] = useReducer(filterReducer, initialState);
  
  const value = { state, dispatch };
  return <FilterContext.Provider value={value} {...props} />;
}