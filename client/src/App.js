import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import SavePage from './Pages/SavePage';
import Page404 from './Pages/Page404';
import SettingsPage from'./Pages/SettingsPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/Login" element={<LoginPage/>} />        
        <Route exact path="/Register" element={<RegisterPage/>} />
        <Route exact path="/Save" element={<SavePage/>} />
        <Route exact path="/Setting" element={<SettingsPage/>} />
        <Route exact path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
