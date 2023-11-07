import '../../App.css'
import Layout from '../../Components/CMSLayout.jsx'
import { useState, useEffect } from 'react'
import axios from 'axios'
import axiosClient from '../../axios-client';
import { Link, Navigate } from 'react-router-dom'
import { useStateContext } from '../../Contexts/ContextProvider'
import { redirect, useParams } from 'react-router-dom'
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import the DataTables CSS
import $ from 'jquery';
import 'datatables.net';
import ReactModal from 'react-modal';

import { useRef } from 'react';

function Latihan() {
    const { id } = useParams();
    const [weddingInvitations, setWeddingInvitation] = useState([]);

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
          .get(`/getInvitations/${id}`)
          .then((response) => {
            setWeddingInvitation(response.data.weddingInvitations);
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
        
      }, [token, setUser, setToken, setWeddingInvitation]);

    return (
        
        <Layout onLogout={onLogout} user={user}>
            <div className="text-xl font-extrabold mb-4">
                Pilihan Desain Kartu Undangan
            </div>
            
            <div className="container mx-auto">
              {isLoading ? (
                  <p>Loading...</p>
              ) : weddingInvitations.length > 0 ? (
                <table ref={tableRef} className="display">
                    <thead>
                        <tr>
                            <th>Nama Pengantin Pria</th>
                            <th>Nama Pengantin Wanita</th>
                            <th>Show</th>
                            {/* Add more table headers if needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {weddingInvitations.map((invitation, index) => (
                            <tr key={index}>
                                <td>{invitation.groomName}</td>
                                <td>{invitation.brideName}</td>
                                <td><Link to={`/cms-detail-ku/${invitation.id}`}>Generate Undangan</Link></td>
                                <td>
                                    <button onClick={() => openModal(invitation)}>  
                                      Show Detail
                                    </button>
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
         <span className='modal-title'>Data Pernikahan</span>
      </div>
      

      <div className="row-center">
          <img className="rounded-lg object-cover h-40 w-68" src={`http://localhost:8000${selectedInvitation.coverPhoto}`} alt={selectedInvitation.groomPhoto}/* alt="product image"*/ />
      </div>

      <div className="row">
        <div className="column">
          <span className="subTitle">
              Mempelai Pria :
          </span>

          <span>
              {selectedInvitation.groomName}
              {selectedInvitation.designId.designName}
          </span>
        </div>

        <div className="column">
          <span className="subTitle">
            Mempelai Wanita :
          </span>

          <span>
            {selectedInvitation.brideName}
          </span>
        </div>
      </div>

      <div className="row">
          <img className="rounded-lg object-cover h-40 w-28" src={`http://localhost:8000${selectedInvitation.groomPhoto}`} alt={selectedInvitation.groomPhoto}/* alt="product image"*/ />

          <img className="rounded-lg object-cover h-40 w-28" src={`http://localhost:8000${selectedInvitation.bridePhoto}`} alt={selectedInvitation.bridePhoto}/* alt="product image"*/ />
      </div>

      <div className="row">
        <div className="column">
          <span className="subTitle">
              Ayah Mempelai Pria :
          </span>

          <span>
              {selectedInvitation.fatherOfGroom}
          </span>
        </div>

        <div className="column">
          <span className="subTitle">
            Ayah Mempelai Wanita :
          </span>

          <span>
            {selectedInvitation.fatherOfBride}
          </span>
        </div>
      </div>

      <div className="row">
        <div className="column">
          <span className="subTitle">
              Ibu Mempelai Pria :
          </span>

          <span>
              {selectedInvitation.motherOfGroom}
          </span>
        </div>

        <div className="column">
          <span className="subTitle">
             Ibu Mempelai Wanita:
          </span>

          <span>
            {selectedInvitation.motherOfBride}
          </span>
        </div>
      </div>

      <div className="row">

        <div className="column">
          <span className='subTitle'>
            Tanggal Pernikahan :
          </span>

          <span>
            {selectedInvitation.weddingDate}
          </span>
        </div>
        
      </div>

      <div className="row">

        <div className="column">
          <span className='subTitle'>
            Waktu Pernikahan :
          </span>

          <span>
            {selectedInvitation.weddingTime}
          </span>
        </div>
        
      </div>

      <div className="row">

        <div className="column">
          <span className='subTitle'>
            Tempat Pernikahan :
          </span>

          <span>
            {selectedInvitation.weddingLocation}
          </span>
        </div>
        
      </div>

      <div className="row">

        <div className="column">
          <span className='subTitle'>
            Maps Pernikahan :
          </span>

          <span>
            {selectedInvitation.weddingMap}
          </span>
        </div>
        
      </div>

      <div className="row">

        <div className="column">
          <span className='subTitle'>
            Nomor Rekening :
          </span>

          <span>
            {selectedInvitation.accountNumber}
          </span>
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
        </Layout> 
    );
}

export default Latihan;