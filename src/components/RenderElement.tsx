import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FiEdit2, FiTrash2, FiMove } from 'react-icons/fi';
import useStore, { Element } from '../store/useStore';

interface RenderElementProps {
    element: Element;
    onSelect: () => void;
    isSelected: boolean;
    isPreview: boolean;
    parentId?: string;
}

const RenderElement: React.FC<RenderElementProps> = ({
    element,
    onSelect,
    isSelected,
    isPreview,
    parentId
}) => {
    const { removeElement, updateElement } = useStore();
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(element.content);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: element.id,
        disabled: isPreview,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        ...element.styles,
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditing(true);
        onSelect();
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        removeElement(element.id);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setEditContent(e.target.value);
    };

    const handleContentSave = () => {
        updateElement(element.id, { content: editContent });
        setIsEditing(false);
    };

    const renderContent = () => {
        if (isEditing && !isPreview) {
            switch (element.type) {
                case 'heading':
                case 'paragraph':
                case 'button':
                    return (
                        <textarea
                            value={editContent}
                            onChange={handleContentChange}
                            onBlur={handleContentSave}
                            autoFocus
                            className="w-full p-2 border border-gray-300 rounded"
                            rows={element.type === 'paragraph' ? 4 : 1}
                        />
                    );
                case 'image':
                    return (
                        <input
                            type="text"
                            value={editContent}
                            onChange={handleContentChange}
                            onBlur={handleContentSave}
                            autoFocus
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Image URL"
                        />
                    );
                case 'list':
                    return (
                        <textarea
                            value={editContent}
                            onChange={handleContentChange}
                            onBlur={handleContentSave}
                            autoFocus
                            className="w-full p-2 border border-gray-300 rounded"
                            rows={5}
                            placeholder="Item 1&#10;Item 2&#10;Item 3"
                        />
                    );
                default:
                    return null;
            }
        }

        switch (element.type) {
            case 'heading':
                return <h2 className="font-bold">{element.content}</h2>;
            case 'paragraph':
                return <p>{element.content}</p>;
            case 'image':
                return <img src={element.content} alt={element.props?.alt || "Image"} className="max-w-full h-auto" />;
            case 'columns':
                return (
                    <div className="flex flex-wrap" style={{ gap: '1rem' }}>
                        {element.children?.map((child) => (
                            <div key={child.id} className="flex-1 min-w-0">
                                <RenderElement
                                    element={child}
                                    onSelect={() => onSelect()}
                                    isSelected={false}
                                    isPreview={isPreview}
                                    parentId={element.id}
                                />
                            </div>
                        ))}
                    </div>
                );
            case 'list':
                return (
                    <div>
                        {element.props?.ordered ? (
                            <ol className="list-decimal pl-5">
                                {element.content.split('\n').map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ol>
                        ) : (
                            <ul className="list-disc pl-5">
                                {element.content.split('\n').map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                );
            case 'button':
                return (
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">
                        {element.content}
                    </button>
                );
            case 'divider':
                return <hr />;
            case 'link':
                return <a href={element.props?.url}> {element.content}</a>;
            default:
                return <div>{element.content}</div>;
        }
    };

    if (isPreview) {
        return (
            <div style={style}>
                {renderContent()}
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            onClick={() => {
                if (!isEditing) onSelect();
            }}
            className={`relative ${isSelected ? 'ring-2 ring-indigo-500 ring-opacity-50' : ''} ${isDragging ? 'opacity-50' : ''}`}
        >
            {!isPreview && (
                <div className="absolute -top-3 right-1/2 flex space-x-1 bg-white border border-gray-200 rounded-md shadow-sm z-10">
                    <button
                        {...attributes}
                        {...listeners}
                        className="p-1 cursor-grab text-gray-500 hover:text-blue-700"
                        title="Move"
                    >
                        <FiMove size={12} />
                    </button>
                    <button
                        onClick={handleEdit}
                        className="p-1 cursor-pointer text-gray-500 hover:text-blue-700"
                        title="Edit"
                    >
                        <FiEdit2 size={12} />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-1 cursor-pointer text-gray-500 hover:text-red-500"
                        title="Delete"
                    >
                        <FiTrash2 size={12} />
                    </button>
                </div>
            )}
            {renderContent()}
        </div>
    );
};

export default RenderElement;