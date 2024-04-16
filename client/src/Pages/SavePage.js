import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Save from '../components/Save';
function SavePage() {
  const Navigate = useNavigate()
  const [email,setEmail] = useState('');
  function checkauth() {
    axios.get('http://localhost:3001/api/auth/checkAuth',  {
			headers: {
				'token': localStorage.getItem('token'),
			},
		})
    .then(result => {
      // console.log(result)
      if(result.data.status === 'error'){
        Navigate('/Login')
      }
    })
    .catch(err => console.log(err))
  }
  
  checkauth();

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <Save />
      <Footer />
    </div>
  );
}

export default SavePage;
