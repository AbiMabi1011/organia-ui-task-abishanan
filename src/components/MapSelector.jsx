import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet with Vite/Webpack
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map clicks
const LocationMarker = ({ position, setPosition }) => {
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
};

// Component to update map view when props change
const MapUpdater = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 13);
    }, [center, map]);
    return null;
}

const MapSelector = ({ latitude, longitude, onLocationSelect }) => {
    // Parse coordinates
    const lat = parseFloat(latitude) || 12.9716;
    const lng = parseFloat(longitude) || 77.5946;
    const position = [lat, lng];

    const handleSetPosition = (latlng) => {
        onLocationSelect({
            latitude: latlng.lat.toFixed(6),
            longitude: latlng.lng.toFixed(6)
        });
    };

    // Search State
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchTimeout = useRef(null);

    // Handle Search Input
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        // Debounce search
        if (searchTimeout.current) clearTimeout(searchTimeout.current);

        if (value.length > 2) {
            setIsSearching(true);
            searchTimeout.current = setTimeout(async () => {
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=5`);
                    const data = await response.json();
                    setResults(data);
                    setIsSearching(false);
                } catch (error) {
                    console.error("Search failed:", error);
                    setIsSearching(false);
                }
            }, 500); // 500ms delay
        } else {
            setResults([]);
            setIsSearching(false);
        }
    };

    // Handle Result Selection
    const handleSelectResult = (result) => {
        const newLat = parseFloat(result.lat);
        const newLon = parseFloat(result.lon);

        // Update State (which propels MapUpdater)
        onLocationSelect({
            latitude: newLat.toFixed(6),
            longitude: newLon.toFixed(6)
        });

        // Clear search
        setQuery(result.display_name.split(',')[0]); // Just keep the main name
        setResults([]);
    };

    return (
        <div className="relative h-96 w-full rounded-lg border border-gray-300 z-0">
            {/* Search Box Overlay */}
            <div className="absolute top-2 left-12 right-2 z-[1000] bg-white rounded-md shadow-md max-w-sm">
                <div className="flex items-center px-3 py-2 border-b border-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                    <input
                        type="text"
                        value={query}
                        onChange={handleSearchChange}
                        placeholder="Search places (e.g., Colombo)..."
                        className="w-full text-sm focus:outline-none text-gray-700"
                    />
                    {isSearching && (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 ml-2"></div>
                    )}
                </div>

                {/* Results Dropdown */}
                {results.length > 0 && (
                    <ul className="max-h-60 overflow-y-auto bg-white rounded-b-md shadow-lg divide-y divide-gray-100">
                        {results.map((result, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelectResult(result)}
                                className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 flex flex-col"
                            >
                                <span className="font-medium">{result.name || result.display_name.split(',')[0]}</span>
                                <span className="text-xs text-gray-500 truncate">{result.display_name}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
                // Explicitly set z-index for Leaflet compatibility
                className="z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker position={position} setPosition={handleSetPosition} />
                <MapUpdater center={position} />
            </MapContainer>
        </div>
    );
};

export default MapSelector;
