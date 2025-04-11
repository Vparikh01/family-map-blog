import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import { useEffect, useState } from 'react';

const locations = [
  {
    name: 'Sacramento, CA',
    coords: [38.5816, -121.4944],
    image: 'src/assets/Screenshot 2025-04-10 at 11.22.17 PM.png',
    caption: 'A lovely city with rich history.',
  },
  {
    name: 'Arlington, TX',
    coords: [32.7357, -97.1081],
    image: 'src/assets/Screenshot 2025-04-10 at 11.22.26 PM.png',
    caption: 'Home to great sports and vibrant communities.',
  },
  {
    name: 'Tampa, FL',
    coords: [27.9506, -82.4572],
    image: 'https://via.placeholder.com/400x200?text=Tampa',
    caption: 'Sunny vibes and waterfront views.',
  },
  {
    name: 'Chicago, IL',
    coords: [41.8781, -87.6298],
    image: 'https://via.placeholder.com/400x200?text=Chicago',
    caption: 'The Windy City — big architecture and deep-dish pizza.',
  },
  {
    name: 'Santa Clara, CA',
    coords: [37.3541, -121.9552],
    image: 'src/assets/Screenshot 2025-04-10 at 11.21.47 PM.png',
    caption: 'Silicon Valley heartland.',
  },
];

// FitBounds component
function FitBounds({ markers }) {
  const map = useMap();

  useEffect(() => {
    const bounds = markers.map((loc) => loc.coords);
    map.fitBounds(bounds, { padding: [10, 10] });
  }, [map, markers]);

  return null;
}

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="app-container">
      <h1>🗺️ US Map Blog</h1>
      <p>Click a location to explore its story.</p>

      <div className="map-wrapper">
        <MapContainer
          zoom={4}
          scrollWheelZoom={true}
          className="map"
          center={[37.8, -96]}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {locations.map((loc, idx) => (
            <Marker
              key={idx}
              position={loc.coords}
              eventHandlers={{
                click: () => setSelectedLocation(loc),
              }}
            />
          ))}

          <FitBounds markers={locations} />
        </MapContainer>
      </div>

      {selectedLocation && (
        <div className="info-box">
          <button
            className="close-button"
            onClick={() => setSelectedLocation(null)}
          >
            ×
          </button>
          <img src={selectedLocation.image} alt={selectedLocation.name} />
          <h2>{selectedLocation.name}</h2>
          <p>{selectedLocation.caption}</p>
        </div>
      )}
    </div>
  );
}

export default App;