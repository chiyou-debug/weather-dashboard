/**
 * Route: /mainpage
 * This is our main page. On this page, we can see a map and a dashboard.
 * 1. We use google map API to get a map, retrieve the city names and coordinates
 * I've stored in the Firestore database and mark them on the map.
 * 2.I've made some layout designs to showcase both the map and the dashboard.
 * Consequently, I've removed the original dashboard route
 */


import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import WeatherDashboard from './WeatherDashboard';
import './mainPage.css';

const GoogleMap = () => {
  const [searchText, setSearchText] = useState('');
  const [map, setMap] = useState(null);


  const Func_logout = () => {

    //put current page into root view which is login page
    window.location.href = '/'; 
  };

  useEffect(() => {
    //our default data, we use latitute and longitute to set a mark on google map.
    const dublin = { lat: 53.349805, lng: -6.26031 };

    //The focal point is Dublin.
    const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
      center: dublin,
      zoom: 12,
    });

    setMap(mapInstance);

    new window.google.maps.Marker({
      position: dublin,
      map: mapInstance,
      title: "Dublin"
    });
  }, []);

  const handleSearchButtonClick = async () => {
    const db = getFirestore();

    /*In my database, their is a map named locationData, 
    **it has three elements. city(name of the city), lat(latitute),long(longitute)
    **we can use these three elements to find this city's location on google map and mark it.
    */
    const dbRef = collection(db, 'locationData');

    //firestore search function, match user's input with the database's data.
    const q = query(dbRef, where('city', '==', searchText));
    
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const city = doc.data();

        //find position
        const position = { lat: city.lat, lng: city.lng };

        if (map) {
          new window.google.maps.Marker({
            position,
            map,
            title: city.city,
          });
          
          map.setCenter(position);
        }
      });
    } catch (error) {
      console.error('Error fetching documents: ', error);
    }
  };

  // these page , i seperate it into two parts, Top and bottom. in the bottom part , i seperate it into two parts.
  //left part is google map which be got by api, right part is a dashboard.
  return (
  
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column' }}>
     {/*Top part*/}
      <div className="top-section" style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Weather Dashboard</h1>
        <div className="logout-button" style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <button onClick={Func_logout}>Logout</button>
        </div>
        <div className='search-box' style={{ marginTop: '10px' }}>
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={handleSearchButtonClick}>Search</button>
        </div>
      </div>

      {/* Bottom part */}
      <div className="bottom-section" style={{ display: 'flex', width: '100%', height: 'calc(100vh - 70px)' }}>
        {/* left part */}
        <div className="map-container" style={{ width: '60%', height: '100%' }}>
          <div id="map" style={{ height: '100%', width: '100%' }}></div>
        </div>
        
        {/* right part */}
        <div className="dashboard-container" style={{ width: '40%', height: '100%' }}>


        {/*Parent-Child. put user's input as a prop, and transit it into WeatherDashBoard*/}
          <WeatherDashboard location={searchText} />
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;