import { useEffect, useState } from 'react';
import { Parallax } from 'react-parallax';
import imgkaveh from './img/Namecard_ Upscaled.png';
import imgkaveh2 from './img/Namecard_Upscaled.png';
import imgrep from './img/Reputation_Upscaled.png';
import './parallax_3.css'
import '../../App.css'
import './style.css'
import { inView, motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const boxVariant = {
    visible: { opacity: 1, scale: 1, transition: { duration: 1.25 } },
    hidden: { opacity: 0, scale: 0, transition: { duration: 1.25 } }
};

function ImgKaveh1({ groomName, brideName, wedDate }) {

    const control = useAnimation();
    const [ref, inView] = useInView();
    useEffect(() => {
        if (inView) {
            control.start("visible");
        }
    }, [control, inView]);

    const isDefaultSize = window.innerWidth >= 1280;

    const divStyle = {
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imgkaveh2})`,
        backgroundPosition: `center`,
    };

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
            {isDefaultSize ? (
                <Parallax blur={2} className='image' bgImage={imgkaveh} strength={400}>
                    <motion.div
                        ref={ref}
                        variants={boxVariant}
                        initial="hidden"
                        animate={control}>

                        <div className='content'>
                            <div className='grid grid-cols-1 gap-4 justify-items-center'>

                                <div>
                                    <p className='text-xl text-white font-GenshinFont mb-4'>Wedding Invitation</p>
                                </div>
                                <div>
                                    <p className='text-7xl text-white font-GreatVibes'>{groomName}</p>
                                </div>
                                <div>
                                    <p className='text-7xl text-white font-GreatVibes'>&</p>
                                </div>
                                <div>
                                    <p className='text-7xl text-white font-GreatVibes mb-4'>{brideName}</p>
                                </div>
                                <div>
                                    <p className='text-xl text-white font-GenshinFont mb-4'>{wedDate}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </Parallax>
            ) : (
                <section style={divStyle} class="inv-banner banner-fullheight color-ltblue">
                    <div class="banner-body text-centered">
                        <div class="container">
                            <p class="subtitle">Wedding Invitation</p>
                            <p class="title">{groomName} <br /> & <br /> {brideName}</p>
                            <p class="subtitle">{wedDate}</p>
                        </div>
                    </div>
                </section>
            )}

        </div>


    );

};

export default ImgKaveh1