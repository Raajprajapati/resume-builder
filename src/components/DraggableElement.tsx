import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ElementType } from '../store/useStore';

interface DraggableElementProps {
    id?: string;
    type: ElementType;
    children?: React.ReactNode;
    isOverlay?: boolean;
}

const DraggableElement: React.FC<DraggableElementProps> = ({
    id,
    type,
    children,
    isOverlay = false
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: id || `temp-${type}`,
        disabled: isOverlay,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    // Placeholder content based on element type
    const getPlaceholderContent = () => {
        switch (type) {
            case 'heading':
                return <div className="p-4 font-bold text-lg">Heading Element</div>;
            case 'paragraph':
                return <div className="p-4">Paragraph Text</div>;
            case 'image':
                return <div className="p-4 flex justify-center"><div className="w-full h-32 bg-gray-200 flex items-center justify-center">Image</div></div>;
            case 'columns':
                return (
                    <div className="p-4 flex gap-4">
                        <div className="flex-1 p-2 border border-dashed border-gray-300">Column 1</div>
                        <div className="flex-1 p-2 border border-dashed border-gray-300">Column 2</div>
                    </div>
                );
            case 'list':
                return (
                    <div className="p-4">
                        <ul className="list-disc pl-5">
                            <li>Item 1</li>
                            <li>Item 2</li>
                            <li>Item 3</li>
                        </ul>
                    </div>
                );
            case 'button':
                return <div className="p-4"><button className="px-4 py-2 bg-blue-500 text-white rounded">Button</button></div>;
            case 'divider':
                return <div className="p-4"><hr /></div>;
            case 'link':
                return <a href='https:example.com'>example.com</a>;
            default:
                return <div className="p-4">Element</div>;
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`border ${isDragging ? 'border-dashed border-blue-400' : 'border-transparent'} ${isOverlay ? 'cursor-grabbing' : 'cursor-grab'} rounded-md bg-white mb-2`}
        >
            {children || getPlaceholderContent()}
        </div>
    );
};

export default DraggableElement;
