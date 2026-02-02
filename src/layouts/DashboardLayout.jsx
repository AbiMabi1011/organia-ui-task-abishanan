import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

// DashboardLayout component
// Wraps the main application content with the Sidebar and Topbar
// Props:
// - children: The page content to render
const DashboardLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-white">
            {/* Sidebar fixed on the left */}
            <Sidebar />

            {/* Main Content Wrapper */}
            {/* ml-64 pushes content to the right to prevent overlap with fixed sidebar */}
            <div className="flex-1 ml-64 flex flex-col">
                {/* Top Navigation Bar */}
                <Topbar />

                {/* Main Content Area */}
                <main className="flex-1 p-8 bg-slate-50">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
