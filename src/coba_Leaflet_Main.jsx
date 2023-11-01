import React from 'react';
import LeafletMap from './coba_LeafletMap';
import MapLinks from './coba_MapLinks';
import 'leaflet/dist/leaflet.css';

function LeafletMain() {
  return (
    <div>
      <h1>Leaflet Map Example</h1>
      <LeafletMap />
    </div>
  );
}

export default LeafletMain;
