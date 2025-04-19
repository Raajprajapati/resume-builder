// src/components/ResumeEditor.jsx
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useResume } from '../hooks/useResume';
import DraggableResumeSection from './DraggableResumeSection';
import SectionForm from './SectionForm';
import { initialSections } from '../data/initialData';

const ResumeEditor = () => {
    const {
        sections,
        activeSection,
        reorderSections,
        setActiveSection,
        addSection,
    } = useResume();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = sections.findIndex(section => section.id === active.id);
            const newIndex = sections.findIndex(section => section.id === over.id);

            const newSections = [...sections];
            const [movedSection] = newSections.splice(oldIndex, 1);
            newSections.splice(newIndex, 0, movedSection);

            reorderSections(newSections);
        }
    };

    const handleAddSection = (type) => {
        const newSection = initialSections.find(section => section.type === type);
        if (newSection) {
            addSection({
                ...newSection,
                id: `${type}-${Date.now()}`,
            });
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Editor</h2>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Add New Section
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {['header', 'summary', 'experience', 'education', 'skills'].map(type => (
                        <button
                            key={type}
                            onClick={() => handleAddSection(type)}
                            className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        >
                            Add {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={sections}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-4">
                        {sections.map(section => (
                            <DraggableResumeSection key={section.id} section={section}>
                                <SectionForm section={section} isActive={activeSection?.id === section.id} />
                            </DraggableResumeSection>
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default ResumeEditor;