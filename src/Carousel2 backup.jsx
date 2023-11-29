// src/Carousel2.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import shrek from './assets/SHREK.jpeg'
import blueTempl from './assets/blue.jpg'
import img1 from './assets/image-1.jpg'
import { useState, useEffect } from 'react'
import axios from 'axios'
import axiosClient from './axios-client';
import { Link, Navigate } from 'react-router-dom'
import { useStateContext } from './Contexts/ContextProvider'
import { redirect } from 'react-router-dom'

const Carousel2 = () => {

  const [designs, setDesigns] = useState([]);
  
  useEffect(() => {
        
    axiosClient.get('/user').then(({ data }) => {
      setUser(data);
    });

    axiosClient
      .get('/getInvitationDesigns')
      .then((response) => {
        setDesigns(response.data.designs);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [token, setUser, setToken, setDesigns]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    centerMode: true,      // Enable center mode
    centerPadding: '0',    // Adjust the space between the center item and the edges

    slidesToShow: 3, // Display 3 items per page
    responsive: [
      {
        breakpoint: 768, // Adjust this breakpoint as needed
        settings: {
          slidesToShow: 1, // For screens smaller than 768px wide, display 1 item per page
        },
      },
      {
        breakpoint: 992, // Adjust this breakpoint as needed
        settings: {
          slidesToShow: 2, // For screens smaller than 992px wide, display 2 items per page
        },
      },
      // Add more breakpoints and settings as needed
    ],
    appendDots: (dots) => (
      <div style={{ position: 'absolute', bottom: '-45px', left: '50%', transform: 'translateX(-50%)' }}>
        <ul>{dots}</ul>
      </div>
    ),
  };

  return (
    <Slider {...settings}>
      <div className="Container mx-auto">
        <div className="px-2 flex justify-center">
          {/* <div className="px-4"> */}
          <div className="max-w-sm bg-white rounded-lg border border-gray-200 ">
            <a href="#">
              <img className="rounded-t-lg" src={blueTempl} alt="" />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">Template 1</h5>
              </a>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>

      <div className="Container mx-auto">
        <div className="px-2 flex justify-center">
          {/* <div className="px-4"> */}
          <div className="max-w-sm bg-white rounded-lg border border-gray-200">
            <a href="#">
              <img className="rounded-t-lg" src={blueTempl} alt="" />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">Template 2</h5>
              </a>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>

      <div className="Container mx-auto">
        <div className="px-2 flex justify-center">
          {/* <div className="px-4"> */}
          <div className="max-w-sm bg-white rounded-lg border border-gray-200">
            <a href="#">
              <img className="rounded-t-lg" src={blueTempl} alt="" />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className=" text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">Template 3</h5>
              </a>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>

      <div className="Container mx-auto">
        <div className="px-2 flex justify-center">
          {/* <div className="px-4"> */}
          <div className="max-w-sm bg-white rounded-lg border border-gray-200">
            <a href="#">
              <img className="rounded-t-lg" src={blueTempl} alt="" />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">Template 4</h5>
              </a>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>



      {/* Add more items as needed */}
    </Slider>
  );
};

export default Carousel2;