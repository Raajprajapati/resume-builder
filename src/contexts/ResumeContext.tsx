// src/contexts/ResumeContext.jsx
import React, { createContext, useContext, useReducer } from 'react';

const ResumeContext = createContext();

const initialState = {
  sections: [],
  activeSection: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SECTIONS':
      return { ...state, sections: action.payload };
    case 'ADD_SECTION':
      return { ...state, sections: [...state.sections, action.payload] };
    case 'UPDATE_SECTION':
      return {
        ...state,
        sections: state.sections.map(section =>
          section.id === action.payload.id ? action.payload : section
        ),
      };
    case 'REMOVE_SECTION':
      return {
        ...state,
        sections: state.sections.filter(section => section.id !== action.payload),
      };
    case 'SET_ACTIVE_SECTION':
      return { ...state, activeSection: action.payload };
    case 'REORDER_SECTIONS':
      return { ...state, sections: action.payload };
    default:
      return state;
  }
};

export const ResumeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};