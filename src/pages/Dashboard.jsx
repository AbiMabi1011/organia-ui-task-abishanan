import React from 'react';
import Tabs from '../components/Tabs';

// Dashboard Page Component
// Displays the main dashboard content including tabbed navigation
const Dashboard = () => {
    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800">Overview</h2>
                <p className="text-slate-500 mt-1">Welcome back. Here's what's happening with your projects today.</p>
            </div>

            {/* Tabs Section */}
            <Tabs />

            {/* Additional content can go here */}
        </div>
    );
};

export default Dashboard;
