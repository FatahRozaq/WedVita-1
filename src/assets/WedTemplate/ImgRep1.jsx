import { Parallax } from 'react-parallax';
import imgrep from './img/Reputation_Upscaled.png';
import './parallax_3.css'
import '../../App.css'
import './style.css'

function ImgRep1({ groomName, brideName, fatherOfGroom, motherOfGroom, fatherOfBride, motherOfBride, groomPhoto, bridePhoto }) {
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
            <Parallax blur={ 2 } className='image' bgImage={imgrep} strength={400}>
                <div className='content'>

                    <div class="grid grid-cols-1 md:grid-cols-2 justify-center justify-items-center items-center text-white">
                        {/* gambar ditengah: justify item center */}
                        <div class="text-center p-4 mr-24 ml-24"><img class="rounded-full w-48 h-48" src={`http://localhost:8000${groomPhoto}`} //nambahin gambar
                            alt="image description" />
                            <p class="font-gv mt-4">{groomName}</p>
                            <p className='font-GenshinFont'>Putra dari </p>
                            <p className='font-GenshinFont'>Bapak {fatherOfGroom}</p>
                            <p className='font-GenshinFont'>&</p>
                            <p className='font-GenshinFont'>Ibu {motherOfGroom} </p>
                        </div>
                        <div class="text-center p-4 mr-24 ml-24"><img class="rounded-full w-48 h-48 " src={`http://localhost:8000${bridePhoto}`}
                            alt="image description" />
                            <p class="font-gv mt-4">{brideName}</p>
                            <p className='font-GenshinFont'>Putri dari </p>
                            <p className='font-GenshinFont'>Bapak {fatherOfBride}</p>
                            <p className='font-GenshinFont'>&</p>
                            <p className='font-GenshinFont'>Ibu {motherOfBride}</p>
                        </div>
                    </div>
                </div>
            </Parallax>
        </div>

    );

};

export default ImgRep1