import React from 'react';

const TextAreaField = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
    rows = 3
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
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className={`px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-y
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
        `}
            />
            {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
        </div>
    );
};

export default TextAreaField;
