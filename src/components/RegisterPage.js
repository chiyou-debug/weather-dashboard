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
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log('User registered:', user);

            window.alert('Registration successful!');
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
