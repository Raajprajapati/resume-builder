import React, { useState } from 'react';
import { FiX, FiDownload, FiCode, FiFileText } from 'react-icons/fi';
import { Element } from '../store/useStore';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface ExportModalProps {
    elements: Element[];
    onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ elements, onClose }) => {
    const [activeTab, setActiveTab] = useState<'html' | 'pdf' | 'code'>('html');
    const [htmlCode, setHtmlCode] = useState(() => generateHtmlCode(elements));

    function generateHtmlCode(elements: Element[]): string {
        const generateStyleString = (styles: Record<string, string>) => {
            return Object.entries(styles)
                .map(([key, value]) => `${key}: ${value};`)
                .join(' ');
        };

        const renderElement = (element: Element): string => {
            const styleAttr = element.styles ? ` style="${generateStyleString(element.styles)}"` : '';

            switch (element.type) {
                case 'heading':
                    return `<h2${styleAttr}>${element.content}</h2>`;
                case 'paragraph':
                    return `<p${styleAttr}>${element.content}</p>`;
                case 'image':
                    return `<img src="${element.content}" alt="${element.props?.alt || 'Image'}"${styleAttr}>`;
                case 'columns':
                    const columnsStyle = `${styleAttr} display: flex; gap: 1rem;`;
                    const columnChildren = element.children?.map(child =>
                        `<div style="flex: 1;">${renderElement(child)}</div>`
                    ).join('') || '';
                    return `<div style="${columnsStyle}">${columnChildren}</div>`;
                case 'list':
                    const listItems = element.content.split('\n')
                        .map(item => `<li>${item}</li>`)
                        .join('');
                    if (element.props?.ordered) {
                        return `<ol${styleAttr}>${listItems}</ol>`;
                    }
                    return `<ul${styleAttr}>${listItems}</ul>`;
                case 'button':
                    return `<button${styleAttr}>${element.content}</button>`;
                case 'divider':
                    return `<hr${styleAttr}>`;
                default:
                    return `<div${styleAttr}>${element.content}</div>`;
            }
        };

        const body = elements.map(renderElement).join('\n');

        return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Website</title>
</head>
<body>
${body}
</body>
</html>`;
    }

    const handleHtmlCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setHtmlCode(e.target.value);
    };

    const handleHtmlDownload = () => {
        const blob = new Blob([htmlCode], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my-website.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handlePdfDownload = async () => {
        // Create a temporary div to render our HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlCode;
        tempDiv.style.width = '800px';
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        document.body.appendChild(tempDiv);

        try {
            const canvas = await html2canvas(tempDiv);
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save('my-website.pdf');
        } catch (error) {
            console.error('PDF generation failed:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            document.body.removeChild(tempDiv);
        }
    };

    const handleCodeDownload = () => {
        // Generate React component code
        const componentCode = generateReactCode(elements);

        const blob = new Blob([componentCode], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Website.jsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const generateReactCode = (elements: Element[]): string => {
        const generateStyleObject = (styles: Record<string, string>) => {
            return `{${Object.entries(styles)
                .map(([key, value]) => `${key}: "${value}"`)
                .join(', ')}}`;
        };

        const renderReactElement = (element: Element): string => {
            const styleAttr = element.styles ? ` style=${generateStyleObject(element.styles)}` : '';

            switch (element.type) {
                case 'heading':
                    return `<h2${styleAttr}>${element.content}</h2>`;
                case 'paragraph':
                    return `<p${styleAttr}>${element.content}</p>`;
                case 'image':
                    return `<img src="${element.content}" alt="${element.props?.alt || 'Image'}"${styleAttr} />`;
                case 'columns':
                    const columnChildren = element.children?.map(child =>
                        `<div style={{ flex: 1 }}>${renderReactElement(child)}</div>`
                    ).join('') || '';
                    return `<div${styleAttr} style={{ ...${generateStyleObject(element.styles)}, display: 'flex', gap: '1rem' }}>${columnChildren}</div>`;
                case 'list':
                    const listItems = element.content.split('\n')
                        .map(item => `<li>${item}</li>`)
                        .join('');
                    if (element.props?.ordered) {
                        return `<ol${styleAttr}>${listItems}</ol>`;
                    }
                    return `<ul${styleAttr}>${listItems}</ul>`;
                case 'button':
                    return `<button${styleAttr}>${element.content}</button>`;
                case 'divider':
                    return `<hr${styleAttr} />`;
                default:
                    return `<div${styleAttr}>${element.content}</div>`;
            }
        };

        const body = elements.map(renderReactElement).join('\n      ');

        return `
import React from 'react';

const Website = () => {
  return (
    <div className="website-container">
      ${body}
    </div>
  );
};

export default Website;`;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-full flex flex-col">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Export Options</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FiX size={20} />
                    </button>
                </div>

                <div className="flex border-b border-gray-200">
                    <button
                        className={`px-4 py-2 ${activeTab === 'html' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('html')}
                    >
                        HTML
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === 'pdf' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('pdf')}
                    >
                        PDF
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === 'code' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('code')}
                    >
                        React Code
                    </button>
                </div>

                <div className="flex-1 overflow-auto p-6">
                    {activeTab === 'html' && (
                        <div>
                            <p className="mb-4">Edit the HTML code below:</p>
                            <textarea
                                value={htmlCode}
                                onChange={handleHtmlCodeChange}
                                className="w-full h-64 p-2 border border-gray-300 rounded font-mono text-sm"
                            />
                            <button
                                onClick={handleHtmlDownload}
                                className="mt-4 flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                                <FiDownload className="mr-2" />
                                Download HTML
                            </button>
                        </div>
                    )}

                    {activeTab === 'pdf' && (
                        <div>
                            <p className="mb-4">Generate a PDF version of your website:</p>
                            <div className="mb-4 p-4 border border-gray-200 rounded bg-gray-50">
                                <p className="text-sm text-gray-500">Preview not available in this view. Click the button below to download the PDF.</p>
                            </div>
                            <button
                                onClick={handlePdfDownload}
                                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                                <FiFileText className="mr-2" />
                                Download PDF
                            </button>
                        </div>
                    )}

                    {activeTab === 'code' && (
                        <div>
                            <p className="mb-4">Download your design as a React component:</p>
                            <pre className="w-full h-64 p-2 border border-gray-300 rounded font-mono text-sm overflow-auto">
                                {generateReactCode(elements)}
                            </pre>
                            <button
                                onClick={handleCodeDownload}
                                className="mt-4 flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                                <FiCode className="mr-2" />
                                Download React Component
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExportModal;