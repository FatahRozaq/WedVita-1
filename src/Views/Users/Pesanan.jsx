import '../../App.css'
import Layout from '../../Components/CMSLayout.jsx'
import { useState, useEffect, createRef } from 'react'
import axios from 'axios'
import axiosClient from '../../axios-client';
import { Link, Navigate } from 'react-router-dom'
import { useStateContext } from '../../Contexts/ContextProvider'
import { redirect, useParams } from 'react-router-dom'
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import the DataTables CSS
import $ from 'jquery';
import 'datatables.net';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPencilAlt, faTrash, faTrashAlt, faShareSquare, faEye } from '@fortawesome/free-solid-svg-icons';

import { useRef } from 'react';

function PesananUser() {
    const { id } = useParams();
    const [weddingInvitations, setWeddingInvitation] = useState([]);

    const {user, token, setUser, setToken, setWeddingOrder} = useStateContext();
    const [isLoading, setIsLoading] = useState(true);
    const tableRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInvitation, setSelectedInvitation] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState(0);
    const [weddingOrderId, setWeddingOrderId] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isLoadingOrderModal, setIsLoadingOrderModal] = useState(false);
    const [isLoadingInvitationModal, setIsLoadingInvitationModal] = useState(false);
    const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

    const userRef = createRef();
    const invitationRef = createRef();
    const designRef = createRef();

    const handleChangeOrder = (event) => {
      setSelectedOrderId(event.target.value);
    };

    const openModal = (invitation) => {
      setSelectedInvitation(invitation);
      setIsInvitationModalOpen(true);
    };
  
    const openModalOrder = (invitation) => {
      setSelectedOrder(invitation);
      setIsOrderModalOpen(true);
    };
  
    const closeModal = () => {
      setIsInvitationModalOpen(false);
      setIsOrderModalOpen(false);
      setIsLoadingOrderModal(false);
      setIsLoadingInvitationModal(false);
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

    const onSubmit = (ev) => {
      ev.preventDefault()
      setIsLoadingOrderModal(true);
      setSelectedOrderId(invitationRef.current.value)
      const formData = new FormData();
      formData.append('invitationId', invitationRef.current.value);
      formData.append('userId', userRef.current.value);
      formData.append('designId', designRef.current.value);

      axiosClient.post('/orders', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    .then(({ data }) => {
        setWeddingOrder(data.invitationOrders)
        setIsLoadingOrderModal(false);
    })
    .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
            // response.data.errors
            // console.log(response.data.errors);
            setErrors(response.data.errors)
            setIsLoadingOrderModal(false);
        }
    })

    }
    
    useEffect(() => {
        console.log(selectedOrderId)
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

        axiosClient
        .get(`/getOrder/${selectedOrderId}`)
        .then((orderResponse) => {
          const weddingInvitations = orderResponse.data.weddingInvitations;
          // console.log(orderResponse)
          if (weddingInvitations && weddingInvitations.length > 0) {
            const snapURL = weddingInvitations[0].snapUrl;
            window.location.href = snapURL;
          } else {
            console.error("No wedding invitations found or snapURL not available.");
          }
        })
        .catch((error) => {
          // console.error("Terjadi kesalahan saat mengambil data order:", error);
        });

        
      }, [token, setUser, setToken, setWeddingInvitation]);

      const onDelete = (invitation) => {
        if (!window.confirm("Are you sure you want to delete this invitation?")) {
          return;
        }
      
        axiosClient
          .delete(`/invitations/${invitation.id}`)
          .then(() => {
            // Remove the deleted invitation from the state
            setWeddingInvitation((prevInvitations) =>
              prevInvitations.filter((item) => item.id !== invitation.id)
            );
          })
          .catch((error) => {
            console.error("Error deleting invitation:", error);
          });
      };
      

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
                            <th>Pengantin Pria</th>
                            <th>Pengantin Wanita</th>
                            <th>Detail Pernikahan</th>
                            <th>Preview</th>
                            <th>Generate Link</th>
                            <th>Status</th>
                            <th>Action</th>
                            {/* Add more table headers if needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {weddingInvitations.map((invitation, index) => (
                            <tr key={index}>
                                <td>{invitation.groomName}</td>
                                <td>{invitation.brideName}</td>
                                <td>
                                    <button onClick={() => openModal(invitation)}>  
                                      Show Detail
                                    </button>
                                </td>
                                {/* langkah3 */}
                                <td className='flex items-center justify-center'><Link to={`/previewUndangan/${invitation.id}`}><FontAwesomeIcon icon={faEye} className="text-blue-500"/></Link></td> 
                                <td >{invitation.status === 'success' ? (
                                      <Link to={`/Wedding/wedding-of-${invitation.groomName}-and-${invitation.brideName}/${invitation.id}`}>
                                        <FontAwesomeIcon icon={faShareSquare} className="text-blue-500"/>
                                      </Link>
                                    ) : (
                                      <span>Undangan harus dibayar dahulu</span>
                                    )}
                                </td> 
                                <td>
                                    <button onClick={() => openModalOrder(invitation)}>  
                                      Order
                                    </button>
                                </td>
                                <td className='flex items-center justify-center space-x-2'>
                                  <Link className="btn-edit" to={'/editPesanan/' + invitation.id}>
                                    <FontAwesomeIcon icon={faEdit} className="text-blue-500" />
                                  </Link>
                                  <button onClick={ev => onDelete(invitation)}>
                                    <FontAwesomeIcon icon={faTrash} className="text-red-500" />
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
              isOpen={isInvitationModalOpen}
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

            <ReactModal
              isOpen={isOrderModalOpen}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
              style={modalStyles}
            >
              {selectedOrder ? (
    <div>
      <div className="row-center">
         <span className='modal-title'>Data Pernikahan</span>
      </div>
      
    <form onSubmit={onSubmit}>
      <div className="row">

        <div className="column">
          <div className="mb-6">
            <label for="name" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-dark">Invitation Id</label>
            <input ref={invitationRef} value={selectedOrder.id} type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={selectedOrder.id} disabled></input>
          </div>
        </div>
        
      </div>

      <div className="row">

        <div className="column">
          <div className="mb-6">
            <label for="name" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-dark">Design Id</label>
            <input ref={designRef} value={selectedOrder.designId} type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={selectedOrder.designId} disabled></input>
          </div>
        </div>
        
      </div>

      <div className="row">

        <div className="column">
          <div className="mb-6">
            <label for="name" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-dark">User Id</label>
            <input ref={userRef} value={selectedOrder.userId} type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={selectedOrder.userId} disabled></input>
          </div>
        </div>
        
      </div>

      <span>{weddingOrderId}</span>

      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Upload</button>
      </form>
      
      {/* Add more data fields as needed */}
      <div className="row-center">
        <button className='btn-modal' onClick={closeModal}>Tutup</button>
      </div>
      
    </div>
  ) : (
    <p>No Order selected.</p>
  )}
            </ReactModal>
            

    
        </Layout> 
    );
}

export default PesananUser;