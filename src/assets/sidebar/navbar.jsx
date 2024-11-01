import React, { useEffect, useState } from 'react';
import './sidebar.css';
import { useNavigate } from 'react-router-dom';
import home from './home.png'
import profile from './profile.png'
import setting from './setting.png'
import search from './search.png'
import axios from 'axios';
// import SearchNavigateFunction from '../search/search';

const Navbar = () => {
    const navigate = useNavigate();
    const [isSidebarClosed, setIsSidebarClosed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [input, setinput] = useState(null);
    useEffect(() => {
        const toggleSidebar = () => {
            setIsSidebarClosed(!isSidebarClosed);
        };

        const toggleDarkMode = () => {
            setIsDarkMode(!isDarkMode);
        };

        // Cleanup event listeners on component unmount
        return () => {
            // Nothing to cleanup for now
        };
    }, [isSidebarClosed, isDarkMode]);
    // const SearchNavigateFunction = async(e) => {
    //     e.preventDefault();
    //     // navigate("/")
    //     navigate(`/result?search=${input}`)
    // }
    const SearchNavigateFunction = async (e) => {
        // e.preventDefault();  
        if (input.trim() !== "") {
            // e.preventDefault();  
            // navigate(`/result?search=${input}`);
            navigate(`/search/${input}`)
            // e.preventDefault(); s 
        }
    };
    return (
        <>
            <div className="navbar-animmenu">
                <ul className="show-dropdown main-navbar">
                    <div className="hori-selector">
                        <div className="left"></div>
                        <div className="right"></div>
                    </div>
                    <li>
                        <a onClick={() => navigate("/admin-profil")}>
                            <i className="fas fa-tachometer-alt"></i>Hello world
                        </a>
                    </li>
                    <li className="active">
                        <a onClick={() => navigate("/admin-profil")}>
                            <i className="far fa-address-book"></i>Address Book
                        </a>
                    </li>
                    <li className='search-input'>
                        <div>
                            <form onSubmit={SearchNavigateFunction} method='get'>
                                <input 
                                type="text" 
                                placeholder='     search ' 
                                value={input}
                                onChange={(e) => setinput(e.target.value)}
                                />
                                <button type="submit"><img src={search} alt="" /></button>
                            </form>
                        </div>
                    </li>

                </ul>
            </div>

            <nav className={`sidebar ${isSidebarClosed ? 'close' : ''}`}>
                <header>
                    <div className="image-text">
                        <span className="image"></span>
                        <div className="text logo-text">
                            <span className="name">Hello</span>
                            <span className="profession">World</span>
                        </div>
                    </div>
                    <i
                        className="bx bx-chevron-right toggle"
                        onClick={() => setIsSidebarClosed(!isSidebarClosed)}
                    >C</i>
                </header>

                <div className="menu-bar">
                    <div className="menu">
                        <ul className="menu-links">
                            <li className="nav-link">
                                <a onClick={(() => navigate("/"))}>
                                    <i className="bx bx-home-alt icon"></i>
                                    <span className="text nav-text">Beranda</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a onClick={(() => navigate('/profile'))}>
                                    <i className="bx bx-bar-chart-alt-2 icon"></i>
                                    <span className="text nav-text">Akun</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a onClick={(() => navigate("/setting"))}>
                                    <i className="bx bx-heart icon"></i>
                                    <span className="text nav-text">Setting</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a onClick={(() => navigate(-1))}>
                                    <i className="bx bx-bar-chart-alt-2 icon"></i>
                                    <span className="text nav-text">Kembali</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a onClick={(() => navigate(-1))}>
                                    <i className="bx bx-bar-chart-alt-2 icon"></i>
                                    <span className="text nav-text">Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className='footer'>
                <ul>
                    <li><a href=""><img src={home} alt="" /></a></li>
                    <li><a href=""><img src={profile} alt="" /></a></li>
                    <li><a href=""><img src={setting} alt="" /></a></li>
                    <li><a href=""><img src={search} alt="" /></a></li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;
