// src/components/ResumeBuilder.jsx
import { useResume } from '../hooks/useResume';
import { useEffect } from 'react';
import Toolbar from './Toolbar';
import ResumeEditor from './ResumeEditor';
import ResumePreview from './ResumePreview';

const ResumeBuilder = () => {
    const { loadDefaultSections } = useResume();

    useEffect(() => {
        loadDefaultSections();
    }, [loadDefaultSections]);

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
                Resume Builder
            </h1>

            <Toolbar />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                <ResumeEditor />
                <ResumePreview />
            </div>
        </div>
    );
};

export default ResumeBuilder;