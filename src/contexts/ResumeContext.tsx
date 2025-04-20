// // src/contexts/ResumeContext.jsx
// import { createContext, useContext, useReducer } from 'react';

// const ResumeContext = createContext();

// const initialState = {
//     sections: [],
//     activeSection: null,
// };

// const reducer = (state, action) => {
//     switch (action.type) {
//         case 'SET_SECTIONS':
//             return { ...state, sections: action.payload };
//         case 'ADD_SECTION':
//             return { ...state, sections: [...state.sections, action.payload] };
//         case 'UPDATE_SECTION':
//             return {
//                 ...state,
//                 sections: state.sections.map(section =>
//                     section.id === action.payload.id ? action.payload : section
//                 ),
//             };
//         case 'REMOVE_SECTION':
//             return {
//                 ...state,
//                 sections: state.sections.filter(section => section.id !== action.payload),
//             };
//         case 'SET_ACTIVE_SECTION':
//             return { ...state, activeSection: action.payload };
//         case 'REORDER_SECTIONS':
//             return { ...state, sections: action.payload };
//         default:
//             return state;
//     }
// };

// export const ResumeProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(reducer, initialState);

//     return (
//         <ResumeContext.Provider value={{ state, dispatch }}>
//             {children}
//         </ResumeContext.Provider>
//     );
// };

// export const useResume = () => {
//     const context = useContext(ResumeContext);
//     if (!context) {
//         throw new Error('useResume must be used within a ResumeProvider');
//     }
//     return context;
// };


// src/contexts/ResumeContext.tsx

// src/contexts/ResumeContext.tsx
import React, {
    createContext,
    useContext,
    useReducer,
    ReactNode,
    Dispatch,
} from 'react';
import { Section } from '../types/Section';

interface State {
    sections: Section[];
    activeSection: string | null;
}

type Action =
    | { type: 'SET_SECTIONS'; payload: Section[] }
    | { type: 'ADD_SECTION'; payload: Section }
    | { type: 'UPDATE_SECTION'; payload: Section }
    | { type: 'REMOVE_SECTION'; payload: string }
    | { type: 'SET_ACTIVE_SECTION'; payload: string | null }
    | { type: 'REORDER_SECTIONS'; payload: Section[] };

// rest of your context stays the same...


interface State {
    sections: Section[];
    activeSection: string | null;
}

const initialState: State = {
    sections: [],
    activeSection: null,
};

const ResumeContext = createContext<{
    state: State;
    dispatch: Dispatch<Action>;
} | undefined>(undefined);

const reducer = (state: State, action: Action): State => {
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

interface ResumeProviderProps {
    children: ReactNode;
}

export const ResumeProvider = ({ children }: ResumeProviderProps) => {
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
