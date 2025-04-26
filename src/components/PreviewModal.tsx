import React from 'react';
import { FiX } from 'react-icons/fi';
import { Element } from '../store/useStore';
import RenderElement from './RenderElement';

interface PreviewModalProps {
    elements: Element[];
    onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ elements, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-full flex flex-col">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Preview</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FiX size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-auto p-6">
                    <div className="bg-white">
                        {elements.map((element) => (
                            <RenderElement
                                key={element.id}
                                element={element}
                                onSelect={() => { }}
                                isSelected={false}
                                isPreview={true}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewModal;