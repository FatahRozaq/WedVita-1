import { Parallax } from 'react-parallax';
import imgshikanoin from './img/Shikanoin_Upscale.png';
import './parallax_3.css'
import '../../App.css'
import './style.css'

function ImgShikanoin1({ months, days, hours, minutes, seconds }) {

    const isDefaultSize = window.innerWidth >= 1280;

    const divStyle = {
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imgshikanoin})`
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
                <Parallax blur={2} className='image-half' bgImage={imgshikanoin} strength={400}>
                    <div className='content-half'>

                        <div class="flex justify-around text-center text-white">
                            <div>
                                <h1 class='font-GenshinFont text-6xl' id="month">{months}&nbsp;:</h1>
                                <h1 class='font-GenshinFont'>Month</h1>
                            </div>

                            <div>
                                <h1 class='font-GenshinFont text-6xl' id="day">&nbsp;{days}&nbsp;:</h1>
                                <h1 class='font-GenshinFont'>days</h1>
                            </div>

                            <div>
                                <h1 class='font-GenshinFont text-6xl' id="hour">&nbsp;{hours}&nbsp;:</h1>
                                <h1 class='font-GenshinFont'>Hours</h1>
                            </div>

                            <div>
                                <h1 class='font-GenshinFont text-6xl' id="minute">&nbsp;{minutes}&nbsp;:</h1>
                                <h1 class='font-GenshinFont'>Minutes</h1>
                            </div>

                            <div>
                                <h1 class='font-GenshinFont text-6xl' id="second">&nbsp;{seconds}</h1>
                                <h1 class='font-GenshinFont'>Seconds</h1>
                            </div>
                        </div>
                    </div>
                </Parallax>
            ) : (
                <section style={divStyle} class="inv-banner banner-halfheight color-red">
                    <div className='content-half'>

                        <div class="flex justify-around text-center text-white">
                            <div>
                                <h1 class='font-GenshinFont text-3xl' id="month">{months}&nbsp;:</h1>
                                <h1 class='font-GenshinFont text-xs'>Month</h1>
                            </div>

                            <div>
                                <h1 class='font-GenshinFont text-3xl' id="day">&nbsp;{days}&nbsp;:</h1>
                                <h1 class='font-GenshinFont text-xs'>days</h1>
                            </div>

                            <div>
                                <h1 class='font-GenshinFont text-3xl' id="hour">&nbsp;{hours}&nbsp;:</h1>
                                <h1 class='font-GenshinFont text-xs'>Hours</h1>
                            </div>

                            <div>
                                <h1 class='font-GenshinFont text-3xl' id="minute">&nbsp;{minutes}&nbsp;:</h1>
                                <h1 class='font-GenshinFont text-xs'>Minutes</h1>
                            </div>

                            <div>
                                <h1 class='font-GenshinFont text-3xl' id="second">&nbsp;{seconds}</h1>
                                <h1 class='font-GenshinFont text-xs'>Seconds</h1>
                            </div>
                        </div>
                    </div>
                </section>
            )}


        </div>

    );

};


export default ImgShikanoin1