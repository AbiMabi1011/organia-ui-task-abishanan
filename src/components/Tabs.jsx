import React from 'react';

// Tabs Component
// A controlled component that displays tabs and notifies parent on change
const Tabs = ({ activeTab, onTabChange, tabs }) => {
    return (
        <div className="w-full">
            {/* Tab Navigation Header */}
            <div className="flex border-b border-slate-200 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
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
        </div>
    );
};

export default Tabs;
