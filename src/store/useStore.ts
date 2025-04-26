import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { produce } from 'immer';

export type ElementType =
    | 'heading'
    | 'paragraph'
    | 'image'
    | 'columns'
    | 'list'
    | 'button'
    | 'divider';

export interface Element {
    id: string;
    type: ElementType;
    content: string;
    styles: Record<string, string>;
    children?: Element[];
    props?: Record<string, any>;
}

interface EditorState {
    elements: Element[];
    selectedElement: Element | null;
    activeTab: 'components' | 'styles' | 'settings';
    previewMode: boolean;

    // Actions
    addElement: (type: ElementType, parentId?: string, index?: number) => void;
    updateElement: (id: string, updates: Partial<Element>) => void;
    removeElement: (id: string) => void;
    moveElement: (id: string, targetId: string, position: 'before' | 'after' | 'inside') => void;
    selectElement: (element: Element | null) => void;
    setActiveTab: (tab: 'components' | 'styles' | 'settings') => void;
    setPreviewMode: (active: boolean) => void;
    updateElementStyle: (id: string, property: string, value: string) => void;
}

const defaultElements: Element[] = [];

const useStore = create<EditorState>((set) => ({
    elements: defaultElements,
    selectedElement: null,
    activeTab: 'components',
    previewMode: false,

    addElement: (type, parentId, index) => set(
        produce((state: EditorState) => {
            const newElement: Element = {
                id: uuidv4(),
                type,
                content: getDefaultContent(type),
                styles: getDefaultStyles(type),
                props: getDefaultProps(type),
            };

            if (type === 'columns') {
                newElement.children = [
                    {
                        id: uuidv4(),
                        type: 'paragraph',
                        content: 'Column 1',
                        styles: { padding: '1rem' }
                    },
                    {
                        id: uuidv4(),
                        type: 'paragraph',
                        content: 'Column 2',
                        styles: { padding: '1rem' }
                    }
                ];
            }

            if (!parentId) {
                if (index !== undefined) {
                    state.elements.splice(index, 0, newElement);
                } else {
                    state.elements.push(newElement);
                }
            } else {
                const findAndInsert = (elements: Element[], pid: string) => {
                    for (let i = 0; i < elements.length; i++) {
                        if (elements[i].id === pid) {
                            if (!elements[i].children) elements[i].children = [];
                            if (index !== undefined) {
                                elements[i]?.children?.splice(index, 0, newElement);
                            } else {
                                elements[i]?.children?.push(newElement);
                            }
                            return true;
                        }
                        if (elements[i].children && findAndInsert(elements[i].children!, pid)) {
                            return true;
                        }
                    }
                    return false;
                };
                findAndInsert(state.elements, parentId);
            }
        })
    ),

    updateElement: (id, updates) => set(
        produce((state: EditorState) => {
            const updateElementById = (elements: Element[]) => {
                for (let i = 0; i < elements.length; i++) {
                    if (elements[i].id === id) {
                        elements[i] = { ...elements[i], ...updates };
                        return true;
                    }
                    if (elements[i].children && updateElementById(elements[i].children!)) {
                        return true;
                    }
                }
                return false;
            };
            updateElementById(state.elements);
        })
    ),

    removeElement: (id) => set(
        produce((state: EditorState) => {
            const removeElementById = (elements: Element[]): Element[] => {
                return elements.filter(el => {
                    if (el.id === id) {
                        if (state.selectedElement?.id === id) {
                            state.selectedElement = null;
                        }
                        return false;
                    }
                    if (el.children) {
                        el.children = removeElementById(el.children);
                    }
                    return true;
                });
            };
            state.elements = removeElementById(state.elements);
        })
    ),

    moveElement: (id, targetId, position) => set(
        produce((state: EditorState) => {
            let elementToMove: Element | null = null;
            let elementToMoveParentId: string | null = null;

            // Find element to move and remove it from its current position
            const findAndRemove = (elements: Element[], parentId: string | null = null): boolean => {
                for (let i = 0; i < elements.length; i++) {
                    if (elements[i].id === id) {
                        elementToMove = elements[i];
                        elementToMoveParentId = parentId;
                        elements.splice(i, 1);
                        return true;
                    }
                    if (elements[i].children && findAndRemove(elements[i].children!, elements[i].id)) {
                        return true;
                    }
                }
                return false;
            };

            findAndRemove(state.elements);

            if (!elementToMove) return;

            // Find target element and insert the moved element
            const findAndInsert = (elements: Element[], parentId: string | null = null): boolean => {
                for (let i = 0; i < elements.length; i++) {
                    if (elements[i].id === targetId) {
                        if (position === 'before') {
                            elements.splice(i, 0, elementToMove!);
                            return true;
                        } else if (position === 'after') {
                            elements.splice(i + 1, 0, elementToMove!);
                            return true;
                        } else if (position === 'inside') {
                            if (!elements[i].children) elements[i].children = [];
                            elements[i].children!.push(elementToMove!);
                            return true;
                        }
                    }
                    if (elements[i].children && findAndInsert(elements[i].children!, elements[i].id)) {
                        return true;
                    }
                }
                return false;
            };

            if (!findAndInsert(state.elements)) {
                // If target not found, put the element back in its original position
                if (elementToMoveParentId) {
                    const findParentAndInsert = (elements: Element[]) => {
                        for (let i = 0; i < elements.length; i++) {
                            if (elements[i].id === elementToMoveParentId) {
                                if (!elements[i].children) elements[i].children = [];
                                elements[i].children!.push(elementToMove!);
                                return true;
                            }
                            if (elements[i].children && findParentAndInsert(elements[i].children!)) {
                                return true;
                            }
                        }
                        return false;
                    };
                    if (!findParentAndInsert(state.elements)) {
                        state.elements.push(elementToMove!);
                    }
                } else {
                    state.elements.push(elementToMove!);
                }
            }
        })
    ),

    selectElement: (element) => set({ selectedElement: element }),

    setActiveTab: (tab) => set({ activeTab: tab }),

    setPreviewMode: (active) => set({ previewMode: active }),

    updateElementStyle: (id, property, value) => set(
        produce((state: EditorState) => {
            const updateStyleById = (elements: Element[]) => {
                for (let i = 0; i < elements.length; i++) {
                    if (elements[i].id === id) {
                        elements[i].styles = { ...elements[i].styles, [property]: value };
                        if (state.selectedElement?.id === id) {
                            state.selectedElement = elements[i];
                        }
                        return true;
                    }
                    if (elements[i].children && updateStyleById(elements[i].children!)) {
                        return true;
                    }
                }
                return false;
            };
            updateStyleById(state.elements);
        })
    ),
}));

// Helper functions for default contents and styles
function getDefaultContent(type: ElementType): string {
    switch (type) {
        case 'heading': return 'Heading';
        case 'paragraph': return 'Enter your text here';
        case 'image': return 'https://via.placeholder.com/300x200';
        case 'list': return 'Item 1\nItem 2\nItem 3';
        case 'button': return 'Button';
        case 'divider': return '';
        default: return '';
    }
}

function getDefaultStyles(type: ElementType): Record<string, string> {
    const baseStyles = {
        padding: '1rem',
        margin: '0.5rem',
    };

    switch (type) {
        case 'heading':
            return { ...baseStyles, fontSize: '2rem', fontWeight: 'bold' };
        case 'paragraph':
            return { ...baseStyles, fontSize: '1rem' };
        case 'image':
            return { ...baseStyles, width: '100%', maxWidth: '300px' };
        case 'columns':
            return { ...baseStyles, display: 'flex', gap: '1rem' };
        case 'list':
            return { ...baseStyles };
        case 'button':
            return { ...baseStyles, backgroundColor: '#4F46E5', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem' };
        case 'divider':
            return { ...baseStyles, borderTop: '1px solid #E5E7EB', margin: '1rem 0' };
        default:
            return baseStyles;
    }
}

function getDefaultProps(type: ElementType): Record<string, any> {
    switch (type) {
        case 'image':
            return { alt: 'Image description' };
        case 'list':
            return { ordered: false };
        case 'columns':
            return { columns: 2 };
        default:
            return {};
    }
}

export default useStore;