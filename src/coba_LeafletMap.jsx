import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; //kesalahan - jgn pake map, harusnya mapcontainer
import extractCoordinatesFromURL from './assets/WedTemplate/extract-link';
//map gk tampil: karena gk ngedefine height

function LeafletMap({wedUrl, groomName, brideName}) {
  // const position = [latitude, longitude]

  // const url = 'https://www.openstreetmap.org/#map=18/-6.86868/107.58494&layers=N';

  const url = String(wedUrl);

  // if (typeof url !== 'string') {
  //   return <div>Invalid URL</div>;
  // }
  
  const coordinates = extractCoordinatesFromURL(url);

  if (coordinates == null) {
    return <div>Loading...</div>;
  }

  const { latitude, longitude } = coordinates;

  const position = [latitude, longitude]

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '400px' }}>

    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        Pernikahan {groomName} dan {brideName} <br />
        Ada Disini!
      </Popup>
    </Marker>
  </MapContainer>
  );
}

export default LeafletMap;
