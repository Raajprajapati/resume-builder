// // src/hooks/useResume.js
// import { useResume as useResumeContext } from '../contexts/ResumeContext';
// import { initialSections } from '../data/initialData';

// export const useResume = () => {
//     const { state, dispatch } = useResumeContext();

//     const loadDefaultSections = () => {
//         dispatch({ type: 'SET_SECTIONS', payload: initialSections });
//     };

//     const addSection = (section) => {
//         dispatch({ type: 'ADD_SECTION', payload: section });
//     };

//     const updateSection = (section) => {
//         dispatch({ type: 'UPDATE_SECTION', payload: section });
//     };

//     const removeSection = (id) => {
//         dispatch({ type: 'REMOVE_SECTION', payload: id });
//     };

//     const setActiveSection = (section) => {
//         dispatch({ type: 'SET_ACTIVE_SECTION', payload: section });
//     };

//     const reorderSections = (sections) => {
//         dispatch({ type: 'REORDER_SECTIONS', payload: sections });
//     };

//     return {
//         sections: state.sections,
//         activeSection: state.activeSection,
//         loadDefaultSections,
//         addSection,
//         updateSection,
//         removeSection,
//         setActiveSection,
//         reorderSections,
//     };
// };


// src/hooks/useResume.ts
import { useResume as useResumeContext } from '../contexts/ResumeContext';
import { initialSections } from '../data/initialData';
import { Section } from '../types/Section';

export const useResume = () => {
    const { state, dispatch } = useResumeContext();

    const loadDefaultSections = () => {
        dispatch({ type: 'SET_SECTIONS', payload: initialSections });
    };

    const addSection = (section: Section) => {
        dispatch({ type: 'ADD_SECTION', payload: section });
    };

    const updateSection = (section: Section) => {
        dispatch({ type: 'UPDATE_SECTION', payload: section });
    };

    const removeSection = (id: string) => {
        dispatch({ type: 'REMOVE_SECTION', payload: id });
    };

    const setActiveSection = (sectionId: string | null) => {
        dispatch({ type: 'SET_ACTIVE_SECTION', payload: sectionId });
    };

    const reorderSections = (sections: Section[]) => {
        dispatch({ type: 'REORDER_SECTIONS', payload: sections });
    };

    return {
        sections: state.sections,
        activeSection: state.activeSection,
        loadDefaultSections,
        addSection,
        updateSection,
        removeSection,
        setActiveSection,
        reorderSections,
    };
};
