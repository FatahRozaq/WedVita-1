// src/Carousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import shrek from './assets/SHREK.jpeg'
import orang1 from './assets/Ellipse 10.png'
import orang2 from './assets/Ellipse 11.png'
import orang3 from './assets/Ellipse 12.png'

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,      // Enable center mode
    centerPadding: '0',    // Adjust the space between the center item and the edges
  };

  return (
    <Slider {...settings}>
      <div>
        <div class="flex justify-center items-center">
          <img src={orang1} alt="" />
        </div>
        <div class="px-60 font-normal grid-item mb-4 leading-8 tracking-tight text-wedvita-text-light md:text-1setxl text-center">
          Wedvita made our wedding preparations a breeze! The customizable invitations were not only beautiful but also saved us so much time. Our guests loved the digital RSVP option, and we can't thank Wedvita enough for helping us create the perfect start to our journey together.
        </div>
        <div class="text-center mb-8">
          Julya, Mother of the Bride
        </div>        
      </div>

      <div>
      <div class="flex justify-center items-center">
          <img src={orang2} alt="" />
        </div>        
        <div class="px-60 font-normal grid-item mb-8 leading-8 tracking-tight text-wedvita-text-light md:text-1setxl text-center ">
        As a wedding planner, I've used several invitation platforms, but Wedvita is my top choice. The range of templates and the ease of customization are unmatched. It's a game-changer for my clients, and it makes my job so much smoother.
        </div>
        <div class="text-center mb-8">
          Julya, Mother of the Bride
        </div>        
      </div>

      <div>
      <div class="flex justify-center items-center">
          <img src={orang3} alt="" />
        </div>        
        <div class="px-60 font-normal grid-item mb-8 leading-8 tracking-tight text-wedvita-text-light md:text-1setxl text-center ">
        Wedvita was our wedding invitation hero. The mobile accessibility was a lifesaver as we made last-minute changes. Our guests appreciated the prompt updates, and the privacy features gave us peace of mind. Thank you, Wedvita, for making our day perfect!
        </div>
        <div class="text-center mb-8">
          Julya, Mother of the Bride
        </div> 
        
      </div>
    </Slider>
  );
};

export default Carousel;
