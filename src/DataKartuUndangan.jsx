import './App.css'

import Layout from './Components/CMSLayout.jsx'
import { useEffect, useState } from 'react'
import axiosClient from './axios-client'
import { useParams, Link } from 'react-router-dom'
import { createRef } from 'react'
import { useStateContext } from './Contexts/ContextProvider'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function DataKartuUndangan() {
    const designNameRef = createRef();
    const designDescriptionRef = createRef();
    const designImageRef = createRef();
    const priceRef = createRef();
    const designLinkRef = createRef();

    const [errors, setErrors] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const {setDesign, user, token, setUser, setToken} = useStateContext();
    const navigate = useNavigate();



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
    

      const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
          setSelectedImage(e.target.files[0]);
        }
      }; 

    const onSubmit = (ev) => {
        ev.preventDefault()

        navigate("/cms-desain-ku");
      
        const formData = new FormData();
        formData.append('userId', user.id);
        formData.append('designName', designNameRef.current.value);
        formData.append('designDescription', designDescriptionRef.current.value);
        formData.append('designImage', selectedImage);
        formData.append('price', priceRef.current.value);
        formData.append('designLink', designLinkRef.current.value);

        axiosClient.post('/designs', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(({data}) => {
          setDesign(data.invitationDesigns)
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
                        <label for="dropzone-file" class="mb-4 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">

                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                {/* <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                <p class="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> */}
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

                            <input id="dropzone-file" type="file" accept="image/*" onChange={handleImageChange} class="hidden" />
                        </label>

                        
                            <div class="mb-6">
                                <label for="name" class="block mb-2 text-sm font-semibold text-gray-900">Nama Desain</label>
                                <input ref={designNameRef} name="designName" type="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nama Anda" required></input>
                            </div>
                            <div class="mb-6">
                                <label for="name" class="block mb-2 text-sm font-semibold text-gray-900">Harga</label>
                                <input ref={priceRef} name="price" type="number" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Harga Desain" required></input>
                            </div>
                            <div class="mb-6">
                                <label for="name" class="block mb-2 text-sm font-semibold text-gray-900">Tautan</label>
                                <input ref={designLinkRef} name="designLink" type="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Tautan Desain" required></input>
                            </div>
                            <div class="mb-6">
                                <label for="message" class="block mb-2 text-sm font-medium text-gray-900">Deskripsi</label>
                                <textarea ref={designDescriptionRef} name="designDescription" id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                            </div>                            
                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Upload</button>
                        
                    </div>
                </div>
                </form>
            </div>
        </Layout>
    )
}

export default DataKartuUndangan;