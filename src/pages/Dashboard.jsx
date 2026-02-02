import React from 'react';

// Dashboard Page Component
// Placeholder for the main dashboard view
const Dashboard = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Dashboard</h2>
            <p className="text-slate-600 text-lg">
                Welcome to your dashboard. Select an item from the sidebar to get started.
            </p>

            {/* Example content to demonstrate scrolling or layout */}
            <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="text-xl font-semibold mb-2 text-slate-700">Content Section</h3>
                <p className="text-slate-600">
                    This is where your main content will go. The layout automatically handles
                    the sidebar positioning.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
