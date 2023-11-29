import './App.css'
import Layout from './Components/CMSLayout.jsx'
import brownTempl from './assets/example.png'
import { useState, useEffect } from 'react'
import axios from 'axios'
import axiosClient from './axios-client';
import { Link, Navigate } from 'react-router-dom'
import { useStateContext } from './Contexts/ContextProvider'
import { redirect } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import the DataTables CSS
import $ from 'jquery';
import 'datatables.net';
import ReactModal from 'react-modal';

import { useRef } from 'react';
import AdminLayout from './Components/CMSAdminLayout.jsx'

function DaftarDesainKartuUndangan() {
    const { id } = useParams();
    const [invitationDesigns, setInvitationDesigns] = useState([]);

    const {user, token, setUser, setToken} = useStateContext();
    const [isLoading, setIsLoading] = useState(true);
    const tableRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInvitation, setSelectedInvitation] = useState(null);

    const openModal = (invitation) => {
      setSelectedInvitation(invitation);
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    const modalStyles = {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        zIndex: 1000, // Adjust this value as needed
      },
      content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%', // Adjust the width as needed
        height: '60%',
        backgroundColor: 'white',
        padding: '20px',
        zIndex: 1001, // Must be higher than overlay's zIndex
      },
    };

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
    
        axiosClient
          .get(`/getInvitationDesigns`)
          .then((response) => {
            setInvitationDesigns(response.data.designs);
            setIsLoading(false)
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            setIsLoading(false)
          });

        // Initialize DataTable when the component mounts
        if (tableRef.current) {
          $(tableRef.current).DataTable();
        }
        
      }, [token, setUser, setToken, setInvitationDesigns]);

      const onDelete = (design) => {
        if (!window.confirm("Are you sure you want to delete this invitation?")) {
          return;
        }
      
        axiosClient
          .delete(`/designs/${design.id}`)
          .then(() => {
            // Remove the deleted invitation from the state
            setWeddingInvitation((prevInvitations) =>
              prevInvitations.filter((item) => item.id !== design.id)
            );
          })
          .catch((error) => {
            console.error("Error deleting invitation:", error);
          });
      };

    return (
        
        <AdminLayout onLogout={onLogout} user={user}>
            <div className="text-xl font-extrabold mb-4">
                Pilihan Desain Kartu Undangan
            </div>
            
            <div className="container mx-auto">
              {isLoading ? (
                  <p>Loading...</p>
              ) : invitationDesigns.length > 0 ? (
                <table ref={tableRef} className="display">
                    <thead>
                        <tr>
                            <th>Nama Desain</th>
                            <th>Deskripsi Desain</th>
                            <th>Show</th>
                            <th>Generate Link</th>
                            <th>Hapus</th>
                            {/* Add more table headers if needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {invitationDesigns.map((invitation, index) => (
                            <tr key={index}>
                                <td>{invitation.designName}</td>
                                <td>{invitation.designDescription}</td>
                                {/* langkah3 */}
                                <td><Link to={`/cms-detail-ku/${invitation.id}`}>Lihat Desain</Link></td> 
                                <td><Link to={`/EditDesainKartuUndangan/${invitation.id}`}>Ubah Desain</Link>
                                </td>
                                <td>
                                  <button onClick={ev => onDelete(invitation)}>Delete</button>
                                </td>
                                
                                {/* Add more table data if needed */}
                            </tr>
                        ))}
                    </tbody>
                </table>
              ) : (
                <p>Tidak ada pesanan</p>
              )}
            
            </div>

            <ReactModal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
              style={modalStyles}
            >
              {selectedInvitation ? (
    <div>
      <div className="row-center">
         <span className='modal-title'>Data Desain</span>
      </div>
      

      <div className="row-center">
          <img className="rounded-lg object-cover h-40 w-68" src={`http://localhost:8000${selectedInvitation.coverPhoto}`} alt={selectedInvitation.groomPhoto}/* alt="product image"*/ />
      </div>

      <div className="row">
        <div className="column">
          <div className="mb-6">
              <label for="name" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-dark">Mempelai Pria</label>
              <input type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={selectedInvitation.groomName} disabled></input>
          </div>
        </div>

        <div className="column">
          <div className="mb-6">
            <label for="name" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-dark">Mempelai Wanita</label>
            <input type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={selectedInvitation.brideName} disabled></input>
          </div>
        </div>
      </div>

      <div className="row-center-detail">
          <img className="rounded-lg object-cover h-40 w-28" src={`http://localhost:8000${selectedInvitation.groomPhoto}`} alt={selectedInvitation.groomPhoto}/* alt="product image"*/ />

          <img className="rounded-lg object-cover h-40 w-28" src={`http://localhost:8000${selectedInvitation.bridePhoto}`} alt={selectedInvitation.bridePhoto}/* alt="product image"*/ />
      </div>

      <div className="row">
        <div className="column">
          <div className="mb-6">
            <label for="name" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-dark">Ayah Mempelai Pria</label>
            <input type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={selectedInvitation.fatherOfGroom} disabled></input>
          </div>
        </div>

        <div className="column">
          <div className="mb-6">
            <label for="name" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-dark">Ayah Mempelai Wanita</label>
            <input type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={selectedInvitation.fatherOfBride} disabled></input>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="column">
          <div className="mb-6">
            <label for="name" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-dark">Ibu Mempelai Pria</label>
            <input type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={selectedInvitation.motherOfGroom} disabled></input>
          </div>
        </div>

        <div className="column">
          <div className="mb-6">
            <label for="name" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-dark">Ibu Mempelai Wanita</label>
            <input type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={selectedInvitation.motherOfBride} disabled></input>
          </div>
        </div>
      </div>

      <div className="row">

        <div className="column">
          <div className="mb-6">
            <label for="name" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-dark">Tanggal Pernikahan</label>
            <input type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={selectedInvitation.weddingDate} disabled></input>
          </div>
        </div>
        
      </div>

      <div className="row">

        <div className="column">
          <div className="mb-6">
            <label for="name" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-dark">Waktu Pernikahan</label>
            <input type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={selectedInvitation.weddingTime} disabled></input>
          </div>
        </div>
        
      </div>

      <div className="row">

        <div className="column">
          <div className="mb-6">
            <label for="name" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-dark">Lokasi Pernikahan</label>
            <input type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={selectedInvitation.weddingLocation} disabled></input>
          </div>
        </div>
        
      </div>

      <div className="row">

        <div className="column">
          <div className="mb-6">
            <label for="name" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-dark">Maps Pernikahan</label>
            <input type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={selectedInvitation.weddingMap} disabled></input>
          </div>
        </div>
        
      </div>

      <div className="row">

        <div className="column">
          <div className="mb-6">
            <label for="name" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-dark">Nomor Rekening</label>
            <input type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={selectedInvitation.accountNumber} disabled></input>
          </div>
        </div>
        
      </div>
      
      {/* Add more data fields as needed */}
      <div className="row-center">
        <button className='btn-modal' onClick={closeModal}>Tutup</button>
      </div>
      
    </div>
  ) : (
    <p>No invitation selected.</p>
  )}
            </ReactModal>
        </AdminLayout> 
    );
}

export default DaftarDesainKartuUndangan;