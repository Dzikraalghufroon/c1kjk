import React, { useState, useEffect } from 'react';
import './RegistrationForm.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegistrationForm = () => {
    const [nama, setNama] = useState('');
    const [pass, setPass] = useState('');
    const [gender, setGender] = useState('');
    const [room, setRoom] = useState('');
    const [kelas, setKelas] = useState('');
    const [asrama, setAsrama] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

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
            const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/validation/sign`, {
                nama,
                pass,
                gender,
                room,
                kelas,
                asrama
            }, { withCredentials: true });

            if (response.data.stat === true) {
                setMessage('Sign-Up successful!');
                setSuccess(true);
                navigate('/login');
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
        <div className="container">
            <div className="title">Registration</div>
            <div className="content">
                <form onSubmit={handleSignIn}>
                    <div className="user-details">
                        <div className="input-box">
                            <span className="details">Full Name</span>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">Password</span>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">Room</span>
                            <input
                                type="text"
                                placeholder="Enter your room"
                                value={room}
                                onChange={(e) => setRoom(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">Kelas</span>
                            <select
                                value={kelas}
                                onChange={(e) => setKelas(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select your class</option>
                                <option value="10.A">10.A</option>
                                <option value="11.B">11.B</option>
                                <option value="12.A">12.A</option>
                                <option value="12.B">12.B</option>
                            </select>
                        </div>
                        <div className="input-box">
                            <span className="details">Asrama</span>
                            <input
                                type="text"
                                placeholder="Enter your dormitory"
                                value={asrama}
                                onChange={(e) => setAsrama(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">Gender</span>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select your gender</option>
                                <option value="laki-laki">Male</option>
                                <option value="perempuan">Female</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                        </div>
                    </div>

                    <div className="button">
                        <input type="submit" value="Register" />
                    </div>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default RegistrationForm;
