import React from 'react';

// Sidebar component
// Displays a fixed left sidebar with navigation items
const Sidebar = () => {
    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-100 border-r border-slate-200">
            {/* Sidebar Header / Logo Area (Optional, keeping it simple for now) */}
            <div className="p-6">
                <h1 className="text-2xl font-bold text-slate-800">My App</h1>
            </div>

            {/* Navigation Menu */}
            <nav className="mt-6 px-4">
                <ul>
                    {/* Home Item - Highlighted as active */}
                    <li className="mb-2">
                        <a
                            href="#"
                            className="block px-4 py-2.5 bg-blue-100 text-blue-700 rounded-lg font-medium transition-colors duration-200"
                        >
                            Home
                        </a>
                    </li>

                    {/* Menu2 Item - Inactive state */}
                    <li>
                        <a
                            href="#"
                            className="block px-4 py-2.5 text-slate-600 hover:bg-slate-200 hover:text-slate-900 rounded-lg font-medium transition-colors duration-200"
                        >
                            Menu2
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
