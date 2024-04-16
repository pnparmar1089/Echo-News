import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faBookmark, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Navbar = (props) => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const checkAuth = () => {
    axios.get('http://localhost:3001/api/auth/checkAuth', {
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
    .then(result => {
      if (result.data.status === 'ok') {
        setName(result.data.name);
        setAuth(true);
      }
    })
    // .catch(err => console.log(err));
  };

  checkAuth();

  const handleLogout = () => {
    axios.get('http://localhost:3001/api/auth/deletAuth', {
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
    .then(result => {
      if (result.data.status === 'ok') {
        setAuth(false);
        localStorage.removeItem('token');
        navigate('/');
      }
    })
    .catch(err => console.log(err));
  };

  
  const [isOpenUser, setIsOpenUser] = useState(false);
  const toggleUserMenu = () => {
    setIsOpenUser(!isOpenUser);
  };
  
 



  const [isOpenCountry, setIsOpenCountry] = useState(false);
  const toggleCountryMenu = () => {
    setIsOpenCountry(!isOpenCountry);
  };
  
  return (
    <nav className="bg-white fixed w-full z-20 top-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="text-2xl font-semibold whitespace-nowrap">
          Echo News
        </Link>
        
        <div className="flex md:order-2 space-x-3 md:space-x-0">
          {auth ? ( 
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="px-4 py-2 text-gray-700 rounded-lg focus:outline-none focus:ring"
              >
                {name.toUpperCase()} <FontAwesomeIcon className="self-center" icon={faAngleDown} />
              </button>
              {isOpenUser && (
                <div className="absolute z-10 right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg">
                  <ul className="py-2">
                    <li>
                      <Link to="/Setting" className="block px-4 py-2 hover:bg-gray-100"> <FontAwesomeIcon icon={faGear} /> Setting</Link>
                    </li>
                    <li>
                      <Link to="/Save" className="block px-4 py-2 hover:bg-gray-100"><FontAwesomeIcon icon={faBookmark} /> Save</Link>
                    </li>
                    <li>
                      <Link
                        onClick={handleLogout}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faRightFromBracket} /> Log out
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/Login"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              Log In
            </Link>
          )}
          {props.showCountry  && (
          <div className="relative">
            <button
              onClick={toggleCountryMenu}
              className="px-4 py-2 text-gray-700 rounded-lg focus:outline-none focus:ring"
            >
              {props.name}
              <FontAwesomeIcon className="self-center" icon={faAngleDown} />
            </button> 
            {isOpenCountry && (
              <div className="absolute z-10 right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg">
                <ul className="py-2">
                  <li><button onClick={() => props.item('in')}>India</button></li>
                  <li><button onClick={() => props.item('jp')}>Japan</button></li>
                  <li><button onClick={() => props.item('us')}>United States</button></li>
                </ul>
              </div>
            )}
          </div>
          )}
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <div className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
