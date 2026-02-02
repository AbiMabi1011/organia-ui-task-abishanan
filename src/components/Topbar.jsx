import React from 'react';

// Topbar Component
// Displays page title, breadcrumbs, and user controls at the top of the main content area
const Topbar = () => {
    return (
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200">
            {/* Left Side: Page Title & Breadcrumbs */}
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
                <nav className="text-sm text-slate-500 mt-1">
                    <span>Home</span>
                    <span className="mx-2">&gt;</span>
                    <span className="text-slate-800 font-medium">Dashboard</span>
                </nav>
            </div>

            {/* Right Side: Notifications & User Profile */}
            <div className="flex items-center space-x-6">
                {/* Notification Icon (Simple Placeholder) */}
                <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                    <span className="sr-only">Notifications</span>
                    {/* Bell Icon Placeholder using text or SVG */}
                    <span className="text-xl">🔔</span>
                    {/* Notification Badge */}
                    <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                {/* User Profile Section */}
                <div className="flex items-center space-x-3 px-3 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-200">
                    {/* Avatar Placeholder */}
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                        JD
                    </div>

                    {/* User Info */}
                    <div className="text-left hidden sm:block">
                        <p className="text-sm font-semibold text-slate-700">John Doe</p>
                        <p className="text-xs text-slate-500">Admin</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
