import React from 'react';
import { FiEye, FiDownload, FiSave } from 'react-icons/fi';

interface EditorHeaderProps {
  onPreview: () => void;
  onExport: () => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ onPreview, onExport }) => {
  return (
    <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-indigo-600">Website Builder</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={onPreview}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <FiEye className="mr-2" />
          Preview
        </button>
        
        <button 
          onClick={onExport}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
        >
          <FiDownload className="mr-2" />
          Export
        </button>
      </div>
    </header>
  );
};

export default EditorHeader;