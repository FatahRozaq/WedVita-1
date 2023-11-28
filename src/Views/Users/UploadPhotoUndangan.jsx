import '../../App.css'

import Layout from '../../Components/CMSLayout.jsx'
import { useEffect, useState } from 'react'
import axiosClient from '../../axios-client'
import { useParams, Link } from 'react-router-dom'
import { createRef } from 'react'
import { useStateContext } from '../../Contexts/ContextProvider'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function UploadPhotoUndangan() {
    const photoRef1 = createRef();
    const photoRef2 = createRef();
    const photoRef3 = createRef();
    const photoRef4 = createRef();
    const photoRef5 = createRef();
    const { id } = useParams();
    const [weddingInvitations, setWeddingInvitations] = useState({});
    const [errors, setErrors] = useState(null);
    const [selectedImage1, setSelectedImage1] = useState(null);
    const [selectedImage2, setSelectedImage2] = useState(null);
    const [selectedImage3, setSelectedImage3] = useState(null);
    const [selectedImage4, setSelectedImage4] = useState(null);
    const [selectedImage5, setSelectedImage5] = useState(null);
    const { setweddingPhoto } = useStateContext();
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
    
      // useEffect(() => {
      //   axiosClient.get('/user')
      //     .then(({data}) => {
      //        setUser(data)
      //     })
      // }, [])

      useEffect(() => {

          axiosClient
              .get(`/getWeddingInvitations/${id}`)
              .then((response) => {
                  setWeddingInvitations(response.data);
              })
              .catch((error) => {
                  console.error('Error fetching data: ', error);
              });

      }, [setWeddingInvitations]);
    

      const handleImageChange1 = (e) => {
        if (e.target.files.length > 0) {
          setSelectedImage1(e.target.files[0]);
        }
      }; 

      const handleImageChange2 = (e) => {
        if (e.target.files.length > 0) {
          setSelectedImage2(e.target.files[0]);
        }
      }; 

      const handleImageChange3 = (e) => {
        if (e.target.files.length > 0) {
          setSelectedImage3(e.target.files[0]);
        }
      }; 

      const handleImageChange4 = (e) => {
        if (e.target.files.length > 0) {
          setSelectedImage4(e.target.files[0]);
        }
      }; 

      const handleImageChange5 = (e) => {
        if (e.target.files.length > 0) {
          setSelectedImage5(e.target.files[0]);
        }
      }; 

    const onSubmit = (ev) => {
        ev.preventDefault()

        navigate("/cms-desain-ku");
      
        const formData = new FormData();
        formData.append('invitationId', weddingInvitations.id);
        formData.append('photo1', selectedImage1);
        formData.append('photo2', selectedImage2);
        formData.append('photo3', selectedImage3);
        formData.append('photo4', selectedImage4);
        formData.append('photo5', selectedImage5);

        axiosClient.post('/photos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(({data}) => {
          setweddingPhoto(data.weddingPhotos)
        })
        .catch(err => {
          const response = err.response;
          if( response && response.status === 422){
            setErrors(response.data.errors)
          }
        })
      }

    return (
        <Layout onLogout={onLogout} user={user}>
            <div className="text-xl font-extrabold mb-4">Upload Photo Undangan</div>
            
            <div className='UploadPhotoUndangan'>
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
                        <label for="dropzone-file-1" className="mb-4 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">

                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {/* <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> */}
                                {selectedImage1 ? (
                                <img className="object-cover h-48 w-96" src={URL.createObjectURL(selectedImage1)} />
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

                            <input id="dropzone-file-1" type="file" accept="image/*" onChange={handleImageChange1} className="hidden" />
                        </label>

                        <label for="dropzone-file-2" className="mb-4 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">

                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {/* <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> */}
                                {selectedImage2 ? (
                                <img className="object-cover h-48 w-96" src={URL.createObjectURL(selectedImage2)} />
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

                            <input id="dropzone-file-2" type="file" accept="image/*" onChange={handleImageChange2} className="hidden" />
                        </label>

                        <label for="dropzone-file-3" className="mb-4 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">

                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {/* <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> */}
                                {selectedImage3 ? (
                                <img className="object-cover h-48 w-96" src={URL.createObjectURL(selectedImage3)} />
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

                            <input id="dropzone-file-3" type="file" accept="image/*" onChange={handleImageChange3} className="hidden" />
                        </label>


                        <label for="dropzone-file-4" className="mb-4 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">

                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {/* <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> */}
                                {selectedImage4 ? (
                                <img className="object-cover h-48 w-96" src={URL.createObjectURL(selectedImage4)} />
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

                            <input id="dropzone-file-4" type="file" accept="image/*" onChange={handleImageChange4} className="hidden" />
                        </label>


                        <label for="dropzone-file-5" className="mb-4 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">

                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {/* <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> */}
                                {selectedImage5 ? (
                                <img className="object-cover h-48 w-96" src={URL.createObjectURL(selectedImage5)} />
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

                            <input id="dropzone-file-5" type="file" accept="image/*" onChange={handleImageChange5} className="hidden" />
                        </label>

                                                     
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Upload</button>
                        
                    </div>
                </div>
                </form>
            </div>
        </Layout>
    )
}

export default UploadPhotoUndangan;