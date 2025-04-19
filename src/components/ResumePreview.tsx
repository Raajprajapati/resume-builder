// src/components/ResumePreview.jsx
import { useResume } from '../hooks/useResume';

const ResumePreview = () => {
    const { sections } = useResume();

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Preview</h2>

            <div id="resume-preview" className="bg-white p-6 shadow-inner rounded">
                {sections.map(section => (
                    <div key={section.id} className="mb-6 last:mb-0">
                        {section.type === 'header' && (
                            <div className="text-center mb-6">
                                <h1 className="text-3xl font-bold text-gray-900">{section.data.name}</h1>
                                <h2 className="text-xl text-gray-700 dark:text-gray-300">{section.data.title}</h2>
                                <div className="flex justify-center space-x-4 mt-2 text-gray-600 dark:text-gray-400">
                                    <span>{section.data.email}</span>
                                    <span>•</span>
                                    <span>{section.data.phone}</span>
                                    <span>•</span>
                                    <span>{section.data.address}</span>
                                </div>
                            </div>
                        )}

                        {section.type === 'summary' && (
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Summary</h3>
                                <p className="text-gray-700 dark:text-gray-300">{section.data.content}</p>
                            </div>
                        )}

                        {section.type === 'experience' && (
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Experience</h3>
                                {section.data.items?.map((item, index) => (
                                    <div key={index} className="mb-4">
                                        <div className="flex justify-between">
                                            <h4 className="font-medium">{item.jobTitle}</h4>
                                            <span className="text-gray-600 dark:text-gray-400">
                                                {item.startDate} - {item.endDate}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-gray-700 dark:text-gray-400 mb-1">
                                            <span>{item.company}</span>
                                            <span>{item.location}</span>
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {section.type === 'education' && (
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Education</h3>
                                {section.data.items?.map((item, index) => (
                                    <div key={index} className="mb-4">
                                        <div className="flex justify-between">
                                            <h4 className="font-medium">{item.degree}</h4>
                                            <span className="text-gray-600 dark:text-gray-400">{item.year}</span>
                                        </div>
                                        <div className="text-gray-700 dark:text-gray-400">
                                            {item.institution}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {section.type === 'skills' && (
                            <div>
                                <h3 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {section.data.items?.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResumePreview;