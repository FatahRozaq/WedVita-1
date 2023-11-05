import React, { useEffect, useState } from 'react';
import { Parallax, ParallaxBanner } from 'react-scroll-parallax';
import foreground from './img/foreground.png'
import background2 from './img/background2.png'
import './basic.css'
import '../../App.css'


const ParallaxComponent = () => {

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // Add an event listener to track the scroll position
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (


    <div className="parallax-container">
      <div
        className="parallax-bg"
        style={{ transform: `translateY(-${scrollPosition * 0.3}px)`} }
      >
      </div>
      <div className="parallax-content">
        <img src={foreground} alt="Illustration" />
      </div>
    </div>


    //   <Parallax y={[-20, 20]}>
    //   <div className="container-body">
    //     <ParallaxBanner
    //       layers={[
    //         { image: background2, amount: 0.9 },
    //         { image: foreground, amount: 0.1 },
    //       ]}
    //       className="aspect-[2/1]"
    //     >
    //       <div className="absolute inset-0 flex items-center justify-center">
    //         <h1 className="text-8xl text-white font-thin">Hello World!</h1>
    //       </div>
    //     </ParallaxBanner>
    //   </div>
    // </Parallax>
  );
};

export default ParallaxComponent;
