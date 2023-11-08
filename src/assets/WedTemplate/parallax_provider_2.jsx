import React from 'react';
import ReactDOM from 'react-dom';
import { ParallaxProvider } from 'react-scroll-parallax'; // Import ParallaxProvider
import WeddingTemplateLeaflet2 from './template_leaflet_2_parallax';
import ParallaxComponent from './parallax_component_2.jsx';

function ParallaxProvider2() {
      return (
        <ParallaxProvider>
          <ParallaxComponent />
        </ParallaxProvider>
      );
}

export default ParallaxProvider2;