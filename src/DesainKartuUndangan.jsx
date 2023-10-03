import './App.css'
import blueTempl from './assets/blue.jpg'
import Layout from './Components/CMSLayout.jsx'
import brownTempl from './assets/example.png'
import { useState, useEffect } from 'react'
import axios from 'axios'
import axiosClient from './axios-client';
import { Link } from 'react-router-dom'

function DesainKartuUndangan({user, onLogout}) {
    const [designs, setDesigns] = useState([]);
  
    useEffect(() => {
        // Make an HTTP GET request to fetch the data
        axiosClient.get('/getInvitationDesigns') // Replace with your API endpoint
        .then(response => {
            // Set the fetched data to the 'designs' state
            setDesigns(response.data.designs);
            console.log(response.data.designs)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);


    return (
        <Layout onLogout={onLogout} user={user}>
          <div className="text-xl font-extrabold mb-4">Form Data Kartu Undangan</div>
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {designs.map((design, index) => (
                <div className="px-2" key={index}>
                  <div className="w-full max-w-sm bg-white border border-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#" className="flex p-5 justify-center">
                      <img className="rounded-lg" src={design.designImage} alt="product image" />
                    </a>
                    <div className="px-5 pb-5">
                      <a href="#">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">{design.nama_desain}</h5>
                      </a>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">{design.price}<span className="text-sm font-normal">/pcs</span></span>
                        <Link to={`/cms-detail-ku/${design.id}`}>
                          <button type="button" className="text-white bg-wedvita-purple-unhover hover:bg-wedvita-purple-hovered focus:outline-none focus:ring-4 focus:ring-gray-300 font-extrabold rounded-full text-sm px-5 py-2.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                              <path d="M11.625 16.5a1.875 1.875 0 100-3.75 1.875 1.875 0 000 3.75z" />
                              <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6 16.5c.66 0 1.277-.19 1.797-.518l1.048 1.048a.75.75 0 001.06-1.06l-1.047-1.048A3.375 3.375 0 1011.625 18z" clipRule="evenodd" />
                              <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
                            </svg>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

            {/* <div>
      <h1>Invitation Designs</h1>
      <ul>
        {designs.map(design => (
          <li key={design.id}>
            <h2>{design.designName}</h2>
            <p>{design.designDescription}</p>
          </li>
        ))}
      </ul>
    </div> */}
        </Layout>
    )
}

export default DesainKartuUndangan;