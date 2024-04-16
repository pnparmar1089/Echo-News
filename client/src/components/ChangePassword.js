import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChangePassword(props) {
  const email = props.email;
  const [oldpassword, setOldpassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newpassword === cpassword) {
      axios.post('http://localhost:3001/api/profile/changepassword', { email, oldpassword, newpassword })
        .then(result => {
          console.log(result);
          if (result.data.status === "ok") {
            alert('Password changed successfully');
            Navigate('/Setting');
          } else {
            alert('Sorry, password not changed. Please try again.');
            Navigate('/Setting');
          }
        })
        .catch(err => {
          // console.log(err);
          alert('An error occurred. Please try again later.');
        });
    } else {
      alert('Confirm Password does not match');
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div className="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Change Password
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="oldpassword" className="block mb-2 text-sm font-medium text-gray-900">Old Password</label>
                <input type="password" name="oldpassword" id="oldpassword" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Enter Old Password" required onChange={(e) => setOldpassword(e.target.value)} />
              </div>
              <div>
                <label htmlFor="newpassword" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                <input type="password" name="newpassword" id="newpassword" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Enter New Password" required onChange={(e) => setNewpassword(e.target.value)} />
              </div>
              <div>
                <label htmlFor="cpassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                <input type="password" name="cpassword" id="cpassword" placeholder="Enter Confirm Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" required onChange={(e) => setCpassword(e.target.value)} />
              </div>
              <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">Change Password</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChangePassword;
