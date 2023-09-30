// src/Carousel2.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import shrek from './assets/SHREK.jpeg'
import blueTempl from './assets/blue.jpg'
import img1 from './assets/image-1.jpg'

const Carousel2 = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Display 3 items per page
        slidesToScroll: 1,
        centerMode: true,      // Enable center mode
        centerPadding: '0',    // Adjust the space between the center item and the edges
        appendDots: (dots) => (
            <div style={{ position: 'absolute', bottom: '-45px', left: '50%', transform: 'translateX(-50%)' }}>
              <ul>{dots}</ul>
            </div>
        )
      };
    
      return (
        <Slider {...settings}>
    <div class="px-2">
      {/* <div className="px-4"> */}
      <div class="max-w-sm bg-white rounded-lg border border-gray-200 ">
            <a href="#">
                <img class="rounded-t-lg" src={blueTempl} alt="" />
            </a>
            <div class="p-5">
                <a href="#">
                    <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">Template 1</h5>
                </a>
            </div>
        </div>
      {/* </div> */}
    </div>

    <div class="px-2">
      {/* <div className="px-4"> */}
        <div class="max-w-sm bg-white rounded-lg border border-gray-200">
            <a href="#">
                <img class="rounded-t-lg" src={blueTempl} alt="" />
            </a>
            <div class="p-5">
                <a href="#">
                    <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">Template 2</h5>
                </a>
            </div>
        </div>
      {/* </div> */}
    </div>

    <div class="px-2">
      {/* <div className="px-4"> */}
        <div class="max-w-sm bg-white rounded-lg border border-gray-200">
            <a href="#">
                <img class="rounded-t-lg" src={blueTempl} alt="" />
            </a>
            <div class="p-5">
                <a href="#">
                    <h5 class=" text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">Template 3</h5>
                </a>
            </div>
        </div>  
      {/* </div> */}
    </div>

    <div class="px-2">            
      {/* <div className="px-4"> */}
        <div class="max-w-sm bg-white rounded-lg border border-gray-200">
            <a href="#">
                <img class="rounded-t-lg" src={blueTempl} alt="" />
            </a>
            <div class="p-5">
                <a href="#">
                    <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">Template 4</h5>
                </a>
            </div>
        </div>  
      {/* </div> */}        
    </div>

         
        
          {/* Add more items as needed */}
        </Slider>
      );
};

export default Carousel2;
