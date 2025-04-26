import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { FiType, FiImage, FiColumns, FiList, FiActivity, FiMinus } from 'react-icons/fi';
import useStore, { ElementType } from '../store/useStore';
import { MdAdd } from 'react-icons/md';

const ElementButton: React.FC<{
    type: ElementType,
    icon: React.ReactNode,
    label: string,
    onClick?: () => void
}> = ({ type, icon, label, onClick }) => {
    const { setNodeRef, attributes, listeners } = useDraggable({
        id: `new-${type}`,
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className="flex items-center p-3 mb-2 bg-white border border-gray-200 rounded-md cursor-move hover:border-indigo-300 hover:bg-indigo-50"
            
        >
            <div className="mr-3 text-gray-500">{icon}</div>
            <span>{label}</span>
            <button onClick={onClick} className='btn shadow-2xs border-solid border ml-5 border-black-200 hover:border-indigo-300 hover:cursor-pointer'><MdAdd /></button>
        </div>
    );
};

const EditorSidebar: React.FC = () => {
    const { addElement, activeTab, setActiveTab } = useStore();

    const handleAdd = (type: ElementType) => {
        addElement(type);
    };

    return (
        <div className="w-64 bg-white border-r border-gray-200 overflow-auto">
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">Components</h2>

                <ElementButton
                    type="heading"
                    icon={<FiType size={18} />}
                    label="Heading"
                    onClick={() => handleAdd('heading')}
                />

                <ElementButton
                    type="paragraph"
                    icon={<FiType size={18} />}
                    label="Paragraph"
                    onClick={() => handleAdd('paragraph')}
                />

                <ElementButton
                    type="image"
                    icon={<FiImage size={18} />}
                    label="Image"
                    onClick={() => handleAdd('image')}
                />

                <ElementButton
                    type="columns"
                    icon={<FiColumns size={18} />}
                    label="Columns"
                    onClick={() => handleAdd('columns')}
                />

                <ElementButton
                    type="list"
                    icon={<FiList size={18} />}
                    label="List"
                    onClick={() => handleAdd('list')}
                />

                <ElementButton
                    type="button"
                    icon={<FiActivity size={18} />}
                    label="Button"
                    onClick={() => handleAdd('button')}
                />

                <ElementButton
                    type="divider"
                    icon={<FiMinus size={18} />}
                    label="Divider"
                    onClick={() => handleAdd('divider')}
                />
            </div>
        </div>
    );
};

export default EditorSidebar;