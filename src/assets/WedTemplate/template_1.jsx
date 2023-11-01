import '../../App.css'
import './style.css'
import { useEffect, useState } from 'react'
import img1 from './img/madeline-james-wedding-couple-0422-71c410b79316461997eb0c63de0d4aa6.jpg'
import img2 from './img/wed_exp.png'
import img3 from './img/father-walking-his-daughter-down-aisle.jpg'
import img4 from './img/33814_05-eb9a2e4cc91544c5b78cc623c3c56222.jpg'

import img11 from './img/user3-128x128.jpg'
import img12 from './img/user6-128x128.jpg'

//langkah 2
import axios from 'axios'
import axiosClient from '../../axios-client'
import { useParams } from 'react-router-dom'

function template1() {
    const countDownDate = new Date("Jun 09, 2077 00:00:00").getTime();
    const [months, setMonths] = useState(0);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
  
    const {id} = useParams();
    const [weddingInvitations, setWeddingInvitations] = useState({});


    useEffect(() => {

        axiosClient
        .get(`/getWeddingInvitations/${id}`) //kesalahan 2 (harusnya pake API yg baru)
        .then((response) => {
            setWeddingInvitations(response.data); // kesalahan 1
        })
        .catch((error) => {
            console.error('Error fetching data: ',error);
        });

      const intervalId = setInterval(() => {
        const today = new Date().getTime();
        const interval = countDownDate - today;
  
        const calculatedMonths = Math.floor(interval / (1000 * 60 * 60 * 24 * 30));
        const calculatedDays = Math.floor((interval / (1000 * 60 * 60 * 24)) % 30);
        const calculatedHours = Math.floor((interval % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const calculatedMinutes = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60));
        const calculatedSeconds = Math.floor((interval % (1000 * 60)) / 1000);
  
        setMonths(calculatedMonths);
        setDays(calculatedDays);
        setHours(calculatedHours);
        setMinutes(calculatedMinutes);
        setSeconds(calculatedSeconds);
  
        if (interval < 0) {
          clearInterval(intervalId);
          // You can perform some action when the countdown is finished
        }
      }, 1000);
  
      // Cleanup the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, [setWeddingInvitations]);

    return (
        <div>
            <head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MuhammadRasyidF/Invite-CSS@2.1.0/dist/css/style.min.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
                <script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/js/all.min.js"></script>
                <script src="https://cdn.jsdelivr.net/gh/MuhammadRasyidF/Invite-CSS@2.1.0/dist/js/countdown.js"></script>
                <script src="https://cdn.jsdelivr.net/gh/MuhammadRasyidF/Invite-CSS@2.1.0/dist/js/animation.js"></script>
                <script src="https://cdn.jsdelivr.net/gh/MuhammadRasyidF/Invite-CSS@2.1.0/dist/js/video.js"></script>
                <script src="https://cdn.jsdelivr.net/gh/MuhammadRasyidF/Invite-CSS@2.1.0/dist/js/music_envelope.js"></script>
                <script src="https://cdn.jsdelivr.net/gh/MuhammadRasyidF/Invite-CSS@2.1.0/dist/js/slider.js"></script>
            </head>

            <body>
                <section class="inv-banner banner-fullheight color-ltblue ">
                    <div class="banner-body text-centered">
                        <div class="container">
                            <p class="subtitle">Wedding Invitation</p>
                            <p class="title">{weddingInvitations.groomName} & {weddingInvitations.brideName}</p>
                            <p class="subtitle">Friday, June 9th 2077</p>
                        </div>
                    </div>
                </section>

                <section class="p-2">
                    <h1
                        class="body-font font-GreatVibes text-center grid-item mt-10 mb-16 text-2xl font-normal leading-none tracking-normal text-gray-900 md:text-3xl lg:text-6xl">
                        Mempelai</h1>
                </section>

                <div class="flex justify-center items-center">
                    <div class="text-center p-4 mr-24 ml-24"><img class="rounded-full w-40 h-40" src={`http://localhost:8000${weddingInvitations.groomPhoto}`} //nambahin gambar
                        alt="image description" />
                        <p class="font-gv">{weddingInvitations.groomName}</p>
                        <p>Putri dari </p>
                        <p>Bapak Ibu ...</p>
                        <p>&</p>
                        <p>Ibu Bapak ... </p>
                    </div>
                    <div class="text-center p-4 mr-24 ml-24"><img class="rounded-full w-40 h-40 " src={img12}
                        alt="image description" />
                        <p class="font-gv">{weddingInvitations.brideName}</p>
                        <p>Putra dari </p>
                        <p>Bapak Ibu ...</p>
                        <p>&</p>
                        <p>Ibu Bapak ... </p>
                    </div>
                </div>

                <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
                <section class="p-2">
                    <h1
                        class="body-font font-GreatVibes text-center grid-item mt-10 mb-16 text-2xl font-normal leading-none tracking-normal text-gray-900 md:text-3xl lg:text-6xl">
                        Gallery</h1>
                    <div class="grid-container">
                        <div class="inv-grid grid-vertical">
                            <div class="inv-grid">
                                <div class="inv-grid grid-parent">
                                    <figure class="inv-grid grid-node inv-image is-height-rectangle">
                                        <img width="800"
                                            src={img1} />
                                    </figure>
                                </div>
                                <div class="inv-grid grid-vertical grid-column-3">
                                    <div class="inv-grid grid-parent">
                                        <div class="inv-grid grid-node">
                                            <figure class="inv-image is-width-rectangle">
                                                <img width="800" src={img2} />
                                            </figure>
                                        </div>
                                    </div>
                                    <div class="inv-grid grid-parent">
                                        <div class="inv-grid grid-node">
                                            <figure class="inv-image is-md-width-rectangle">
                                                <img width="800" src={img3} />
                                            </figure>
                                        </div>
                                    </div>
                                    <div class="inv-grid grid-parent grid-no-padding">
                                        <div class="inv-grid grid-parent">
                                            <div class="inv-grid grid-node">
                                                <figure class="inv-image">
                                                    <img width="800" src={img4} />
                                                </figure>
                                            </div>
                                        </div>
                                        <div class="inv-grid grid-parent">
                                            <div class="inv-grid grid-node">
                                                <figure class="inv-image">
                                                    <img width="800" src={img4} />
                                                </figure>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </section>

                <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
                <section class="p-2">
                    <h1
                        class="body-font font-GreatVibes text-center grid-item mt-10 mb-16 text-2xl font-normal leading-none tracking-normal text-gray-900 md:text-3xl lg:text-6xl">
                        Countdown</h1>

                    <div class="flex justify-around text-center">
                        <div>
                            <h2 class="font-gv" id="month">{months}</h2>
                            <p>Month</p>
                        </div>

                        <div>
                            <h2 class="font-gv" id="day">{days}</h2>
                            <p>days</p>
                        </div>

                        <div>
                            <h2 class="font-gv" id="hour">{hours}</h2>
                            <p>Hours</p>
                        </div>

                        <div>
                            <h2 class="font-gv" id="minute">{minutes}</h2>
                            <p>Minutes</p>
                        </div>

                        <div>
                            <h2 class="font-gv" id="second">{seconds}</h2>
                            <p>Seconds</p>
                        </div>
                    </div>
                </section>
                <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
                <section class="p-5">
                    <h1
                        class="body-font font-GreatVibes text-center grid-item mt-10 mb-16 text-2xl font-normal leading-none tracking-normal text-gray-900 md:text-3xl lg:text-6xl">
                        Location</h1>

                    <div class="inv-card">
                        <div class="card-title">
                            <div class="card-header-title">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="w-6 h-6 mr-4">
                                    <path fill-rule="evenodd"
                                        d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                        clip-rule="evenodd" />
                                </svg>

                                Gedung Sate
                            </div>
                        </div>
                        <div class="relative w-full h-96">
                            <iframe class="absolute top-0 left-0 w-full h-full"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9007508209097!2d107.61612687554891!3d-6.902471493096789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e64c5e8866e5%3A0x37be7ac9d575f7ed!2sGedung%20Sate!5e0!3m2!1sid!2sid!4v1696392274223!5m2!1sid!2sid"
                                width="600" height="450" allowfullscreen="" loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                        <div class="card-content">
                            Jl. Diponegoro No.22, Citarum, Kec. Bandung Wetan, Kota Bandung, Jawa Barat 40115
                        </div>
                        <div class="card-footer">
                            <div class="card-footer-item">
                                <time datetime="2016-1-1">11:09 PM - Friday, June 9th 2077</time>
                            </div>
                        </div>
                    </div>
                </section>

                <footer class="inv-footer">© CSS Framework Invitation 2023</footer>

            </body>

        </div>
    )
}

export default template1;