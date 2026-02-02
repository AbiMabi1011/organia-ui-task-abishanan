import React from 'react';

const InputField = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
    disabled = false,
    type = "text"
}) => {
    return (
        <div className="flex flex-col mb-4">
            {label && (
                <label
                    htmlFor={name}
                    className="mb-1 text-sm font-medium text-gray-700"
                >
                    {label} {error && <span className="text-red-500">*</span>}
                </label>
            )}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'}
        `}
            />
            {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
        </div>
    );
};

export default InputField;
