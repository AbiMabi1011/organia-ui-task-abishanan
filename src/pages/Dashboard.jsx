import React, { useState } from 'react';
import Tabs from '../components/Tabs';
import InputField from '../components/InputField';
import TextAreaField from '../components/TextAreaField';
import MapPicker from '../components/MapPicker';
import SocialLinksForm from '../components/SocialLinksForm';
import DocumentUpload from '../components/DocumentUpload';

// Refactored Main Details Form into a sub-component for cleanliness
const MainDetailsForm = () => {
    // Form State
    const [formData, setFormData] = useState({
        customerName: '',
        phoneNumber: '',
        email: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        postalCode: '',
        latitude: '12.9716',
        longitude: '77.5946'
    });

    // Sub Details State (Items Array)
    const [items, setItems] = useState([
        {
            id: Date.now(),
            itemName: '',
            itemType: 'Fragile',
            quantity: '',
            height: '',
            width: '',
            length: '',
            weight: '',
            totalValue: '',
            description: ''
        }
    ]);

    // Error State
    const [errors, setErrors] = useState({});

    // Handle Main Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    // Handle Item Input Change
    const handleItemChange = (id, e) => {
        const { name, value } = e.target;
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, [name]: value } : item
            )
        );

        // Clear item specific error
        const errorKey = `item_${id}_${name}`;
        if (errors[errorKey]) {
            setErrors(prev => ({ ...prev, [errorKey]: '' }));
        }
    };

    // Add New Item
    const addItem = () => {
        setItems(prev => [
            ...prev,
            {
                id: Date.now(),
                itemName: '',
                itemType: 'Fragile',
                quantity: '',
                height: '',
                width: '',
                length: '',
                weight: '',
                totalValue: '',
                description: ''
            }
        ]);
    };

    // Remove Item
    const removeItem = (id) => {
        if (items.length > 1) {
            setItems(prev => prev.filter(item => item.id !== id));
        }
    };

    // Handle Form Submission
    const handleSave = () => {
        const newErrors = {};

        // --- Main Details Validation ---
        if (!formData.customerName.trim()) newErrors.customerName = 'Customer Name is required';

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone Number is required';
        } else if (!/^\d{10,}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
            newErrors.phoneNumber = 'Phone number must be at least 10 digits';
        }

        if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address format';
        }

        if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address Line 1 is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';

        if (formData.postalCode.trim() && !/^\d+$/.test(formData.postalCode)) {
            newErrors.postalCode = 'Postal Code must contain only numbers';
        }

        // --- Sub Details (Items) Validation ---
        items.forEach(item => {
            if (!item.itemName.trim()) newErrors[`item_${item.id}_itemName`] = 'Item Name is required';
            if (!item.quantity) newErrors[`item_${item.id}_quantity`] = 'Quantity is required';
            if (!item.totalValue) newErrors[`item_${item.id}_totalValue`] = 'Total Value is required';
            if (!item.weight) newErrors[`item_${item.id}_weight`] = 'Weight is required';
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            alert('Please fix requirements before saving.');
        } else {
            const finalData = { ...formData, items };
            console.log('Form Submitted successfully:', finalData);
            alert('Details and Items saved successfully!');
            setErrors({});
        }
    };

    return (
        <div>
            {/* --- MAIN DETAILS SECTION --- */}
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Main Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Basic Details */}
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
                        error={errors.email}
                    />
                </div>

                {/* Address Details */}
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
                            error={errors.postalCode}
                        />
                    </div>
                </div>

                {/* Location */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 md:col-span-2">
                    <h3 className="text-lg font-semibold text-slate-700 mb-4 border-b pb-2">Location</h3>
                    <div className="mb-4">
                        <MapPicker
                            location={{ lat: formData.latitude, lng: formData.longitude }}
                            onLocationSelect={(newLoc) => {
                                setFormData(prev => ({
                                    ...prev,
                                    latitude: newLoc.lat,
                                    longitude: newLoc.lng
                                }));
                            }}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="Latitude" name="latitude" value={formData.latitude} onChange={handleChange} />
                        <InputField label="Longitude" name="longitude" value={formData.longitude} onChange={handleChange} />
                    </div>
                </div>
            </div>

            {/* --- SUB DETAILS SECTION (ITEMS) --- */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Sub Details</h2>
                <button
                    onClick={addItem}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded shadow transition-colors"
                >
                    + Add Item
                </button>
            </div>

            <div className="space-y-6">
                {items.map((item, index) => (
                    <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 relative">
                        {/* Remove Button (only if more than 1 item) */}
                        {items.length > 1 && (
                            <button
                                onClick={() => removeItem(item.id)}
                                className="absolute top-4 right-4 text-red-400 hover:text-red-600 p-1"
                                title="Remove Item"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        )}

                        <h3 className="text-lg font-semibold text-slate-700 mb-4 border-b pb-2">
                            Item {index + 1}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <InputField
                                label="Item Name"
                                name="itemName"
                                value={item.itemName}
                                onChange={(e) => handleItemChange(item.id, e)}
                                placeholder="e.g. Red Chair"
                                error={errors[`item_${item.id}_itemName`]}
                            />

                            {/* Item Type Dropdown */}
                            <div className="flex flex-col mb-4">
                                <label className="mb-1 text-sm font-medium text-gray-700">Item Type</label>
                                <select
                                    name="itemType"
                                    value={item.itemType}
                                    onChange={(e) => handleItemChange(item.id, e)}
                                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                >
                                    <option value="Fragile">Fragile</option>
                                    <option value="Liquid">Liquid</option>
                                    <option value="Electronic">Electronic</option>
                                    <option value="General">General</option>
                                </select>
                            </div>

                            <InputField
                                label="Quantity"
                                name="quantity"
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(item.id, e)}
                                placeholder="0"
                                error={errors[`item_${item.id}_quantity`]}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <InputField
                                label="Height (cm)"
                                name="height"
                                type="number"
                                value={item.height}
                                onChange={(e) => handleItemChange(item.id, e)}
                                placeholder="0"
                            />
                            <InputField
                                label="Width (cm)"
                                name="width"
                                type="number"
                                value={item.width}
                                onChange={(e) => handleItemChange(item.id, e)}
                                placeholder="0"
                            />
                            <InputField
                                label="Length (cm)"
                                name="length"
                                type="number"
                                value={item.length}
                                onChange={(e) => handleItemChange(item.id, e)}
                                placeholder="0"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                label="Weight (kg)"
                                name="weight"
                                type="number"
                                value={item.weight}
                                onChange={(e) => handleItemChange(item.id, e)}
                                placeholder="0.0"
                                error={errors[`item_${item.id}_weight`]}
                            />
                            <InputField
                                label="Total Value ($)"
                                name="totalValue"
                                type="number"
                                value={item.totalValue}
                                onChange={(e) => handleItemChange(item.id, e)}
                                placeholder="0.00"
                                error={errors[`item_${item.id}_totalValue`]}
                            />
                        </div>

                        <TextAreaField
                            label="Description"
                            name="description"
                            value={item.description}
                            onChange={(e) => handleItemChange(item.id, e)}
                            placeholder="Additional details about the item..."
                            rows={2}
                        />
                    </div>
                ))}
            </div>

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Save All Details
                </button>
            </div>
        </div>
    );
}

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('main');
    const tabs = [
        { id: 'main', label: 'Main Details' },
        { id: 'social', label: 'Social Links' },
        { id: 'documents', label: 'Documents' },
    ];

    return (
        <div>
            <Tabs activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />
            <div className="mt-8">
                {activeTab === 'main' && <MainDetailsForm />}
                {activeTab === 'social' && <SocialLinksForm />}
                {activeTab === 'documents' && <DocumentUpload />}
            </div>
        </div>
    );
};

export default Dashboard;
