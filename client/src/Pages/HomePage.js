import React from 'react';
import NewsList from '../components/NewsList';
import Categories from '../components/Categories';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

function HomePage() {
  var [category,setCategory] = useState('general');
  var [country,setCountry] = useState('in');
  
  return (
    <>
    <div className="container mx-auto p-4">
      <Navbar item={setCountry} name={country} showCountry={true} />
      <Categories item={setCategory}/>      
      <NewsList category={category}  country={country}/>      
    </div>
      <Footer />
    </>
  );
}

export default HomePage;
