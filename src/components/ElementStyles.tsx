import React from 'react';
import { Element } from '../store/useStore';
import useStore from '../store/useStore';
import { FiType, FiLayout, FiBox, FiCornerDownRight } from 'react-icons/fi';

interface ElementStylesProps {
    element: Element;
}

const ElementStyles: React.FC<ElementStylesProps> = ({ element }) => {
    const { updateElementStyle, updateElement } = useStore();

    const handleStyleChange = (property: string, value: string) => {
        updateElementStyle(element.id, property, value);
    };

    const handlePropChange = (propName: string, value: any) => {
        const updatedProps = { ...element.props, [propName]: value };
        updateElement(element.id, { props: updatedProps });
    };

    return (
        <div className="p-4">
            <h3 className="text-lg font-medium mb-4">Element Styles</h3>

            <div className="mb-6">
                <h4 className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FiType className="mr-2" />
                    Typography
                </h4>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Font Size</label>
                        <select
                            value={element.styles.fontSize || ''}
                            onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        >
                            <option value="0.75rem">Extra Small</option>
                            <option value="0.875rem">Small</option>
                            <option value="1rem">Normal</option>
                            <option value="1.25rem">Large</option>
                            <option value="1.5rem">Extra Large</option>
                            <option value="2rem">2XL</option>
                            <option value="3rem">3XL</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Font Weight</label>
                        <select
                            value={element.styles.fontWeight || ''}
                            onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        >
                            <option value="normal">Normal</option>
                            <option value="bold">Bold</option>
                            <option value="lighter">Lighter</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Text Align</label>
                        <select
                            value={element.styles.textAlign || ''}
                            onChange={(e) => handleStyleChange('textAlign', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        >
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                            <option value="justify">Justify</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Color</label>
                        <div className="flex">
                            <input
                                type="color"
                                value={element.styles.color || '#000000'}
                                onChange={(e) => handleStyleChange('color', e.target.value)}
                                className="w-8 h-8 p-0 border border-gray-300 rounded-l"
                            />
                            <input
                                type="text"
                                value={element.styles.color || ''}
                                onChange={(e) => handleStyleChange('color', e.target.value)}
                                className="flex-1 p-2 border border-gray-300 border-l-0 rounded-r text-sm"
                                placeholder="#000000"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h4 className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FiLayout className="mr-2" />
                    Spacing
                </h4>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Padding</label>
                        <input
                            type="text"
                            value={element.styles.padding || ''}
                            onChange={(e) => handleStyleChange('padding', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                            placeholder="e.g. 1rem"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Margin</label>
                        <input
                            type="text"
                            value={element.styles.margin || ''}
                            onChange={(e) => handleStyleChange('margin', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                            placeholder="e.g. 0.5rem"
                        />
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h4 className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FiBox className="mr-2" />
                    Background & Border
                </h4>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Background</label>
                        <div className="flex">
                            <input
                                type="color"
                                value={element.styles.backgroundColor || '#ffffff'}
                                onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                                className="w-8 h-8 p-0 border border-gray-300 rounded-l"
                            />
                            <input
                                type="text"
                                value={element.styles.backgroundColor || ''}
                                onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                                className="flex-1 p-2 border border-gray-300 border-l-0 rounded-r text-sm"
                                placeholder="#ffffff"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Border Radius</label>
                        <input
                            type="text"
                            value={element.styles.borderRadius || ''}
                            onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                            placeholder="e.g. 0.25rem"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-xs text-gray-500 mb-1">Border</label>
                        <input
                            type="text"
                            value={element.styles.border || ''}
                            onChange={(e) => handleStyleChange('border', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                            placeholder="e.g. 1px solid #e5e7eb"
                        />
                    </div>
                </div>
            </div>

            {/* Element-specific properties */}
            {element.type === 'list' && (
                <div className="mb-6">
                    <h4 className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <FiCornerDownRight className="mr-2" />
                        List Properties
                    </h4>

                    <div className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id="ordered-list"
                            checked={element.props?.ordered || false}
                            onChange={(e) => handlePropChange('ordered', e.target.checked)}
                            className="mr-2"
                        />
                        <label htmlFor="ordered-list" className="text-sm">Ordered List</label>
                    </div>
                </div>
            )}

            {element.type === 'image' && (
                <div className="mb-6">
                    <h4 className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <FiCornerDownRight className="mr-2" />
                        Image Properties
                    </h4>

                    <div className="mb-2">
                        <label className="block text-xs text-gray-500 mb-1">Alt Text</label>
                        <input
                            type="text"
                            value={element.props?.alt || ''}
                            onChange={(e) => handlePropChange('alt', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                            placeholder="Image description"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ElementStyles;