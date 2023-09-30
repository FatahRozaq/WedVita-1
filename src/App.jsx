import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import wedvitaBlk from './assets/wedvita_blk1.svg'
import imag1 from './assets/Imag1.svg'
import imag2 from './assets/Imag2.svg'
import sosmed from './assets/sosmeds.svg'
import Carousel from './Carousel';
import Carousel2 from './Carousel2';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div class="body-font font-manrope">
      <header class="px-12 py-8">
        <div class="container mx-auto flex justify-between items-center">
          <img src={wedvitaBlk} alt="Description of the image" />
          <nav>
            <ul class="flex space-x-10">
              <li><a href="#" class="hover:underline">Home</a></li>
              <li><a href="#" class="hover:underline">Design</a></li>
              <li><a href="#" class="hover:underline">About</a></li>
            </ul>
          </nav>
          <nav>
            <ul class="flex space-x-5">
              <button type="button" class="text-wedvita-purple-unhover hover:text-white border border-wedvita-purple-unhover hover:bg-wedvita-purple-hovered focus:ring-4 focus:outline-none focus:ring-purple-hovered font-medium rounded-full text-sm px-5 py-2.5">Login</button>
              <button type="button" class="text-white bg-wedvita-purple-unhover hover:bg-wedvita-purple-hovered focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5">Register</button>
            </ul>
          </nav>
        </div>
      </header>

      <body class="my-20 px-12 py-8">

        <div class="grid grid-cols-2 gap-4 flex justify-between items-center">
          <div class="row-span-2">
            <h1 class="body-font font-GreatVibes grid-item mb-8 text-4xl font-normal leading-loose tracking-normal text-gray-900 md:text-5xl lg:text-7xl">Crafting Love Stories, <span class="underline underline-offset-3 decoration-8 decoration-wedvita-purple to-wedvita-purple-light from-wedvita-purple">One Invitation</span> at a Time </h1>
            <p class="font-normal grid-item mb-8 leading-8 tracking-tight text-wedvita-text-light md:text-1setxl ">Create, Share, and Celebrate Your Wedding with Beautiful Online Invitations</p>
            <button type="button" class="text-white bg-wedvita-purple-unhover hover:bg-wedvita-purple-hovered focus:outline-none focus:ring-4 focus:ring-gray-300 font-extrabold rounded-full text-sm px-5 py-2.5">Learn More &gt;&gt;&gt;</button>
          </div>
          <div class="row-span-1"><img src={imag1} alt="Description of the image" /></div>
        </div>

        <div class="grid grid-cols-2 gap-4 flex justify-between items-center">
          <div class="relative row-span-1 right-12"><img src={imag2} alt="Description of the image" /></div>
          <div class="row-span-2">
            <h1 class="body-font font-GreatVibes grid-item mb-8 text-4xl font-normal leading-none tracking-normal text-gray-900 md:text-5xl lg:text-7xl">Discover Our Feature Set</h1>
            <p class="font-normal grid-item mb-8 leading-8 tracking-tight text-wedvita-text-light md:text-1setxl ">Wedvita simplifies your wedding invitation experience. Customize invitations, manage your guest list with digital RSVPs, choose from beautiful templates, stay connected with guests, and plan on-the-go with mobile accessibility. We prioritize your privacy and security for a stress-free wedding invitation journey.</p>
            <button type="button" class="text-white bg-wedvita-purple-unhover hover:bg-wedvita-purple-hovered focus:outline-none focus:ring-4 focus:ring-gray-300 font-extrabold rounded-full text-sm px-5 py-2.5">Learn More &gt;&gt;&gt;</button>
          </div>
        </div>

      <h1 class="body-font font-GreatVibes text-center grid-item mt-16 mb-16 text-2xl font-normal leading-none tracking-normal text-gray-900 md:text-3xl lg:text-6xl">Explore Our Templates </h1>
      <div class='mb-28'>
        <Carousel2 />
      </div>
            

        <h1 class="body-font font-GreatVibes text-center grid-item mt-16 mb-16 text-2xl font-normal leading-none tracking-normal text-gray-900 md:text-3xl lg:text-6xl">Elevate Your Wedding Experience with Wedvita Plus! </h1>

        <div class="grid grid-cols-3 gap-4 flex items-stretch justify-between content-center">
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

        <h1 class="body-font font-GreatVibes text-center grid-item mt-16 mb-16 text-2xl font-normal leading-none tracking-normal text-gray-900 md:text-3xl lg:text-6xl">Testimonials </h1>
        <Carousel />
  

      </body>

      <footer class="bg-wedvita-beige py-4">
        <div class="container text-center">
          <h1 class="grid-item mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900">Contact Us</h1>
          <p class="px-60 font-normal grid-item mb-8 leading-8 tracking-tight text-wedvita-text-light md:text-1setxl ">At Wedvita, we're here to make your wedding journey as smooth and delightful as possible. Whether you have questions, need assistance, or simply want to share your thoughts, our dedicated team is ready to help.</p>
          <p class="grid-item mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 flex justify-center items-center">Follow Us<span class="inline-block"><img src={sosmed} alt="Image" class="ml-8" /></span></p>
          <hr class="h-px my-8 bg-gray-200 border-0"></hr>
          <div class="flex justify-center items-center mb-8">
            <p class="flex justify-center items-center">Design<span><img src={wedvitaBlk} alt="Centered Image" class="mr-8 ml-8" /></span>About</p>
          </div>
          {/* <img src={wedvitaBlk} class="grid-item" /> */}
        </div>
      </footer>
    </div>

    // <>
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
  )
}

export default App
