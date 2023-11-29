import '../../App.css'
import './style.css'
import { useEffect, useState } from 'react'
import img1 from './img/madeline-james-wedding-couple-0422-71c410b79316461997eb0c63de0d4aa6.jpg'
import img2 from './img/wed_exp.png'
import img3 from './img/father-walking-his-daughter-down-aisle.jpg'
import img4 from './img/33814_05-eb9a2e4cc91544c5b78cc623c3c56222.jpg'

import ImgKaveh1 from "./ImgKaveh1";
import ImgRep1 from './ImgRep1'
import ImgShikanoin1 from './ImgShikanoin1'
import gengisDrip from './music/gengis_khan_drip.mp3'

import { inView, motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import img11 from './img/user3-128x128.jpg'
import img12 from './img/user6-128x128.jpg'
import ReactModal from 'react-modal';
import { Container, Button, Link } from 'react-floating-action-button'


//langkah 2
import axios from 'axios'
import axiosClient from '../../axios-client'
import { useParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import LeafletMap from '../../coba_LeafletMap'

import extractCoordinatesFromURL from './extract-link'

import { ParallaxBanner } from 'react-scroll-parallax';
import ParallaxComponent from './parallax_component_2';
import foreground from './img/foreground.png'
import background2 from './img/background2.png'


import { createRef } from 'react'
import { useStateContext } from '../../Contexts/ContextProvider'
import { useRef } from 'react';

import 'datatables.net-dt/css/jquery.dataTables.css';
import $ from 'jquery';
import 'datatables.net';

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
            <h1 className="body-font font-GenshinFont text-center grid-item mt-16 mb-16 text-lg font-normal leading-none tracking-normal text-gray-900 md:text-xl lg:text-2xl">{str} </h1>
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
            <h1 className="body-font font-GenshinFont text-center grid-item mt-4 mb-4 text-lg font-normal leading-none tracking-normal text-gray-900 md:text-xl lg:text-2xl">{str} </h1>
        </motion.div>
    );
};

function WeddingTemplateLeaflet2() {

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

    const { id } = useParams();
    const [weddingInvitations, setWeddingInvitations] = useState({});
    
    const {token} = useStateContext();
    
    if (!token) {
        return <Navigate to="/nothing" />;
    }

    const { setMessageData } = useStateContext();

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

    useEffect(() => {
        if (weddingInvitations && weddingInvitations.weddingDate && weddingInvitations.weddingTime) {
            const intervalId = setInterval(() => {
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

            return () => clearInterval(intervalId);
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

            <body>

                <ImgKaveh1 groomName={weddingInvitations.groomName} brideName={weddingInvitations.brideName} wedDate={formatDate(weddingInvitations.weddingDate)} />


                {/* <p className="subtitle">Wedding Invitation</p>
                <p className="title">{weddingInvitations.groomName} & {weddingInvitations.brideName}</p>
                <p className="subtitle">{formatDate(weddingInvitations.weddingDate)}</p>
                <ParallaxComponent/> */}


                <section className="p-2">
                    <Box str="Embark on the romantic journey of..." />
                    {/* <motion.div
                        ref={ref}
                        variants={boxVariant}
                        initial="hidden"
                        animate={control}>
                        <h1
                            className="body-font font-GenshinFont text-center grid-item mt-16 mb-16 text-lg font-normal leading-none tracking-normal text-gray-900 md:text-xl lg:text-2xl">
                            Embark on the romantic journey of...</h1>
                    </motion.div> */}

                </section>

                <ImgRep1 groomName={weddingInvitations.groomName} brideName={weddingInvitations.brideName} fatherOfGroom={weddingInvitations.fatherOfGroom} motherOfGroom={weddingInvitations.motherOfGroom} fatherOfBride={weddingInvitations.fatherOfBride} motherOfBride={weddingInvitations.motherOfBride} groomPhoto={weddingInvitations.groomPhoto} bridePhoto={weddingInvitations.bridePhoto} />

                <section className="p-2">
                    <Box str="Browse through memories of their love story..." />
                    {/* <motion.div
                        ref={ref}
                        variants={boxVariant}
                        initial="hidden"
                        animate={control}>
                        <h1
                            className="body-font font-GenshinFont text-center grid-item mt-16 mb-16 text-lg font-normal leading-none tracking-normal text-gray-900 md:text-xl lg:text-2xl">
                            Browse through memories of their love story...</h1>
                    </motion.div> */}

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

                </section>

                <section className="p-2">
                    <Box str="The big day is approaching, the clock is ticking!" />
                    {/* <h1
                        className="body-font font-GenshinFont text-center grid-item mt-16 mb-16 text-lg font-normal leading-none tracking-normal text-gray-900 md:text-xl lg:text-2xl">
                        The big day is approaching, the clock is ticking!</h1> */}
                </section>

                <ImgShikanoin1 months={months} days={days} hours={hours} minutes={minutes} seconds={seconds} />

                <section className="p-5">
                    <Box str="Discover the enchanting venues" />
                    {/* <h1
                        className="body-font font-GenshinFont text-center grid-item mt-16 mb-16 text-lg font-normal leading-none tracking-normal text-gray-900 md:text-xl lg:text-2xl">
                        Discover the enchanting venues</h1> */}

                    <div className="inv-card">
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
                </section>

                <section className="pt-2 mb-12">
                    <Box2 str="Look out for the special invitation arriving soon!" />
                    <p className='text-lg text-center font-GenshinFont mb-4'>{weddingInvitations.groomName} and {weddingInvitations.brideName} invite you to celebrate with them.</p>


                    {/* <h1
                        className="body-font font-GenshinFont text-center grid-item mt-16 mb-16 text-lg font-normal leading-none tracking-normal text-gray-900 md:text-xl lg:text-2xl">
                        Look out for the special invitation arriving soon!<br />
                        {weddingInvitations.groomName} and {weddingInvitations.brideName} invite you to celebrate with them.</h1> */}

                    <div className="grid grid-cols-1 justify-center justify-items-center items-center">
                        {/* gambar ditengah: justify item center */}

                        <a href="#_" className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-genshin-red transition duration-300 ease-out border-2 border-genshin-red rounded-full shadow-md group">
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-genshin-red group-hover:translate-x-0 ease">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span className="absolute flex items-center justify-center w-full h-full text-genshin-red transition-all duration-300 transform group-hover:translate-x-full ease">Kirim Amplop Undangan</span>
                            <span className="relative invisible">Kirim Amplop Undangan</span>
                        </a>
                    </div>
                </section>
                <section className="pt-2 mb-12">
                    <Box2 str="Don't forget to sign our guest book with your warm wishes." />
                    <p className='text-lg text-center font-GenshinFont mb-4'>Your words will be a cherished memory for {weddingInvitations.groomName} and {weddingInvitations.brideName}.</p>
                    {/* <h1
                        className="body-font font-GenshinFont text-center grid-item mt-16 mb-16 text-lg font-normal leading-none tracking-normal text-gray-900 md:text-xl lg:text-2xl">
                        Don't forget to sign our guest book with your warm wishes. <br />
                        Your words will be a cherished memory for {weddingInvitations.groomName} and {weddingInvitations.brideName}.</h1> */}

                    <div className="grid grid-cols-1 justify-center justify-items-center items-center">
                        {/* gambar ditengah: justify item center */}


                        <button href="#_" className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-genshin-red transition duration-300 ease-out border-2 border-genshin-red rounded-full shadow-md group" onClick={() => openModal(weddingInvitations)}>
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-genshin-red group-hover:translate-x-0 ease">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span className="absolute flex items-center justify-center w-full h-full text-genshin-red transition-all duration-300 transform group-hover:translate-x-full ease">Isi Buku Tamu</span>
                            <span className="relative invisible">Isi Buku Tamu</span>
                        </button>
                        <div className="overflow-auto p-4 mx-16 h-48 text-justify mt-4 mb-4">
                            {/* {messagesView.map((invitation, index) => (
                                <article key={index} className="p-6 text-base bg-white rounded-lg dark:bg-gray-900 mb-4">
                                    <footer className="flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                                                className="mr-2 w-6 h-6 rounded-full"
                                                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                                alt="Michael Gough" />{invitation.guestName}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate dateTime="2022-02-08"
                                                title="February 8th, 2022">Feb. 8, 2022</time></p>
                                        </div>
                                    </footer>
                                    <p className="text-gray-500 dark:text-gray-400">{invitation.message}</p>
                                </article>
                            ))} */}
                            {isLoading ? (
                                <p>Loading...</p>
                            ) : messagesView.length > 0 ? (
                                // <table ref={tableRef} className="display">
                                //     <thead>
                                //         <tr>
                                //             <th>id</th>
                                //             <th>Nama</th>
                                //             <th>Pesan</th>
                                //             {/* Add more table headers if needed */}
                                //         </tr>
                                //     </thead>
                                //     <tbody>
                                //         {messagesView.map((invitation, index) => (
                                //             <tr key={index}>
                                //                 <td>{invitation.id}</td>
                                //                 <td>{invitation.guestName}</td>
                                //                 <td>{invitation.message}</td>
                                //             </tr>
                                //         ))}
                                //     </tbody>
                                // </table>
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
                </section>


                <footer className="inv-footer">© WedVita-1 Dev Team, 2023. Made with <i className="fa fa-heart" aria-hidden="true"></i></footer>
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
                        onClick={handleClick} />
                </Container>
            </body>

        </div>
    )
}

export default WeddingTemplateLeaflet2;