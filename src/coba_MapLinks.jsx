// MapLinks.js
import React from 'react';

function MapLinks() {
  return (
    <div>
      <h2>Map Links</h2>
      <ul>
        <li>
          <a href="/map?lat=51.505&lng=-0.09&zoom=13">Map 1</a>
        </li>
        <li>
          <a href="/map?lat=52.5200&lng=13.4050&zoom=15">Map 2</a>
        </li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
}

export default MapLinks;
