/**
 * Route: root (/)
 * check user's input, if the email and password is true, route the mainpage. 
 */


import { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import './LoginPage.css';

const BackgroundImage = () => {
  const [imageUrl, setImageUrl] = useState('');

  //use useEffect hook to create a reference. we can get url from firebase storage.
  useEffect(() => {
    const storageRef = ref(getStorage(), 'image/login_background.jpg');

    getDownloadURL(storageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.error('Cannot find the image', error);
      });
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(50px)', 
          }}
        />
      )}
    </div>
  );
};

const LoginPage = () => {
    const navigate = useNavigate();
  
    //Listen for user click events, and if the user clicks on 'register,' navigate to the register page
    const handleRegisterClick = () => {
      navigate('/register');
    };
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    //Asynchronous operation that checks in Firebase whether there's a match with the user-inputted email and password
    const handleLogin = async () => {
      try {
        const auth = getAuth();
  
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        console.log('User logged in:', user);

       
        //Upon successful login, navigate to our main page.
        navigate('/mainpage');
      } catch (error) {
        console.error('Error logging in:', error.message);
        window.alert('用户名或密码错误');
      }
    };
  
    return (
      <div className="background" style={{ position: 'relative' }}>
        <BackgroundImage />
  
        <div
          className="login-box"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '1',
          }}
        >
          <div className="login-box" style={{ border: '2px solid white', padding: '20px' }}>
            <h2>Login</h2>

            <input type="text" placeholder="Email:" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password:" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="btn" onClick={handleLogin}>Login</button>
            <button className="btn" onClick={handleRegisterClick}>
              Register
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default LoginPage;
  