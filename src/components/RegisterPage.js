/**
 * This component have 1 function
 * use useState hook to create two state variables
 * email: user's input email
 * password: user's input password
 * createUserWithEmailAndPassword:The function from Firebase Authentication 
 * that creates an account using the user's inputted email and password.
 * Route:/register
 */



import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const navigate = useNavigate();

    // user's input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
           
            const auth = getAuth();

            // Create an account in Firebase using the user's input for email and password
            const userInfo = await createUserWithEmailAndPassword(auth, email, password);
            const user = userInfo.user;

    

            window.alert('Registration successful!');

            //If Firebase confirms successful registration, navigate to the root page, which is the login interface
            navigate('/');
        } catch (error) {
            console.error('Error registering user:', error.message);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="login-box" style={{ border: '2px solid white', padding: '20px' }}>
                <h2>Register</h2>
                <input type="text" placeholder="Email:" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password:" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
                {/* Invoke Firebase built-in methods only upon the user's click on the register button */}
                <button className="btn" onClick={handleRegister}>Register</button>
            </div>
        </div>
    );
};

export default RegisterForm;
