import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios'
import ChangePassword from '../components/ChangePassword';
import { useNavigate } from 'react-router-dom';

function SettingsPage() {  

    const [name, setName] = useState('');
    const [editable, setEditable] = useState(false);
    const [newName, setNewName] = useState('');
  
        checkauth();
      
  
    const handleUpdateName = () => {
      
      axios.post('http://localhost:3001/api/profile/user_name', {email, newName })
        .then(response => {
          // Update the name displayed on the UI
          if(response.data.status == "ok"){
          setName(newName);
          // Disable input field
          setEditable(false);
          alert("Name Is Changed! `it show after you log in again`")
          }
          else{
            // console.log(response)
          }
        })
        .catch(error => {
          // console.error('Error updating name:', error);
        });
    };


const [email,setEmail] = useState()
  const Navigate = useNavigate()
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
          }else{
            setEmail(result.data.email)
            setName(result.data.name)
          }
        })
        .catch(err => console.log(err))
      }
      
      


  return (
      <div className="">
        <Navbar />
        
      <div className="flex flex-row items-center justify-center mt-16 py-16 mx-auto">
          <input
            type="text"
            className="border border-gray-300 w-1/4 px-3 py-2 mr-2"
           
            placeholder={name}
            onChange={(e) => setNewName(e.target.value)}
            disabled={!editable}
          />
          {!editable ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setEditable(true)}
            >
              Change
            </button>
          ) : (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleUpdateName}
            >
              Update
            </button>
            
          )}

    </div>
        <ChangePassword email={email}/>
      <Footer />
    </div>
  );
}

export default SettingsPage;
