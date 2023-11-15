import './App.css'
import blueTempl from './assets/blue.jpg'
import Layout from './Components/CMSLayout.jsx'
import brownTempl from './assets/example.png'
import { useState, useEffect } from 'react'
import axios from 'axios'
import axiosClient from './axios-client';
import { Link, Navigate } from 'react-router-dom'
import { useStateContext } from './Contexts/ContextProvider'
import { redirect } from 'react-router-dom'

function InvitationDesignsList() {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    // Ambil data dari API
    fetch('/api/getInvitationDesigns')
      .then((response) => response.json())
      .then((data) => setDesigns(data.designs))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Daftar Invitation Designs</h1>
      <ul>
        {designs.map((design) => (
          <li key={design.id}>
            <h3>{design.designName}</h3>
            <p>{design.designDescription}</p>
            <img src={design.designImage} alt={design.designName} />
            <p>Price: ${design.price}</p>
            <a href={design.designLink} target="_blank" rel="noopener noreferrer">
              Lihat Desain
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InvitationDesignsList;
