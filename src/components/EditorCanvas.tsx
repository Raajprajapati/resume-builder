import React from 'react';
import useStore, { Element as ElementType } from '../store/useStore';
import { FiPlus } from 'react-icons/fi';
import RenderElement from './RenderElement';

interface EditorCanvasProps {
  elements: ElementType[];
  onSelectElement: (element: ElementType | null) => void;
  selectedElementId?: string;
}

const EditorCanvas: React.FC<EditorCanvasProps> = ({
  elements,
  onSelectElement,
  selectedElementId
}) => {
  const { addElement, previewMode } = useStore();

  // Function to add a new element at a specific position
  const handleAddAtPosition = (index: number) => {
    // Show a popup to select component type or use a default
    addElement('paragraph', undefined, index);
  };

  if (elements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <p className="mb-4">Drag components from the sidebar or add your first element</p>
        <button
          onClick={() => addElement('heading')}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          <FiPlus className="mr-2" />
          Add Element
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-white border border-gray-200 rounded-lg shadow-sm">
      {!previewMode && (
        <div className="p-2 border-b border-gray-200 bg-gray-50 flex justify-center">
          <button
            onClick={() => addElement('heading', undefined, 0)}
            className="flex items-center px-3 py-1 cursor-pointer text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <FiPlus className="mr-1" size={12} />
            Add at top
          </button>
        </div>
      )}

      {elements.map((element, index) => (
        <React.Fragment key={element.id}>
          <RenderElement
            element={element}
            onSelect={() => onSelectElement(element)}
            isSelected={element.id === selectedElementId}
            isPreview={previewMode}
          />

          {!previewMode && (
            <div className="flex justify-center my-1">
              <button
                onClick={() => handleAddAtPosition(index + 1)}
                className="flex items-center px-2 py-1 text-xs cursor-pointer font-medium text-gray-500 bg-gray-100 rounded-full hover:bg-red-200"
              >
                <FiPlus size={15} />
              </button>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default EditorCanvas;