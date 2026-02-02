import React, { useState } from 'react';
import Tabs from '../components/Tabs';
import InputField from '../components/InputField';
import MapSelector from '../components/MapSelector';

// Dashboard Page Component
// Displays the main dashboard content including tabbed navigation and the Main Details form
const Dashboard = () => {
    // Form State
    const [formData, setFormData] = useState({
        customerName: '',
        phoneNumber: '',
        email: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        postalCode: '',
        latitude: '12.9716', // Default/Mock value for now
        longitude: '77.5946' // Default/Mock value for now
    });

    // Error State
    const [errors, setErrors] = useState({});

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Handle Form Submission
    const handleSave = () => {
        const newErrors = {};

        // Validation Logic
        if (!formData.customerName.trim()) newErrors.customerName = 'Customer Name is required';
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required';
        if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address Line 1 is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            // Success - In a real app, this would be an API call
            console.log('Form Submitted successfully:', formData);
            alert('Details saved successfully!');
        }
    };

    return (
        <div>
            {/* Tabs Section */}
            <Tabs />

            <div className="mt-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Main Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Card 1: Basic Details */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-700 mb-4 border-b pb-2">Basic Details</h3>
                        <InputField
                            label="Customer Name"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            error={errors.customerName}
                        />
                        <InputField
                            label="Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            error={errors.phoneNumber}
                        />
                        <InputField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email address"
                            type="email"
                        />
                    </div>

                    {/* Card 2: Address Details */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-700 mb-4 border-b pb-2">Address Details</h3>
                        <InputField
                            label="Address Line 1"
                            name="addressLine1"
                            value={formData.addressLine1}
                            onChange={handleChange}
                            placeholder="Street address, P.O. box"
                            error={errors.addressLine1}
                        />
                        <InputField
                            label="Address Line 2"
                            name="addressLine2"
                            value={formData.addressLine2}
                            onChange={handleChange}
                            placeholder="Apartment, suite, unit, etc."
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <InputField
                                label="City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="City"
                                error={errors.city}
                            />
                            <InputField
                                label="Postal Code"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                placeholder="Zip/Postal Code"
                            />
                        </div>
                    </div>

                    {/* Card 3: Location */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 md:col-span-2">
                        <h3 className="text-lg font-semibold text-slate-700 mb-4 border-b pb-2">Location</h3>

                        {/* Map Component */}
                        <div className="mb-4">
                            <MapSelector
                                latitude={formData.latitude}
                                longitude={formData.longitude}
                                onLocationSelect={(coords) => {
                                    setFormData(prev => ({
                                        ...prev,
                                        latitude: coords.latitude,
                                        longitude: coords.longitude
                                    }));
                                }}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                label="Latitude"
                                name="latitude"
                                value={formData.latitude}
                                onChange={handleChange}
                            // disabled={true} // Optional: allow manual edits
                            />
                            <InputField
                                label="Longitude"
                                name="longitude"
                                value={formData.longitude}
                                onChange={handleChange}
                            // disabled={true}
                            />
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleSave}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Save Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
