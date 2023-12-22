import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WeatherDashboard from './components/WeatherDashboard';
import GoogleMap from './components/WeatherMainPage';
import LoginPage from './components/LoginPage';
import RegisterForm from './components/RegisterPage';
import { initializeApp } from 'firebase/app';
import { getStorage, ref } from 'firebase/storage';

// Firebase initialize
const firebaseConfig = {
  apiKey: "AIzaSyCuy1FLQqyVRCJcONvphjToQFS9xkPCbV8",
    authDomain: "weatherdashboard-62db2.firebaseapp.com",
    projectId: "weatherdashboard-62db2",
    storageBucket: "weatherdashboard-62db2.appspot.com",
    messagingSenderId: "734500562791",
    appId: "1:734500562791:web:1f5eda40ba7fb4dd46b1c2",
    measurementId: "G-KXDR4KSJ5X"
};

initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const storageRef = ref(storage, 'image/login_background.jpg');

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />  {/**Login page, first show */}
          <Route path="/register" element={<RegisterForm />} /> {/**register page*/}
          <Route path="/mainpage" element={<GoogleMap />}/>{/**mainpage, show everything */}
          <Route path="/map" element={<WeatherDashboard />}/> {/**useless now. */}
          
          </Routes>
      </Router>
    </div>
  );
}

export default App;
