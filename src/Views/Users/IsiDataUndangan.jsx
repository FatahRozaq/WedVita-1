import '../../App.css'

import Layout from '../../Components/CMSLayout.jsx'
import { useEffect, useState } from 'react'
import axiosClient from '../../axios-client'
import { useParams, Link, Navigate } from 'react-router-dom'
import { createRef } from 'react'
import { useStateContext } from '../../Contexts/ContextProvider'
import { useNavigate } from 'react-router-dom'

function IsiDataUndangan() {
    const groomNameRef = createRef();
    const brideNameRef = createRef();
    const groomPhotoRef = createRef();
    const bridePhotoRef = createRef();
    const coverPhotoRef = createRef();
    const weddingDateRef = createRef();
    const weddingTimeRef = createRef();
    const weddingMapRef = createRef();
    const weddingLocationRef = createRef();
    const fatherOfGroomRef = createRef();
    const motherOfGroomRef = createRef();
    const fatherOfBrideRef = createRef();
    const motherOfBrideRef = createRef();
    const accountNumberRef = createRef();

    const {user, token, setUser, setToken, setWeddingData} = useStateContext();

    const [errors, setErrors] = useState(null);
    const [selectedImageGroom, setSelectedImageGroom] = useState(null);
    const [selectedImageBride, setSelectedImageBride] = useState(null);
    const [selectedImageCover, setSelectedImageCover] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const navigate = useNavigate();

    const onLogout = ev => {
        ev.preventDefault()
    
        axiosClient.post('/logout')
          .then(() => {
            setUser({})
            setToken(null)
          })
    }

    if (!token) {
        return <Navigate to="/login" />;
    }

    useEffect(() => {
        
        axiosClient.get('/user').then(({ data }) => {
          setUser(data);
        });
    
      }, [token, setUser, setToken]);

    const handleImageChangeGroom = (e) => {
        if (e.target.files.length > 0) {
            setSelectedImageGroom(e.target.files[0]);
        }
    };

    const handleImageChangeBride = (e) => {
        if (e.target.files.length > 0) {
          setSelectedImageBride(e.target.files[0]);
        }
    };

    const handleImageChangeCover = (e) => {
        if (e.target.files.length > 0) {
          setSelectedImageCover(e.target.files[0]);
        }
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time.target.value);
    };

    const onSubmit = (ev) => {
        ev.preventDefault()
      
        const formData = new FormData();
        formData.append('userId', user.id);
        formData.append('designId', 45);
        formData.append('groomName', groomNameRef.current.value);
        formData.append('brideName', brideNameRef.current.value);
        formData.append('groomPhoto', selectedImageGroom);
        formData.append('bridePhoto', selectedImageBride);
        formData.append('coverPhoto', selectedImageCover);
        formData.append('weddingDate', selectedDate);
        formData.append('weddingTime', selectedTime);
        formData.append('weddingMap', weddingMapRef.current.value);
        formData.append('weddingLocation', weddingLocationRef.current.value);
        formData.append('fatherOfGroom', fatherOfGroomRef.current.value);
        formData.append('motherOfGroom', motherOfGroomRef.current.value);
        formData.append('fatherOfBride', fatherOfBrideRef.current.value);
        formData.append('motherOfBride', motherOfBrideRef.current.value);
        formData.append('accountNumber', accountNumberRef.current.value);

        axiosClient.post('/invitations', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(({data}) => {
          setWeddingData(data.weddingInvitations)
          navigate('/cms-desain-ku');
        })
        .catch(err => {
          const response = err.response;
          if( response && response.status === 422){
            // response.data.errors
            // console.log(response.data.errors);
            setErrors(response.data.errors)
          }
        })


    }

    return (
        <Layout onLogout={onLogout} user={user}>
            <div class="text-xl font-extrabold mb-4">Form Data Kartu Undangan</div>
            <div className='DataKartuUndangan'>

                {errors && 
                  <div>
                    {Object.keys(errors).map(key => (
                      <p key={key}>{errors[key][0]}</p>
                    ))}
                  </div>
                }


                <form onSubmit={onSubmit}>
                <div class="bg-white p-4 mb-4 rounded shadow">
                    <div class="mb-4">

                            <div className="mb-6 flex justify-between">
                                <div className="w-1/3">
                                    <label for="groomName" class="block mb-2 text-sm font-semibold text-gray-900">Nama Pengantin Pria</label>
                                    <input ref={groomNameRef} name="groomName" type="name" id="groomName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukan Nama Pengantin Pria" required></input>
                                </div>
                                
                                <div className="w-1/3">
                                    <label for="brideName" class="block mb-2 text-sm font-semibold text-gray-900">Nama Pengantin Wanita</label>
                                    <input ref={brideNameRef} name="brideName" type="name" id="brideName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukan Nama Pengantin Wanita" required></input>
                                </div>
                                
                            </div>

                            <div className="mb-6 flex justify-between">
                                <div className="w-1/3">
                                    <label for="fatherOfGroom" class="block mb-2 text-sm font-semibold text-gray-900">Nama Ayah</label>
                                    <input ref={fatherOfGroomRef} name="fatherOfGroom" type="name" id="fatherOfGroom" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukan Nama Ayah Pengantin Pria" required></input>
                                </div>
                                
                                <div className="w-1/3">
                                    <label for="fatherOfBride" class="block mb-2 text-sm font-semibold text-gray-900">Nama Ayah</label>
                                    <input ref={fatherOfBrideRef} name="fatherOfBride" type="name" id="fatherOfBride" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukan Nama Ayah Pengantin Wanita" required></input>
                                </div>
                            </div>

                            <div className="mb-6 flex justify-between">
                                <div className="w-1/3">
                                    <label for="motherOfGroom" class="block mb-2 text-sm font-semibold text-gray-900">Nama Ibu</label>
                                    <input ref={motherOfGroomRef} name="motherOfGroom" type="name" id="motherOfGroom" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukan Nama Ibu Pengantin Pria" required></input>
                                </div>
                                
                                <div className="w-1/3">
                                    <label for="motherOfBride" class="block mb-2 text-sm font-semibold text-gray-900">Nama Ibu</label>
                                    <input ref={motherOfBrideRef} name="motherOfBride" type="name" id="motherOfBride" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukan Nama Ibu Pengantin Wanita" required></input>
                                </div>
                            </div>

                            <div className="mb-6 flex justify-between">
                                <div className="w-1/3">
                                    <label for="groomPhoto" class="block mb-2 text-sm font-semibold text-gray-900">Foto Pengantin Pria</label>
                                    <input ref={groomPhotoRef} name="groomPhoto" type="file" id="groomPhoto" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" accept="image/*" onChange={handleImageChangeGroom} required></input>
                                </div>
                                
                                <div className="w-1/3">
                                    <label for="bridePhoto" class="block mb-2 text-sm font-semibold text-gray-900">Foto Pengantin Wanita</label>
                                    <input ref={bridePhotoRef} name="bridePhoto" type="file" id="bridePhoto" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" accept="image/*" onChange={handleImageChangeBride} required></input>
                                </div>
                            </div>

                            <div class="mb-6">
                                <label for="weddingDate" class="block mb-2 text-sm font-semibold text-gray-900">Tanggal Pernikahan</label>
                                <input ref={weddingDateRef} name="weddingDate" type="date" id="weddingDate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={selectedDate} onChange={handleDateChange} required></input>
                            </div>

                            <div class="mb-6">
                                <label for="weddingTime" class="block mb-2 text-sm font-semibold text-gray-900">Waktu Pernikahan</label>
                                <input ref={weddingTimeRef} name="weddingTime" type="time" id="weddingTime" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={selectedTime} onChange={handleTimeChange} required></input>
                            </div>

                            <div class="mb-6">
                                <label for="weddingLocation" class="block mb-2 text-sm font-semibold text-gray-900">Lokasi Pernikahan</label>
                                <input ref={weddingLocationRef} name="weddingLocation" type="name" id="weddingLocation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukan Lokasi Pernikahan" required></input>
                            </div>

                            <div class="mb-6">
                                <label for="coverPhoto" class="block mb-2 text-sm font-semibold text-gray-900">Cover Undangan Pernikahan</label>
                                <input ref={coverPhotoRef} name="coverPhoto" type="file" id="coverPhoto" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" accept="image/*" onChange={handleImageChangeCover} required></input>
                            </div>

                            <div class="mb-6">
                                <label for="accountNumber" class="block mb-2 text-sm font-semibold text-gray-900">Nomor Rekening</label>
                                <input ref={accountNumberRef} name="accountNumber" type="name" id="accountNumber" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukan Nomor Rekening Anda" required></input>
                            </div>

                            <div class="mb-6">
                                <label for="weddingMap" class="block mb-2 text-sm font-semibold text-gray-900">Link Google Maps Pernikahan</label>
                                <input ref={weddingMapRef} name="weddingMap" type="name" id="weddingMap" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukan Link Google Maps Pernikahan" required></input>
                            </div>
                 
                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Upload</button>
                        
                    </div>
                </div>
                </form>
            </div>
        </Layout>
    )
}

export default IsiDataUndangan;