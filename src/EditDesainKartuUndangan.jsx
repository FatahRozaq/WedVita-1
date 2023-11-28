import './App.css'

import Layout from './Components/CMSLayout.jsx'
import { useEffect, useState } from 'react'
import axiosClient from './axios-client.js'
import { useParams, Link } from 'react-router-dom'
import { createRef } from 'react'
import { useStateContext } from './Contexts/ContextProvider.jsx'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function EditDesainKartuUndangan() {
    const { id } = useParams(); 
    const [loading, setLoading] = useState(false);
    const [design, setDesign] = useState({});
    const {user, token, setUser, setToken} = useStateContext();
    const {setNotification} = useStateContext();

    const [errors, setErrors] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();
    const [invitationDesigns, setInvitationDesigns] = useState({
      id: null,
      designName: '',
      designDescription: '',
      designImage: '',
      price: '',
      designLink: '',
    })

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
    

      if (id) {
        useEffect(() => {
          setLoading(true)
          axiosClient.get(`/designs/${id}`)
            .then(({data}) => {
              setLoading(false)
              setInvitationDesigns(data)
            })
            .catch(() => {
              setLoading(false)
            })
        }, [])
      }

      const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
          setSelectedImage(e.target.files[0]);
        }
      }; 

      const onSubmit = (ev) => {
        ev.preventDefault();
      

          if (invitationDesigns.id) {
            axiosClient.put(`/designs/${invitationDesigns.id}`, invitationDesigns)
              .then(() => {
                setNotification('User was successfully updated')
              })
              .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                  setErrors(response.data.errors)
                }
              })
          } 

          
        // navigate("/cms-desain-ku");
        }

    return (
        <Layout onLogout={onLogout} user={user}>
            <div className="text-xl font-extrabold mb-4">Form Data Kartu Undangan</div>
            
            <div className='DataKartuUndangan'>
              {errors && 
                  <div>
                    {Object.keys(errors).map(key => (
                      <p key={key}>{errors[key][0]}</p>
                    ))}
                  </div>
                }

                <form onSubmit={onSubmit}>
                <div className="bg-white p-4 mb-4 rounded shadow">
                    <div className="mb-4">
                        <label for="dropzone-file" className="mb-4 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                    
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {/* <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> */}
                                {selectedImage ? (
                                <img className="object-cover h-48 w-96" src={URL.createObjectURL(selectedImage)} />
                                ) : (

                                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <svg
                                    className="w-8 h-8 mb-4 text-gray-500"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                  >
                                    <path
                                      stroke="currentColor"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                  </svg>
                                  <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>

                                  )}
                            </div>

                            <input id="dropzone-file" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </label>
                            



                        
                            <div className="mb-6">
                                <label for="name" className="block mb-2 text-sm font-semibold text-gray-900">Nama Desain</label>
                                <input name="designName" type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nama Anda" value={invitationDesigns.designName} onChange={ev => setInvitationDesigns({...invitationDesigns, designName: ev.target.value})} required></input>
                            </div>
                            <div className="mb-6">
                                <label for="name" className="block mb-2 text-sm font-semibold text-gray-900">Harga</label>
                                <input name="price" type="number" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Harga Desain" value={invitationDesigns.price} onChange={ev => setInvitationDesigns({...invitationDesigns, price: ev.target.value})} required></input>
                            </div>
                            <div className="mb-6">
                                <label for="name" className="block mb-2 text-sm font-semibold text-gray-900">Tautan</label>
                                <input name="designLink" type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Tautan Desain" value={invitationDesigns.designLink} onChange={ev => setInvitationDesigns({...invitationDesigns, designLink: ev.target.value})} required></input>
                            </div>
                            <div className="mb-6">
                                <label for="message" className="block mb-2 text-sm font-medium text-gray-900">Deskripsi</label>
                                <textarea name="designDescription" id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Leave a comment..." value={invitationDesigns.designDescription} onChange={ev => setInvitationDesigns({...invitationDesigns, designDescription: ev.target.value})} required></textarea>
                            </div>                            
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Upload</button>
                        
                    </div>
                </div>
                </form>
            </div>
        </Layout>
    )
}

export default EditDesainKartuUndangan;