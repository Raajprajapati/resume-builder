// src/components/Toolbar.jsx
import { useResume } from '../hooks/useResume';
import { exportToPDF } from '../utils/downloadPDF';

const Toolbar = () => {
    const { loadDefaultSections } = useResume();

    const handleDownloadPDF = () => {
        exportToPDF('resume-preview', 'my-resume.pdf');
    };

    return (
        <div className="flex justify-between items-center mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="space-x-2">
                <button
                    onClick={loadDefaultSections}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Reset to Default
                </button>
            </div>
            <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
                Download PDF
            </button>
        </div>
    );
};

export default Toolbar;