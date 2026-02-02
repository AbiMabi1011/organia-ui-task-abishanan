import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

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

const provider = new OpenStreetMapProvider();

// Component to handle map clicks
const LocationMarker = ({ position, setPosition }) => {
    const map = useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setPosition({ lat, lng });
            map.flyTo([lat, lng], map.getZoom());
        },
    });

    return position ? <Marker position={[position.lat, position.lng]} /> : null;
};

// Component to programmatically move the map view
const MapUpdater = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView([center.lat, center.lng], 13);
        }
    }, [center, map]);
    return null;
};

const MapPicker = ({ location, onLocationSelect }) => {
    // Current Map/Marker Position
    // We expect location to be { lat, lng } or null
    // Fallback default: Bangalore
    const defaultPosition = { lat: 12.9716, lng: 77.5946 };
    const validLocation = location && !isNaN(location.lat) && !isNaN(location.lng)
        ? { lat: parseFloat(location.lat), lng: parseFloat(location.lng) }
        : defaultPosition;

    // Search State
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchTimeoutRef = useRef(null);

    // Handle Search Input Debate
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (value.length >= 3) {
            setIsSearching(true);
            searchTimeoutRef.current = setTimeout(async () => {
                try {
                    const searchResults = await provider.search({ query: value });
                    // Slice top 5 results
                    setResults(searchResults.slice(0, 5));
                } catch (error) {
                    console.error("Search failed:", error);
                } finally {
                    setIsSearching(false);
                }
            }, 500); // 500ms debounce
        } else {
            setResults([]);
            setIsSearching(false);
        }
    };

    // Handle selecting a search result
    const handleSelectResult = (result) => {
        const newLocation = { lat: parseFloat(result.y), lng: parseFloat(result.x) };
        onLocationSelect(newLocation);
        setQuery(result.label.split(',')[0]); // Keep simplified name
        setResults([]);
    };

    return (
        <div className="relative w-full h-96 rounded-lg border border-gray-300 z-0">
            {/* Custom Search Box Overlay */}
            <div className="absolute top-2 left-12 right-2 z-[1000] max-w-sm">
                <div className="relative">
                    <div className="flex items-center bg-white rounded-md shadow-md px-3 py-2 border border-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                        <input
                            type="text"
                            value={query}
                            onChange={handleSearchChange}
                            placeholder="Search places..."
                            className="w-full text-sm focus:outline-none text-gray-700"
                        />
                        {isSearching && (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 ml-2"></div>
                        )}
                    </div>

                    {/* Results Dropdown */}
                    {results.length > 0 && (
                        <ul className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto divide-y divide-gray-100 border border-gray-100">
                            {results.map((result, idx) => (
                                <li
                                    key={idx}
                                    onClick={() => handleSelectResult(result)}
                                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 flex flex-col"
                                >
                                    <span className="font-medium">{result.label.split(',')[0]}</span>
                                    <span className="text-xs text-gray-500 truncate">{result.label}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <MapContainer
                center={[validLocation.lat, validLocation.lng]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
                className="z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker
                    position={validLocation}
                    setPosition={onLocationSelect}
                />
                <MapUpdater center={validLocation} />
            </MapContainer>
        </div>
    );
};

export default MapPicker;
