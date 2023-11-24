import { useState } from 'react'
import React, { useEffect, useRef } from "react";
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import wedvitaBlk from './assets/wedvita_blk1.svg'
import imag1 from './assets/Imag1.svg'
import imag2 from './assets/Imag2.svg'
import sosmed from './assets/sosmeds.svg'
import Carousel from './Carousel';
import Carousel2 from './Carousel2';
import DarkModeSwitch from './DarkModeSwitch';

import './App.css'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const RevealOnScroll = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onWindScroll = () => {
      const element = ref.current;
      if (element) {
        const { top } = element.getBoundingClientRect();
        const isVisible = top < window.innerHeight;
        setIsVisible(isVisible);
      }
    };

    window.addEventListener("scroll", onWindScroll);
    return () => {
      window.removeEventListener("scroll", onWindScroll);
    };
  }, []);

  const classes = `transition-opacity duration-1000
      ${isVisible ? "opacity-100" : "opacity-0"
    }`;

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
};

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

function App() {
  const { height, width } = useWindowDimensions();
  const isDefaultSize = window.outerWidth >= 877;
  const [count, setCount] = useState(0)

  return (
    <div class="body-font font-manrope">
      {isDefaultSize ? (
        <header class="px-12 py-8">
          <div class="container mx-auto flex justify-between items-center">
            <img src={wedvitaBlk} alt="Description of the image" />
            <nav>
              <ul class="flex space-x-10">
                <li><a href="#" class="hover:underline">Home</a></li>
                <li><a href="#design" class="hover:underline">Design</a></li>
                <li><a href="#about" class="hover:underline">About</a></li>

              </ul>
            </nav>
            <nav>
              <ul class="flex space-x-5">
                {/* <DarkModeSwitch /> */}
                <Link to="/login"><button type="button" class="text-wedvita-purple-unhover hover:text-white border border-wedvita-purple-unhover hover:bg-wedvita-purple-hovered focus:ring-4 focus:outline-none focus:ring-purple-hovered font-medium rounded-full text-sm px-5 py-2.5">Login</button></Link>
                <Link to="/register"><button type="button" class="text-white bg-wedvita-purple-unhover hover:bg-wedvita-purple-hovered focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5">Register</button></Link>
              </ul>
            </nav>
          </div>
        </header>
      ) : (
        <header class="px-12 py-8">
          <div class="container mx-auto flex justify-between items-center">
            <img src={wedvitaBlk} alt="Description of the image" />
            <nav>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex mb-4 items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 md:mr-0 focus:ring-4 focus:ring-gray-100">
                    <span class="sr-only">Open user menu</span>
                    <button class="relative group">
                      <div class="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
                        <div class="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden group-focus:-translate-y-1.5 group-focus:-rotate-90">
                          <div class="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:rotate-[42deg] group-focus:w-2/3 delay-150"></div>
                          <div class="bg-white h-[2px] w-7 rounded transform transition-all duration-300 group-focus:translate-x-10"></div>
                          <div class="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:-rotate-[42deg] group-focus:w-2/3 delay-150"></div>
                        </div>
                      </div>
                    </button>
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Home
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#design"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Design
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#about"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            About
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/login"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Login
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/register"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Register
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </nav>
          </div>
        </header>

      )}
      <body class="my-20 px-12 py-8">
        <div id="about" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 justify-between items-center">
          <RevealOnScroll>
            <div class="md:col-span-1">
              <h1 class="body-font font-GreatVibes grid-item mb-8 text-4xl font-normal leading-loose tracking-normal text-gray-900 md:text-5xl lg:text-7xl">Crafting Love Stories, <span class="underline underline-offset-3 decoration-8 decoration-wedvita-purple to-wedvita-purple-light from-wedvita-purple">One Invitation</span> at a Time </h1>
              <p class="font-normal grid-item mb-8 leading-8 tracking-tight text-wedvita-text-light md:text-1setxl ">Create, Share, and Celebrate Your Wedding with Beautiful Online Invitations</p>
              {/* <button type="button" class="text-white bg-wedvita-purple-unhover hover:bg-wedvita-purple-hovered focus:outline-none focus:ring-4 focus:ring-gray-300 font-extrabold rounded-full text-sm px-5 py-2.5">Learn More &gt;&gt;&gt;</button> */}
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div class="md:col-span-1 hidden md:block">
              <div class="row-span-1"><img src={imag1} alt="Description of the image" /></div>
            </div>
          </RevealOnScroll>
        </div>

        {/* <div class="grid grid-cols-2 gap-4 flex justify-between items-center">
          <div class="row-span-2">
            <h1 class="body-font font-GreatVibes grid-item mb-8 text-4xl font-normal leading-loose tracking-normal text-gray-900 md:text-5xl lg:text-7xl">Crafting Love Stories, <span class="underline underline-offset-3 decoration-8 decoration-wedvita-purple to-wedvita-purple-light from-wedvita-purple">One Invitation</span> at a Time </h1>
            <p class="font-normal grid-item mb-8 leading-8 tracking-tight text-wedvita-text-light md:text-1setxl ">Create, Share, and Celebrate Your Wedding with Beautiful Online Invitations</p>
            <button type="button" class="text-white bg-wedvita-purple-unhover hover:bg-wedvita-purple-hovered focus:outline-none focus:ring-4 focus:ring-gray-300 font-extrabold rounded-full text-sm px-5 py-2.5">Learn More &gt;&gt;&gt;</button>
          </div>
          <div class="row-span-1"><img src={imag1} alt="Description of the image" /></div>
        </div> */}


        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 justify-between items-center">
          <RevealOnScroll>
            <div class="md:col-span-1 relative right-12 hidden md:block">
              <img src={imag2} alt="Description of the image" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div class="md:col-span-1">
              <h1 class="body-font font-GreatVibes grid-item mb-8 text-4xl font-normal leading-none tracking-normal text-gray-900 md:text-5xl lg:text-7xl">Discover Our Feature Set</h1>
              <p class="font-normal grid-item mb-8 leading-8 tracking-tight text-wedvita-text-light md:text-1setxl ">Wedvita simplifies your wedding invitation experience. Customize invitations, manage your guest list with digital RSVPs, choose from beautiful templates, stay connected with guests, and plan on-the-go with mobile accessibility. We prioritize your privacy and security for a stress-free wedding invitation journey.</p>
              {/* <button type="button" class="text-white bg-wedvita-purple-unhover hover:bg-wedvita-purple-hovered focus:outline-none focus:ring-4 focus:ring-gray-300 font-extrabold rounded-full text-sm px-5 py-2.5">Learn More &gt;&gt;&gt;</button> */}
            </div>
          </RevealOnScroll>
        </div>


        {/* <div class="grid grid-cols-2 gap-4 flex justify-between items-center">
          <div class="relative row-span-1 right-12"><img src={imag2} alt="Description of the image" /></div>
          <div class="row-span-2">
            <h1 class="body-font font-GreatVibes grid-item mb-8 text-4xl font-normal leading-none tracking-normal text-gray-900 md:text-5xl lg:text-7xl">Discover Our Feature Set</h1>
            <p class="font-normal grid-item mb-8 leading-8 tracking-tight text-wedvita-text-light md:text-1setxl ">Wedvita simplifies your wedding invitation experience. Customize invitations, manage your guest list with digital RSVPs, choose from beautiful templates, stay connected with guests, and plan on-the-go with mobile accessibility. We prioritize your privacy and security for a stress-free wedding invitation journey.</p>
            <button type="button" class="text-white bg-wedvita-purple-unhover hover:bg-wedvita-purple-hovered focus:outline-none focus:ring-4 focus:ring-gray-300 font-extrabold rounded-full text-sm px-5 py-2.5">Learn More &gt;&gt;&gt;</button>
          </div>
        </div> */}

        <div id="design">
          <RevealOnScroll>
            <h1 class="body-font font-GreatVibes text-center grid-item mt-16 mb-16 text-2xl font-normal leading-none tracking-normal text-gray-900 md:text-3xl lg:text-6xl">Explore Our Templates </h1>
          </RevealOnScroll>
          <RevealOnScroll>
            <div class='mb-28'>
              <Carousel2 />
            </div>
          </RevealOnScroll>
        </div>



        <RevealOnScroll>
          <h1 class="body-font font-GreatVibes text-center grid-item mt-16 mb-16 text-2xl font-normal leading-none tracking-normal text-gray-900 md:text-3xl lg:text-6xl">Elevate Your Wedding Experience with Wedvita Plus! </h1>
        </RevealOnScroll>
        <RevealOnScroll>
          {/* <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 flex items-stretch justify-between justify-items-center content-center"> */}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 justify-items-center">
            <div class="max-w-sm p-6 bg-white rounded-lg drop-shadow-2xlcustom hover:drop-shadow-3xlcustom-hovered transition ease-in-out delay-150 flex flex-col justify-between h-full">
              <div>
                <a href="#">
                  <h5 class="body-font font-GreatVibes mb-2 text-2xl font-normal tracking-tight text-gray-900 text-4xl">Free</h5>
                  <h5 class="mb-2 text-xl font-semibold tracking-tight text-gray-900 text-xl">IDR 0</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 text-justify">Sign up for our free subscription and gain access to a selection of beautiful wedding invitation templates to get started on creating your perfect wedding invitation.</p>
              </div>
              <div>
                <button type="button" class="text-white bg-wedvita-purple-unhover hover:bg-wedvita-purple-hovered focus:outline-none focus:ring-4 focus:ring-gray-300 font-extrabold rounded-full text-sm px-5 py-2.5">Join</button>
              </div>
            </div>

            <div class="max-w-sm p-6 bg-white rounded-lg drop-shadow-2xlcustom hover:drop-shadow-3xlcustom-hovered transition ease-in-out delay-150 flex flex-col justify-between h-full">
              <div>
                <a href="#">
                  <h5 class="body-font font-GreatVibes mb-2 text-2xl font-normal tracking-tight text-gray-900 text-4xl">Gold</h5>
                  <h5 class="mb-2 text-xl font-semibold tracking-tight text-gray-900 text-xl">IDR 40k</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 text-justify">Upgrade to our Gold Subscription for just $9.99 per month and unlock exclusive benefits, including a vast library of premium wedding invitation templates, personalized design assistance, and priority customer support.</p>
              </div>
              <div>
                <button type="button" class="text-white bg-wedvita-purple-unhover hover:bg-wedvita-purple-hovered focus:outline-none focus:ring-4 focus:ring-gray-300 font-extrabold rounded-full text-sm px-5 py-2.5">Join</button>
              </div>
            </div>

            <div class="max-w-sm p-6 bg-white rounded-lg drop-shadow-2xlcustom hover:drop-shadow-3xlcustom-hovered transition ease-in-out delay-150 flex flex-col justify-between h-full">
              <div>
                <a href="#">
                  <h5 class="body-font font-GreatVibes mb-2 text-2xl font-normal tracking-tight text-gray-900 text-4xl">Platinum</h5>
                  <h5 class="mb-2 text-xl font-semibold tracking-tight text-gray-900 text-xl">IDR 240k</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 text-justify">Experience the ultimate wedding invitation design journey with our Platinum Subscription. For $19.99 per month, you'll enjoy unlimited access to our entire collection of exquisite templates, one-on-one consultations with professional designers, and early access to new designs and features.</p>
              </div>
              <div>
                <button type="button" class="text-white bg-wedvita-purple-unhover hover:bg-wedvita-purple-hovered focus:outline-none focus:ring-4 focus:ring-gray-300 font-extrabold rounded-full text-sm px-5 py-2.5">Join</button>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <h1 class="body-font font-GreatVibes text-center grid-item mt-16 mb-16 text-2xl font-normal leading-none tracking-normal text-gray-900 md:text-3xl lg:text-6xl">Testimonials </h1>
        </RevealOnScroll>
        <RevealOnScroll>
          <Carousel />
        </RevealOnScroll>

      </body>

      <footer class="bg-wedvita-beige py-4">

        <div class="grid grid-cols-1 justify-items-center">
          <p class="grid-item mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900">Contact Us</p>
          <p class="mx-4 px-18 md:px-20 lg:px-24 xl:px-32 font-normal grid-item mb-8 leading-8 tracking-tight text-wedvita-text-light md:text-1setxl  text-center ">At Wedvita, we're here to make your wedding journey as smooth and delightful as possible. Whether you have questions, need assistance, or simply want to share your thoughts, our dedicated team is ready to help.</p>
          <p class="grid-item mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 flex justify-center items-center">Follow Us<span class="inline-block"><img src={sosmed} alt="Image" class="ml-8 w-44" /></span></p>
          <hr class="w-48 h-1 mx-auto my-4 bg-slate-950 border-0 rounded md:my-10" />
          <div class="flex justify-center items-center mb-8">
            <p class="flex justify-center items-center">Design<span><img src={wedvitaBlk} alt="Centered Image" class="mr-8 ml-8" /></span>About</p>
          </div>
        </div>

        {/* <div class="container mx-auto text-center">
          <h1 class="grid-item mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900">Contact Us</h1>
          <p class="px-52 md:px-52 lg:px-44 xl:px-32 font-normal grid-item mb-8 leading-8 tracking-tight text-wedvita-text-light md:text-1setxl ">At Wedvita, we're here to make your wedding journey as smooth and delightful as possible. Whether you have questions, need assistance, or simply want to share your thoughts, our dedicated team is ready to help.</p>
          <p class="grid-item mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 flex justify-center items-center">Follow Us<span class="inline-block"><img src={sosmed} alt="Image" class="ml-8" /></span></p>
          <hr class="h-px my-8 bg-gray-200 border-0"></hr>
          <div class="flex justify-center items-center mb-8">
            <p class="flex justify-center items-center">Design<span><img src={wedvitaBlk} alt="Centered Image" class="mr-8 ml-8" /></span>About</p>
          </div>
        </div> */}
      </footer>
    </div>

  )
}

export default App
