// src/components/DraggableResumeSection.jsx
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useResume } from '../hooks/useResume';

const DraggableResumeSection = ({ section, children }) => {
    const { setActiveSection } = useResume();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: section.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={() => setActiveSection(section)}
            className={`resume-section ${isDragging ? 'ring-2 ring-blue-500' : ''}`}
        >
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                    {section.title}
                </h3>
            </div>
            {children}
        </div>
    );
};

export default DraggableResumeSection;