import React, { useState } from 'react';

// Tabs Component
// Manages tab state and displays content based on the active tab
const Tabs = () => {
    // State to track the active tab
    // Default is 'T01'
    const [activeTab, setActiveTab] = useState('T01');

    // List of tabs
    const tabs = [
        { id: 'T01', label: 'T01' },
        { id: 'T02', label: 'T02' },
        { id: 'T03', label: 'T03' },
    ];

    return (
        <div className="w-full">
            {/* Tab Navigation Header */}
            <div className="flex border-b border-slate-200 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
              px-6 py-3 font-medium text-sm focus:outline-none transition-colors duration-200
              ${activeTab === tab.id
                                ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50/50'
                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                            }
            `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content Area */}
            <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm min-h-[200px]">
                {activeTab === 'T01' && (
                    <div>
                        <h3 className="text-lg font-medium text-slate-800 mb-2">Content for T01</h3>
                        <p className="text-slate-600">This is the placeholder content for the first tab (T01).</p>
                    </div>
                )}

                {activeTab === 'T02' && (
                    <div>
                        <h3 className="text-lg font-medium text-slate-800 mb-2">Content for T02</h3>
                        <p className="text-slate-600">This is the placeholder content for the second tab (T02).</p>
                    </div>
                )}

                {activeTab === 'T03' && (
                    <div>
                        <h3 className="text-lg font-medium text-slate-800 mb-2">Content for T03</h3>
                        <p className="text-slate-600">This is the placeholder content for the third tab (T03).</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tabs;
