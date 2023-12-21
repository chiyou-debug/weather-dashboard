import { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import './LoginPage.css';

const BackgroundImage = () => {
  const [imageUrl, setImageUrl] = useState('');

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
            filter: 'blur(50px)', // 图片模糊化
          }}
        />
      )}
    </div>
  );
};

const LoginPage = () => {
    const navigate = useNavigate();
  
    const handleRegisterClick = () => {
      navigate('/register');
    };
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      try {
        const auth = getAuth();
  
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        console.log('User logged in:', user);
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
            {/* 关联输入框的值和状态 */}
            <input type="text" placeholder="Email:" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password:" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="btn" onClick={handleLogin}>
              Login
            </button>
            <button className="btn" onClick={handleRegisterClick}>
              Register
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default LoginPage;
  