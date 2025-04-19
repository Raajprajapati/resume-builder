// src/components/SectionForm.jsx
import { useState, useEffect } from 'react';
import { useResume } from '../hooks/useResume';

const SectionForm = ({ section, isActive }) => {
    const { updateSection, removeSection } = useResume();
    const [formData, setFormData] = useState(section.data);

    useEffect(() => {
        setFormData(section.data);
    }, [section]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (field, index, value) => {
        setFormData(prev => {
            const newItems = [...prev[field]];
            newItems[index] = value;
            return { ...prev, [field]: newItems };
        });
    };

    const handleAddItem = (field, defaultValue) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], defaultValue],
        }));
    };

    const handleRemoveItem = (field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index),
        }));
    };

    const handleSave = () => {
        updateSection({
            ...section,
            data: formData,
        });
    };

    const handleRemove = () => {
        removeSection(section.id);
    };

    if (!isActive) return null;

    return (
        <div className="mt-4">
            {section.type === 'header' && (
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                </div>
            )}

            {section.type === 'summary' && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
                    <textarea
                        name="content"
                        value={formData.content || ''}
                        onChange={handleChange}
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
            )}

            {section.type === 'experience' && (
                <div className="space-y-4">
                    {formData.items?.map((item, index) => (
                        <div key={index} className="border-l-2 border-blue-500 pl-4">
                            <div className="flex justify-between items-start">
                                <h4 className="font-medium">Experience #{index + 1}</h4>
                                <button
                                    onClick={() => handleRemoveItem('items', index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                            <div className="mt-2 space-y-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Job Title</label>
                                    <input
                                        type="text"
                                        value={item.jobTitle || ''}
                                        onChange={(e) => handleArrayChange('items', index, { ...item, jobTitle: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Company</label>
                                    <input
                                        type="text"
                                        value={item.company || ''}
                                        onChange={(e) => handleArrayChange('items', index, { ...item, company: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
                                        <input
                                            type="text"
                                            value={item.startDate || ''}
                                            onChange={(e) => handleArrayChange('items', index, { ...item, startDate: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
                                        <input
                                            type="text"
                                            value={item.endDate || ''}
                                            onChange={(e) => handleArrayChange('items', index, { ...item, endDate: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                    <textarea
                                        value={item.description || ''}
                                        onChange={(e) => handleArrayChange('items', index, { ...item, description: e.target.value })}
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={() => handleAddItem('items', {
                            id: `exp-${Date.now()}`,
                            jobTitle: '',
                            company: '',
                            startDate: '',
                            endDate: '',
                            description: '',
                        })}
                        className="mt-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                    >
                        + Add Experience
                    </button>
                </div>
            )}

            {section.type === 'education' && (
                <div className="space-y-4">
                    {formData.items?.map((item, index) => (
                        <div key={index} className="border-l-2 border-green-500 pl-4">
                            <div className="flex justify-between items-start">
                                <h4 className="font-medium">Education #{index + 1}</h4>
                                <button
                                    onClick={() => handleRemoveItem('items', index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                            <div className="mt-2 space-y-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Degree</label>
                                    <input
                                        type="text"
                                        value={item.degree || ''}
                                        onChange={(e) => handleArrayChange('items', index, { ...item, degree: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Institution</label>
                                    <input
                                        type="text"
                                        value={item.institution || ''}
                                        onChange={(e) => handleArrayChange('items', index, { ...item, institution: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Year</label>
                                    <input
                                        type="text"
                                        value={item.year || ''}
                                        onChange={(e) => handleArrayChange('items', index, { ...item, year: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={() => handleAddItem('items', {
                            id: `edu-${Date.now()}`,
                            degree: '',
                            institution: '',
                            year: '',
                        })}
                        className="mt-2 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded hover:bg-green-200 dark:hover:bg-green-800 transition"
                    >
                        + Add Education
                    </button>
                </div>
            )}

            {section.type === 'skills' && (
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {formData.items?.map((skill, index) => (
                            <div key={index} className="relative group">
                                <div className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center">
                                    <span>{skill}</span>
                                    <button
                                        onClick={() => handleRemoveItem('items', index)}
                                        className="ml-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Add skill"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.target.value.trim()) {
                                    handleAddItem('items', e.target.value.trim());
                                    e.target.value = '';
                                }
                            }}
                            className="flex-1 rounded-l-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <button
                            onClick={() => {
                                const input = document.querySelector('input[placeholder="Add skill"]');
                                if (input.value.trim()) {
                                    handleAddItem('items', input.value.trim());
                                    input.value = '';
                                }
                            }}
                            className="px-3 py-1 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition"
                        >
                            Add
                        </button>
                    </div>
                </div>
            )}

            <div className="mt-4 flex justify-between">
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Save Changes
                </button>
                <button
                    onClick={handleRemove}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                    Remove Section
                </button>
            </div>
        </div>
    );
};

export default SectionForm;