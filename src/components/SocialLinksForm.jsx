import React, { useState } from 'react';
import InputField from './InputField';

const SocialLinksForm = () => {
    const [socialData, setSocialData] = useState({
        linkedin: '',
        twitter: '',
        facebook: '',
        instagram: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSocialData(prev => ({ ...prev, [name]: value }));

        // Clear error
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateUrl = (url) => {
        if (!url) return true; // Allow empty
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    };

    const handleSave = () => {
        const newErrors = {};
        if (socialData.linkedin && !validateUrl(socialData.linkedin)) newErrors.linkedin = "Invalid URL";
        if (socialData.twitter && !validateUrl(socialData.twitter)) newErrors.twitter = "Invalid URL";
        if (socialData.facebook && !validateUrl(socialData.facebook)) newErrors.facebook = "Invalid URL";
        if (socialData.instagram && !validateUrl(socialData.instagram)) newErrors.instagram = "Invalid URL";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            console.log('Social Links Saved:', socialData);
            alert('Social links saved successfully!');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-700 mb-4 border-b pb-2">Social Profiles</h3>
            <p className="text-sm text-slate-500 mb-6">Add your social media profiles to connect with more people.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    label="LinkedIn Profile"
                    name="linkedin"
                    value={socialData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/..."
                    error={errors.linkedin}
                />
                <InputField
                    label="Twitter Profile"
                    name="twitter"
                    value={socialData.twitter}
                    onChange={handleChange}
                    placeholder="https://twitter.com/..."
                    error={errors.twitter}
                />
                <InputField
                    label="Facebook Profile"
                    name="facebook"
                    value={socialData.facebook}
                    onChange={handleChange}
                    placeholder="https://facebook.com/..."
                    error={errors.facebook}
                />
                <InputField
                    label="Instagram Profile"
                    name="instagram"
                    value={socialData.instagram}
                    onChange={handleChange}
                    placeholder="https://instagram.com/..."
                    error={errors.instagram}
                />
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md shadow transition-colors"
                >
                    Save Links
                </button>
            </div>
        </div>
    );
};

export default SocialLinksForm;
