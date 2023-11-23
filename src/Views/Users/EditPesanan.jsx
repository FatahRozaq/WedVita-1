import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../Contexts/ContextProvider.jsx";
import Layout from "../../Components/CMSLayout.jsx";

function EditPesanan() {
    const navigate = useNavigate();
    let {id} = useParams();

    const { user, token, setUser, setToken, setWeddingData } = useStateContext();

    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext();
    const [selectedImageGroom, setSelectedImageGroom] = useState(null);
    const [selectedImageBride, setSelectedImageBride] = useState(null);
    const [selectedImageCover, setSelectedImageCover] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const [weddingInvitation, setWeddingInvitation] = useState({
        id: null,
        groomName: '',
        brideName: '',
        weddingDate: '',
        weddingTime: '',
        weddingMap: '',
        weddingLocation: '',
        fatherOfGroom: '',
        motherOfGroom: '',
        fatherOfBride: '',
        motherOfBride: '',
        accountNumber: '',
      })

    if (id) {
        useEffect(() => {
          setLoading(true)
          axiosClient.get(`/getWeddingInvitations/${id}`)
            .then(({data}) => {
              setLoading(false)
              setWeddingInvitation(data)
            })
            .catch(() => {
              setLoading(false)
            })
        }, [])
      }

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

        // console.log(id)

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

    const onSubmit = ev => {
        ev.preventDefault()
        if (weddingInvitation.id) {
          axiosClient.put(`/invitations/${weddingInvitation.id}`, weddingInvitation)
            .then(() => {
              setNotification('User was successfully updated')
              navigate('/pesanan/${user.id}')
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
              }
            })
        } 
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
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label for="groomName" class="block mb-2 text-sm font-semibold text-gray-900">Nama Pengantin Pria</label>
                                    <input value={weddingInvitation.groomName} onChange={ev => setWeddingInvitation({...weddingInvitation, groomName: ev.target.value})} name="groomName" type="name" id="groomName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukan Nama Pengantin Pria" required></input>
                                </div>
                                <div>
                                    <label for="brideName" class="block mb-2 text-sm font-semibold text-gray-900">Nama Pengantin Wanita</label>
                                    <input value={weddingInvitation.brideName} onChange={ev => setWeddingInvitation({...weddingInvitation, brideName: ev.target.value})} name="brideName" type="name" id="brideName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukan Nama Pengantin Wanita" required></input>
                                </div>
                                <div>
                                    <label for="fatherOfGroom" class="block mb-2 text-sm font-semibold text-gray-900">Nama Ayah Mempelai Pria</label>
                                    <input value={weddingInvitation.fatherOfGroom} onChange={ev => setWeddingInvitation({...weddingInvitation, fatherOfGroom: ev.target.value})} name="fatherOfGroom" type="name" id="fatherOfGroom" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukan Nama Ayah Pengantin Pria" required></input>
                                </div>

                                <div>
                                    <label for="fatherOfBride" class="block mb-2 text-sm font-semibold text-gray-900">Nama Ayah Mempelai Wanita</label>
                                    <input value={weddingInvitation.fatherOfBride} onChange={ev => setWeddingInvitation({...weddingInvitation, fatherOfBride: ev.target.value})} name="fatherOfBride" type="name" id="fatherOfBride" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukan Nama Ayah Pengantin Wanita" required></input>
                                </div>

                                <div>
                                    <label for="motherOfGroom" class="block mb-2 text-sm font-semibold text-gray-900">Nama Ibu Mempelai Pria</label>
                                    <input value={weddingInvitation.motherOfGroom} onChange={ev => setWeddingInvitation({...weddingInvitation, motherOfGroom: ev.target.value})} name="motherOfGroom" type="name" id="motherOfGroom" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukan Nama Ibu Pengantin Pria" required></input>
                                </div>

                                <div>
                                    <label for="motherOfBride" class="block mb-2 text-sm font-semibold text-gray-900">Nama Ibu Mempelai Wanita</label>
                                    <input value={weddingInvitation.motherOfBride} onChange={ev => setWeddingInvitation({...weddingInvitation, motherOfBride: ev.target.value})} name="motherOfBride" type="name" id="motherOfBride" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukan Nama Ibu Pengantin Wanita" required></input>
                                </div>
                                <div>
                                    <label for="groomPhoto" class="block mb-2 text-sm font-semibold text-gray-900">Foto Pengantin Pria</label>
                                    <input  class="bg-gray-50 border border-wedvita-sidebar-dark text-gray-900 text-sm rounded-lg relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-2.5 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-2.5 file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-wedvita-sidebar-dark file:px-3 file:py-2.5 file:text-wedvita-text-light-purple file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gray-100 hover:file:text-black focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none" type="file" id="formFile"  accept="image/*" onChange={handleImageChangeGroom} required />
                                </div>
                                <div>
                                    <label for="bridePhoto" class="block mb-2 text-sm font-semibold text-gray-900">Foto Pengantin Wanita</label>
                                    <input class="bg-gray-50 border border-wedvita-sidebar-dark text-gray-900 text-sm rounded-lg relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-2.5 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-2.5 file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-wedvita-sidebar-dark file:px-3 file:py-2.5 file:text-wedvita-text-light-purple file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gray-100 hover:file:text-black focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none" type="file" id="formFile"  accept="image/*" onChange={handleImageChangeBride} required />
                                
                                </div>

                            </div>

                            <div class="mb-6">
                                <label for="coverPhoto" class="block mb-2 text-sm font-semibold text-gray-900">Cover Undangan Pernikahan</label>
                                <input class="bg-gray-50 border border-wedvita-sidebar-dark text-gray-900 text-sm rounded-lg relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-2.5 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-2.5 file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-wedvita-sidebar-dark file:px-3 file:py-2.5 file:text-wedvita-text-light-purple file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gray-100 hover:file:text-black focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none" type="file" id="formFile"  accept="image/*" onChange={handleImageChangeCover} required />
                                
                            </div>

                            <div class="mb-6">
                                <label for="weddingDate" class="block mb-2 text-sm font-semibold text-gray-900">Tanggal Pernikahan</label>
                                <input value={weddingInvitation.weddingDate} onChange={ev => setWeddingInvitation({...weddingInvitation, weddingDate: ev.target.value})} name="weddingDate" type="date" id="weddingDate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" /*  value={selectedDate} onChange={handleDateChange} */ required></input> 
                            </div>

                            <div class="mb-6">
                                <label for="weddingTime" class="block mb-2 text-sm font-semibold text-gray-900">Waktu Pernikahan</label>
                                <input value={weddingInvitation.weddingTime} onChange={ev => setWeddingInvitation({...weddingInvitation, weddingTime: ev.target.value})} name="weddingTime" type="time" id="weddingTime" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" /* value={selectedTime} onChange={handleTimeChange} */ required></input>
                            </div>

                            <div class="mb-6">
                                <label for="weddingLocation" class="block mb-2 text-sm font-semibold text-gray-900">Lokasi Pernikahan</label>
                                <input value={weddingInvitation.weddingLocation} onChange={ev => setWeddingInvitation({...weddingInvitation, weddingLocation: ev.target.value})} name="weddingLocation" type="name" id="weddingLocation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukan Lokasi Pernikahan" required></input>
                            </div>

                            <div class="mb-6">
                                <label for="accountNumber" class="block mb-2 text-sm font-semibold text-gray-900">Nomor Rekening</label>
                                <input value={weddingInvitation.accountNumber} onChange={ev => setWeddingInvitation({...weddingInvitation, accountNumber: ev.target.value})} name="accountNumber" type="name" id="accountNumber" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukan Nomor Rekening Anda" required></input>
                            </div>

                            <div class="mb-6">
                                <label for="weddingMap" class="block mb-2 text-sm font-semibold text-gray-900">Link Open Street Map Pernikahan</label>
                                <input value={weddingInvitation.weddingMap} onChange={ev => setWeddingInvitation({...weddingInvitation, weddingMap: ev.target.value})} name="weddingMap" type="name" id="weddingMap" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Masukan Link Google Maps Pernikahan" required></input>
                            </div>

                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Upload</button>

                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    )


}

export default EditPesanan;