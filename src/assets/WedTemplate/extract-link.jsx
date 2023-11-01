import React from 'react';

function extractCoordinatesFromURL(url) {
  const match = url.match(/#map=\d+\/(-?\d+\.\d+)\/(-?\d+\.\d+)(?:&|$)/);
  if (match) {
    const latitude = parseFloat(match[1]);
    const longitude = parseFloat(match[2]);
    return { latitude, longitude };
  }
  return null;
}

export default extractCoordinatesFromURL;