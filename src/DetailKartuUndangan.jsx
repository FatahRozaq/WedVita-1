import './App.css'

import Layout from './Components/CMSLayout.jsx'
import brownTempl2 from './assets/example-lg.png'
import colorPallete2 from './assets/color-pallete1.svg'
import { useEffect, useState } from 'react'
import axiosClient from './axios-client'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useStateContext } from './Contexts/ContextProvider'

function DataKartuUndangan() {
    const { id } = useParams(); 
    const [design, setDesign] = useState({});

    const {user, token, setUser, setToken} = useStateContext();
    if(!token){
        return <Navigate to="/login" /> 
    }

    const onLogout = ev => {
        ev.preventDefault()
    
        axiosClient.post('/logout')
          .then(() => {
            setUser({})
            setToken(null)
          })
    }
    
      useEffect(() => {
        axiosClient.get('/user')
          .then(({data}) => {
             setUser(data)
          })
      }, [])

    useEffect(() => {
        axiosClient.get(`/designs/${id}`) 
          .then(response => {
            setDesign(response.data);
          })
          .catch(error => {
            console.error('Terjadi kesalahan:', error);
          });
      }, []);

    return (
        <Layout onLogout={onLogout} user={user}>
            <div class="text-xl font-extrabold mb-4">Detail Kartu Undangan</div>
            <div
                class="block rounded-3xl p-6 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                <div class="flex justify-center">
                    <img
                        class="rounded-lg"
                        src={`http://localhost:8000${design.designImage}`} alt={design.designName}
                         />
                </div>
                <div class="p-6">
                    {/* <div class="grid grid-rows-4 grid-2 gap-2">
                        <div class="text-xl font-medium">Deskripsi</div>
                        <div class="text-justify">Celebrate your special day in style with our Elegant Floral Wedding Invitation Template.</div>
                        <div class="text-xl font-medium">Harga</div>
                        <div class="text-justify">Rp. 5.000/pcs</div>
                        <div class="text-xl font-medium">Tema</div>
                        <div class="text-justify">Casual</div>
                        <div class="text-xl font-medium">Warna</div>
                        <img
                            src={colorPallete2}
                            alt="" />
                    </div> */}

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                        <div><span class="text-xl font-medium">Deskripsi</span> <br /> <span>{design.designDescription}</span></div>
                        <div><span class="text-xl font-medium">Nama Design</span> <br /> <span>{design.designName}</span> </div>
                        <div><span class="text-xl font-medium">Harga</span> <br /> <span>Rp. {design.price}/pcs</span> </div>
                        <div><span class="text-xl font-medium">Warna</span> <br /> <span> <img src={colorPallete2} alt="" /></span> </div>
                        <div>
                                <Link to={`/isi-data-undangan/${design.id}`} class="text-white text-white bg-wedvita-purple-unhover hover:bg-wedvita-purple-hovered focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center  mr-2 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
                                        <path d="M1 1.75A.75.75 0 011.75 1h1.628a1.75 1.75 0 011.734 1.51L5.18 3a65.25 65.25 0 0113.36 1.412.75.75 0 01.58.875 48.645 48.645 0 01-1.618 6.2.75.75 0 01-.712.513H6a2.503 2.503 0 00-2.292 1.5H17.25a.75.75 0 010 1.5H2.76a.75.75 0 01-.748-.807 4.002 4.002 0 012.716-3.486L3.626 2.716a.25.25 0 00-.248-.216H1.75A.75.75 0 011 1.75zM6 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                    </svg>
                                    Pesan
                                </Link>
                        </div>
                    </div>
                    {/* <h5
                        class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                        Card title
                    </h5>
                    <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                        This is a wider card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit
                        longer.
                    </p>
                    <p class="text-base text-neutral-600 dark:text-neutral-200">
                        <small class="text-neutral-500 dark:text-neutral-400">Last updated 3 mins ago</small>
                    </p> */}
                </div>
            </div>

        </Layout>
    )
}

export default DataKartuUndangan;