import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import {distributors as locations} from 'clarity-distributors-api';

const mapContainerStyle = {
    width: '100%',
    height: '400px'
};

// Center on the first location
const center = locations[0].position;

const Map = () => {
    const [activeMarker, setActiveMarker] = useState(null);
    const [hoveredMarker, setHoveredMarker] = useState(null);

    const handleMarkerClick = (markerId) => {
        setActiveMarker(markerId);
        Liferay.fire('selectDistributor', locations[markerId]);
    };

    const handleMouseOver = (markerId) => {
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
                        >
                            {/* InfoWindow shown only on click */}
                            {hoveredMarker === location.id && (
                                <InfoWindow
                                    position={location.position}
                                    onCloseClick={() => setActiveMarker(null)}
                                    options={{ pixelOffset: new window.google.maps.Size(0, -8) }} // optional
                                >
                                    <div style={{ maxWidth: 300 }}>
                                        <div>{location.name}</div>
                                        <div>{location.street}</div>
                                        <div>{location.city}, {location.state}, {location.zipCode}</div>
                                    </div>
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