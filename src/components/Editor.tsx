import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import useStore, { Element, ElementType } from '../store/useStore';
import EditorSidebar from './EditorSidebar';
import EditorCanvas from './EditorCanvas';
import EditorHeader from './EditorHeader';
import PreviewModal from './PreviewModal';
import ExportModal from './ExportModal';
import ElementStyles from './ElementStyles';
import DraggableElement from './DraggableElement';

const Editor: React.FC = () => {
    const {
        elements,
        selectedElement,
        previewMode,
        addElement,
        moveElement,
        selectElement,
        setPreviewMode
    } = useStore();

    const [activeDragId, setActiveDragId] = useState<string | null>(null);
    const [draggedElementType, setDraggedElementType] = useState<ElementType | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const [showExport, setShowExport] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;

        // Handle both existing elements and new elements from sidebar
        if (typeof active.id === 'string') {
            setActiveDragId(active.id);

            // Check if this is a new element being dragged from the sidebar
            if (active.id.startsWith('new-')) {
                const type = active.id.replace('new-', '') as ElementType;
                setDraggedElementType(type);
            } else {
                // Find the element being dragged
                const findElement = (elements: Element[]): Element | null => {
                    for (const el of elements) {
                        if (el.id === active.id) return el;
                        if (el.children) {
                            const found = findElement(el.children);
                            if (found) return found;
                        }
                    }
                    return null;
                };

                const element = findElement(elements);
                if (element) {
                    setDraggedElementType(element.type);
                }
            }
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveDragId(null);
        setDraggedElementType(null);

        if (!over) return;

        // Handle new element being added from sidebar
        if (typeof active.id === 'string' && active.id.startsWith('new-')) {
            const type = active.id.replace('new-', '') as ElementType;

            // Find the position to insert the new element
            let targetId = over.id as string;
            let position: 'before' | 'after' = 'after';

            addElement(type);
            return;
        }

        // Handle moving existing elements
        if (active.id !== over.id && typeof active.id === 'string' && typeof over.id === 'string') {
            moveElement(active.id, over.id, 'after');
        }
    };

    const handleTogglePreview = () => {
        setShowPreview(!showPreview);
        setPreviewMode(!showPreview);
    };

    const handleToggleExport = () => {
        setShowExport(!showExport);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <EditorHeader
                onPreview={handleTogglePreview}
                onExport={handleToggleExport}
            />

            <div className="flex flex-1 overflow-hidden">
                <DndContext
                    sensors={sensors}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <EditorSidebar />

                    <div className="flex flex-1 overflow-hidden">
                        <div className="flex-1 overflow-auto p-4">
                            <SortableContext items={elements.map(e => e.id)} strategy={verticalListSortingStrategy}>
                                <EditorCanvas
                                    elements={elements}
                                    onSelectElement={selectElement}
                                    selectedElementId={selectedElement?.id}
                                />
                            </SortableContext>
                        </div>

                        {selectedElement && (
                            <div className="w-80 bg-white border-l border-gray-200 overflow-auto">
                                <ElementStyles element={selectedElement} />
                            </div>
                        )}
                    </div>

                    <DragOverlay>
                        {activeDragId && draggedElementType && (
                            <div className="opacity-70">
                                <DraggableElement
                                    type={draggedElementType}
                                    isOverlay
                                />
                            </div>
                        )}
                    </DragOverlay>
                </DndContext>
            </div>

            {showPreview && (
                <PreviewModal
                    elements={elements}
                    onClose={() => {
                        setShowPreview(false);
                        setPreviewMode(false);
                    }}
                />
            )}

            {showExport && (
                <ExportModal
                    elements={elements}
                    onClose={() => setShowExport(false)}
                />
            )}
        </div>
    );
};

export default Editor;