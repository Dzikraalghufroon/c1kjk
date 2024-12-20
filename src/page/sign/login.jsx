import React, { useState, useEffect } from 'react';
import './loginForm.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const [nama, setnama] = useState('');
    const [pass, setPass] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const fetchRedirect = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/validation/checked`, { withCredentials: true });
                if (response.data.stat === true) {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchRedirect();
    }, []);

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/validation/login`, {
                nama,
                pass
            }, { withCredentials: true });

            if (response.data.stat === true) {
                setMessage('Sign-Up successful!');
                setSuccess(true);
                navigate('/');
            } else {
                setMessage(response.data.message);
                setSuccess(false);
            }
        } catch (error) {
            console.error('Sign-in failed:', error);
            setMessage('Sign-in failed. Please try again.');
            setSuccess(false);
        }
    };

    return (
        <div className='login'>
            <div className="login-container">
                <div className="login-title">Login</div>
                <div className="login-content">
                    <form onSubmit={handleSignIn}>
                        <div className="login-user-details">
                            <div className="login-input-box">
                                <span className="login-details">Nick name</span>
                                <input
                                    type="text"
                                    placeholder="Enter your nickname"
                                    value={nama}
                                    onChange={(e) => setnama(e.target.value)}
                                    className='input-text'
                                    required
                                />
                            </div>
                            <div className="login-input-box">
                                <span className="login-details">Password</span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                    className='input-pass'
                                    required
                                />
                                <button
                                    type="button"
                                    className="input-button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        <div className="button">
                            <input type="submit" value="login" />
                        </div>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
