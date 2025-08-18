import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: '400px'
};

// Example list of locations (could come from props or API)
const locations = [
    { id: 1, name: 'San Francisco', position: { lat: 37.7749, lng: -122.4194 } },
    { id: 2, name: 'Los Angeles', position: { lat: 34.0522, lng: -118.2437 } },
    { id: 3, name: 'New York', position: { lat: 40.7128, lng: -74.0060 } },
    { id: 4, name: 'Chicago', position: { lat: 41.8781, lng: -87.6298 } },
];

// Center on the first location
const center = locations[0].position;

const Map = () => {
    const [activeMarker, setActiveMarker] = useState(null);
    const [hoveredMarker, setHoveredMarker] = useState(null);

    const handleMarkerClick = (markerId) => {
        console.log("click: " + markerId);
        setActiveMarker(markerId);
    };

    const handleMouseOver = (markerId) => {
        console.log("hover: " + markerId);
        setHoveredMarker(markerId);
    };

    const handleMouseOut = () => {
        setHoveredMarker(null);
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <LoadScript googleMapsApiKey="AIzaSyDUx0c5_X4DgZ6fBNWZd1-t-SYF_0JUWdc">
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={4}
                    options={{
                        mapTypeControl: false,
                        fullscreenControl: false,
                        streetViewControl: false,
                        zoomControl: true,
                    }}
                >
                    {locations.map((location) => (
                        <Marker
                            key={location.id}
                            position={location.position}
                            title={location.name}
                            onClick={() => handleMarkerClick(location.id)}
                            onMouseOver={() => handleMouseOver(location.id)}
                            onMouseOut={handleMouseOut}
                            // Optionally use a custom icon on hover
                            icon={
                                hoveredMarker === location.id
                                    ? {
                                        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                                    }
                                    : undefined
                            }
                        >
                            {/* InfoWindow shown only on click */}
                            {activeMarker === location.id && (
                                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                    <div>{location.name}</div>
                                </InfoWindow>
                            )}
                        </Marker>
                    ))}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default Map;