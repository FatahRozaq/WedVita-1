import { useEffect, useState } from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import debounce from 'lodash.debounce';
import { useRef } from 'react';
import './ParallaxSpringCSS.css'
import './parallax_3.css'
import '../../App.css'
import './style.css'
import img11 from './img/user3-128x128.jpg'
import img12 from './img/user6-128x128.jpg'

import img1 from './img/madeline-james-wedding-couple-0422-71c410b79316461997eb0c63de0d4aa6.jpg'
import img2 from './img/wed_exp.png'
import img3 from './img/father-walking-his-daughter-down-aisle.jpg'
import img4 from './img/33814_05-eb9a2e4cc91544c5b78cc623c3c56222.jpg'


import { createRef } from 'react'
import { useStateContext } from '../../Contexts/ContextProvider'
import { Navigate } from 'react-router-dom';

import 'datatables.net-dt/css/jquery.dataTables.css';
import $ from 'jquery';
import 'datatables.net';

import axiosClient from '../../axios-client'
import { useParams } from 'react-router-dom'

import LeafletMap from '../../coba_LeafletMap'

import gengisDrip from './music/gengis_khan_drip.mp3'

import { inView, motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import ReactModal from 'react-modal';
import { Container, Button, Link, lightColors, darkColors } from 'react-floating-action-button'

function formatDate(inputDate) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(inputDate).toLocaleDateString(undefined, options);
    return formattedDate;
}

function formatCustomDateTime(weddingDate, weddingTime) {
    const date = new Date(weddingDate);
    const time = new Date(`1970-01-01T${weddingTime}`);

    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');

    const formattedDateTime = `${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
}

const boxVariant = {
    visible: { opacity: 1, scale: 1, transition: { duration: 1.25 } },
    hidden: { opacity: 0, scale: 0 }
};

const Box = ({ str }) => {
    const control = useAnimation();
    const [ref, inView] = useInView();
    useEffect(() => {
        if (inView) {
            control.start("visible");
        } else {
            control.start("hidden");
        }
    }, [control, inView]);

    return (
        <motion.div
            ref={ref}
            variants={boxVariant}
            initial="hidden"
            animate={control}
        >
            <h1 className="body-font font-GenshinFont text-center grid-item mt-16 mb-16 text-lg font-normal leading-none tracking-normal text-white md:text-xl lg:text-2xl">{str} </h1>
        </motion.div>
    );
};

const Box2 = ({ str }) => {
    const control = useAnimation();
    const [ref, inView] = useInView();
    useEffect(() => {
        if (inView) {
            control.start("visible");
        } else {
            control.start("hidden");
        }
    }, [control, inView]);

    return (
        <motion.div
            ref={ref}
            variants={boxVariant}
            initial="hidden"
            animate={control}
        >
            <h1 className="body-font font-GenshinFont text-center grid-item mt-4 mb-4 text-lg font-normal leading-none tracking-normal text-white md:text-xl lg:text-2xl">{str} </h1>
        </motion.div>
    );
};

function ParallaxSpringCoba() {
    const ref5 = useRef()


    const nameRef = createRef();
    const messageRef = createRef();
    const tableRef = useRef(null);

    const [messagesView, setMessagesView] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [audioTune] = useState(new Audio(gengisDrip));
    const [isPlaying, setIsPlaying] = useState(false);
    const [buttonIcon, setButtonIcon] = useState('fas fa-play');

    const playSound = () => {
        audioTune.play();
        setIsPlaying(true);
    }

    const pauseSound = () => {
        audioTune.pause();
        setIsPlaying(false);
    }

    const handleClick = () => {
        if (isPlaying) {
            setButtonIcon('fas fa-play');
            pauseSound();
        } else {
            setButtonIcon('fas fa-pause');
            playSound();
        }
    }

    const stopSound = () => {
        audioTune.pause();
        audioTune.currentTime = 0;
    }

    // useEffect(() => {
    //     playSound();
    //     setButtonIcon('fas fa-pause'); // Change the icon to "fa-pause"
    //   }, []);

    const { id } = useParams();
    const [weddingInvitations, setWeddingInvitations] = useState({});
    const { setMessageData } = useStateContext();

    const {token} = useStateContext();
    
    if (!token) {
        return <Navigate to="/nothing" />;
    }

    const date = weddingInvitations.weddingDate;
    const time = weddingInvitations.weddingTime;
    const formattedDate = formatCustomDateTime(date, time);
    // const dates = String(formattedDate);

    const countDownDate = new Date(formattedDate).getTime();
    const [months, setMonths] = useState(0);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInvitation, setSelectedInvitation] = useState(null);
    const openModal = (weddingInvitations) => {
        setSelectedInvitation(weddingInvitations);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const modalStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
            zIndex: 1000, // Adjust this value as needed
        },
        content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%', // Adjust the width as needed
            height: '60%',
            backgroundColor: 'white',
            padding: '20px',
            zIndex: 1001, // Must be higher than overlay's zIndex
        },
    };

    // const url = 'https://www.openstreetmap.org/#map=19/-6.90213/107.61981&layers=N';

    // const coordinates = extractCoordinatesFromURL(url);

    // const { latitude, longitude } = coordinates;

    //kesalahan - harusnya dari seluruh link ke coba_leafletMap, baru ke extract link

    const debouncedIntervalLogic = debounce(() => {
        const today = new Date().getTime();
        const interval = countDownDate - today;

        const days = Math.floor(interval / (1000 * 60 * 60 * 24));
        const calculatedMonths = Math.floor(days / 30);
        setMonths(calculatedMonths);
        setDays(days % 30);

        const hours = Math.floor((interval % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((interval % (1000 * 60)) / 1000);

        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);

        if (interval < 0) {
            clearInterval(intervalId);
        }
    }, 1000);

    useEffect(() => {
        if (weddingInvitations && weddingInvitations.weddingDate && weddingInvitations.weddingTime) {

            const intervalId = setInterval(debouncedIntervalLogic, 1000);
            return () => {
                clearInterval(intervalId);
                debouncedIntervalLogic.cancel();
            };
        }
    }, [weddingInvitations]);

    useEffect(() => {

        axiosClient
            .get(`/getWeddingInvitations/${id}`) //kesalahan 2 (harusnya pake API yg baru)
            .then((response) => {
                setWeddingInvitations(response.data); // kesalahan 1
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });

    }, [setWeddingInvitations]);

    const control = useAnimation();
    const [ref, inView] = useInView();
    useEffect(() => {
        if (inView) {
            control.start("visible");
        }
    }, [control, inView]);

    const isDefaultSize = window.innerWidth >= 1280;


    const onSubmit = (ev) => {
        ev.preventDefault()

        // navigate(`/pesanan/${user.id}`);
        const formData = new FormData();
        formData.append('invitationId', weddingInvitations.id);
        formData.append('guestName', nameRef.current.value);
        formData.append('message', messageRef.current.value);

        axiosClient.post('/message', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(({ data }) => {
                setMessageData(data.weddingMessage)
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })
    }


    useEffect(() => {

        axiosClient
            .get(`/getMessages/${id}`)
            .then((response) => {
                setMessagesView(response.data);
                setIsLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false)
            });

        if (tableRef.current) {
            $(tableRef.current).DataTable();
        }

    }, [setMessagesView]);


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
            <Parallax pages={7} ref={ref5} >
                <ParallaxLayer offset={0} speed={0.25}>
                    <div className='animation_layer parallax' id='latar'>

                        <div className='content'>
                            <div className='grid grid-cols-1 gap-4 justify-items-center'>

                                <div>
                                    <p className='text-xl text-white font-GenshinFont mb-4'>Wedding Invitation</p>
                                </div>
                                <div>
                                    <p className='text-7xl text-white font-GreatVibes'>{weddingInvitations.groomName}</p>
                                </div>
                                <div>
                                    <p className='text-7xl text-white font-GreatVibes'>&</p>
                                </div>
                                <div>
                                    <p className='text-7xl text-white font-GreatVibes mb-4'>{weddingInvitations.brideName}</p>
                                </div>
                                <div>
                                    <p className='text-xl text-white font-GenshinFont mb-4'>{formatDate(weddingInvitations.weddingDate)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={0.3}>
                    <div className='animation_layer parallax' id='bintang'></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={-0.1}>
                    <div className='animation_layer parallax' id='l5'></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={0.3}>
                    <div className='animation_layer parallax' id='l4'></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={0.35}>
                    <div className='animation_layer parallax' id='l3'></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={0.5}>
                    <div className='animation_layer parallax' id='l2'></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={1.75}>
                    <div className='animation_layer parallax' id='l1'></div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={0.40}>
                    <div className='animation_layer parallax' id='bonus1'></div>
                </ParallaxLayer>
                <ParallaxLayer offset={1} speed={1.75}>
                    <div className='content2 animation_layer parallax' style={{ backgroundColor: '#22212E' }}>
                        <Box str="Embark on the romantic journey of..." />
                        <div className="grid grid-cols-1 md:grid-cols-2 justify-center justify-items-center items-center text-white">
                            {/* gambar ditengah: justify item center */}
                            <div className="text-center p-4 mr-24 ml-24"><img className="rounded-full w-48 h-48" src={`http://localhost:8000${weddingInvitations.groomPhoto}`}  //nambahin gambar
                                alt="image description" />
                                <p className="font-gv mt-4">{weddingInvitations.groomName}</p>
                                <p className='font-GenshinFont'>Putra dari </p>
                                <p className='font-GenshinFont'>Bapak {weddingInvitations.fatherOfGroom}</p>
                                <p className='font-GenshinFont'>&</p>
                                <p className='font-GenshinFont'>Ibu {weddingInvitations.motherOfGroom} </p>
                            </div>
                            <div className="text-center p-4 mr-24 ml-24"><img className="rounded-full w-48 h-48 " src={`http://localhost:8000${weddingInvitations.bridePhoto}`}
                                alt="image description" />
                                <p className="font-gv mt-4">{weddingInvitations.brideName}</p>
                                <p className='font-GenshinFont'>Putri dari </p>
                                <p className='font-GenshinFont'>Bapak {weddingInvitations.fatherOfBride}</p>
                                <p className='font-GenshinFont'>&</p>
                                <p className='font-GenshinFont'>Ibu {weddingInvitations.motherOfBride}</p>
                            </div>
                        </div>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer offset={2} speed={1.75}>
                    <div className='content2 animation_layer parallax' style={{ backgroundColor: '#22212E' }}>
                        <Box str="Browse through memories of their love story..." />
                        <div className="grid-container">
                            <div className="inv-grid grid-vertical">
                                <div className="inv-grid">
                                    <div className="inv-grid grid-parent">
                                        <figure className="inv-grid grid-node inv-image is-height-rectangle">
                                            <img width="800"
                                                src={img1} />
                                        </figure>
                                    </div>
                                    <div className="inv-grid grid-vertical grid-column-3">
                                        <div className="inv-grid grid-parent">
                                            <div className="inv-grid grid-node">
                                                <figure className="inv-image is-width-rectangle">
                                                    <img width="800" src={img2} />
                                                </figure>
                                            </div>
                                        </div>
                                        <div className="inv-grid grid-parent">
                                            <div className="inv-grid grid-node">
                                                <figure className="inv-image is-md-width-rectangle">
                                                    <img width="800" src={img3} />
                                                </figure>
                                            </div>
                                        </div>
                                        <div className="inv-grid grid-parent grid-no-padding">
                                            <div className="inv-grid grid-parent">
                                                <div className="inv-grid grid-node">
                                                    <figure className="inv-image">
                                                        <img width="800" src={img4} />
                                                    </figure>
                                                </div>
                                            </div>
                                            <div className="inv-grid grid-parent">
                                                <div className="inv-grid grid-node">
                                                    <figure className="inv-image">
                                                        <img width="800" src={img4} />
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer offset={3} speed={1.75}>
                    <div className='content2 animation_layer parallax p-5' style={{ backgroundColor: '#22212E' }}>
                        <Box str="The big day is approaching, the clock is ticking!" />
                        <div className="flex justify-around text-center text-white">
                            <div>
                                <h1 className='font-GenshinFont text-6xl' id="month">{months}&nbsp;:</h1>
                                <h1 className='font-GenshinFont'>Month</h1>
                            </div>

                            <div>
                                <h1 className='font-GenshinFont text-6xl' id="day">&nbsp;{days}&nbsp;:</h1>
                                <h1 className='font-GenshinFont'>days</h1>
                            </div>

                            <div>
                                <h1 className='font-GenshinFont text-6xl' id="hour">&nbsp;{hours}&nbsp;:</h1>
                                <h1 className='font-GenshinFont'>Hours</h1>
                            </div>

                            <div>
                                <h1 className='font-GenshinFont text-6xl' id="minute">&nbsp;{minutes}&nbsp;:</h1>
                                <h1 className='font-GenshinFont'>Minutes</h1>
                            </div>

                            <div>
                                <h1 className='font-GenshinFont text-6xl' id="second">&nbsp;{seconds}</h1>
                                <h1 className='font-GenshinFont'>Seconds</h1>
                            </div>
                        </div>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer offset={4} speed={1.75}>
                    <div className='content2 animation_layer p-5' style={{ backgroundColor: '#22212E' }}>
                        <Box str="Discover the enchanting venues" />
                        <div className="inv-card" style={{ backgroundColor: '#FFFFFF' }}>
                            <div className="card-title">
                                <div className="card-header-title">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        className="w-6 h-6 mr-4">
                                        <path fill-rule="evenodd"
                                            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                            clip-rule="evenodd" />
                                    </svg>

                                    {weddingInvitations.weddingLocation}
                                </div>
                            </div>
                            <div className="relative w-full h-96">
                                {/* <console className="log">{weddingInvitations.weddingMap}</console> */}
                                <LeafletMap wedUrl={weddingInvitations.weddingMap} groomName={weddingInvitations.groomName} brideName={weddingInvitations.brideName} />
                            </div>
                            <div className="card-content">
                                {weddingInvitations.weddingLocation}
                            </div>
                            <div className="card-footer">
                                <div className="card-footer-item">
                                    <time dateTime="2016-1-1">{weddingInvitations.weddingTime} - {formatDate(weddingInvitations.weddingDate)}</time>
                                </div>
                            </div>
                        </div>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer offset={5} speed={1.75}>
                    <div className='content2 animation_layer parallax' style={{ backgroundColor: '#22212E' }}>
                    <Box2 str="Look out for the special invitation arriving soon!" />
                    <p className='text-lg text-center text-white font-GenshinFont mb-4'>{weddingInvitations.groomName} and {weddingInvitations.brideName} invite you to celebrate with them.</p>

                    <div className="grid grid-cols-1 justify-center justify-items-center items-center">
                        <a href="#_" className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-purple-A6A3CC rounded-full shadow-md group">
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-A6A3CC group-hover:translate-x-0 ease">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">Kirim Amplop Undangan</span>
                            <span className="relative invisible">Kirim Amplop Undangan</span>
                        </a>
                    </div>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer offset={6} speed={1.75}>
                    <div className='content2 animation_layer parallax' style={{ backgroundColor: '#22212E' }}>
                        <div className="grid grid-cols-1 justify-center justify-items-center items-center">

                            <Box2 str="Don't forget to sign our guest book with your warm wishes." />
                            <p className='text-lg text-white text-center font-GenshinFont mb-4'>Your words will be a cherished memory for {weddingInvitations.groomName} and {weddingInvitations.brideName}.</p>
                            <button href="#_" className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-genshin-red transition duration-300 ease-out border-2 border-purple-A6A3CC rounded-full shadow-md group" onClick={() => openModal(weddingInvitations)}>
                                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-A6A3CC group-hover:translate-x-0 ease">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                                <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">Isi Buku Tamu</span>
                                <span className="relative invisible text-white">Isi Buku Tamu</span>
                            </button>
                            <div className="overflow-auto p-4 mx-16 h-48 text-justify mt-4 mb-4">

                                {isLoading ? (
                                    <p>Loading...</p>
                                ) : messagesView.length > 0 ? (

                                    messagesView.map((invitation, index) => (
                                        <article key={index} className="p-6 text-base bg-white rounded-lg dark:bg-gray-900 mb-4">
                                            <footer className="flex justify-between items-center mb-2">
                                                <div className="flex items-center">
                                                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">{invitation.guestName}</p>
                                                </div>
                                            </footer>
                                            <p className="text-gray-500 dark:text-gray-400">{invitation.message}</p>
                                        </article>
                                    ))
                                ) : (
                                    <p>Tidak ada pesan</p>
                                )}
                            </div>
                        </div>
                    </div>
                </ParallaxLayer>

            </Parallax>

            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={modalStyles}
            >
                <form onSubmit={onSubmit}>
                    <div className="mb-6">
                        <label for="guestName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
                        <input ref={nameRef} type="text" name="guestName" id="guestName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ketikkan Nama" required />
                    </div>
                    <div className="mb-6">
                        <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pesan</label>
                        <textarea ref={messageRef} id="message" name="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tinggalkan Pesan..."></textarea>                        </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </ReactModal>
            <Container>
                <Button
                    tooltip={isPlaying ? "Pause Sound" : "Play Sound"}
                    icon={buttonIcon}
                    onClick={handleClick} 
                    styles={{backgroundColor: lightColors.purple}}/>
            </Container>

        </div>

    )
}

export default ParallaxSpringCoba;