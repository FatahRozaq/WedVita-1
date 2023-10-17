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

import { useRef } from 'react';

function PesananUser() {
    const { id } = useParams();
    const [weddingInvitations, setWeddingInvitation] = useState([]);

    const {user, token, setUser, setToken} = useStateContext();
    
    const tableRef = useRef(null);
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
    
        console.log(id)
        axiosClient
          .get(`/getInvitations/${id}`)
          .then((response) => {
            setWeddingInvitation(response.data.weddingInvitations);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });

        // Initialize DataTable when the component mounts
        if (tableRef.current) {
          $(tableRef.current).DataTable();
        }
        
      }, [token, setUser, setToken, setWeddingInvitation]);

    console.log(weddingInvitations)
    return (
        
        <Layout onLogout={onLogout} user={user}>
            <div className="text-xl font-extrabold mb-4">
                Pilihan Desain Kartu Undangan
            </div>
            
            <div className="container mx-auto">
            <table ref={tableRef} className="display">
                <thead>
                    <tr>
                        <th>Nama Pengantin Pria</th>
                        <th>Nama Pengantin Wanita</th>
                        {/* Add more table headers if needed */}
                    </tr>
                </thead>
                <tbody>
                    {weddingInvitations.map((invitation, index) => (
                        <tr key={index}>
                            <td>{invitation.groomName}</td>
                            <td>{invitation.brideName}</td>
                            {/* Add more table data if needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </Layout> 
    );
}

export default PesananUser;