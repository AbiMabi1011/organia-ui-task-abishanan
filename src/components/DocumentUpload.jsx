import React from 'react';

const DocumentUpload = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center py-16">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
            </div>
            <h3 className="mt-2 text-sm font-semibold text-gray-900">Upload documents</h3>
            <p className="mt-1 text-sm text-gray-500">Drag and drop files here, or click to select files</p>
            <div className="mt-6">
                <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md shadow-sm transition-colors">
                    Select Files
                </button>
            </div>
        </div>
    );
};

export default DocumentUpload;
