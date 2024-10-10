import { useState } from 'react'
import './sidebar.css'
function Sidebar() {
    return (
        <div>
            <nav class="navbar">
                <div class="logo_item">
                    <i class="bx bx-menu" id="sidebarOpen"></i>
                    <img src="images/logo.png" alt="" /><i />CodingNepal
                </div>

                <div class="search_bar">
                    <input type="text" placeholder="Search" />
                </div>

                <div class="navbar_content">
                    <i class="bi bi-grid"></i>
                    <i class='bx bx-sun' id="darkLight"></i>
                    <i class='bx bx-bell' ></i>
                    <img src="images/profile.jpg" alt="" class="profile" />
                </div>
            </nav>

            <nav class="sidebar">
                <div class="menu_content">
                    <ul class="menu_items">
                        <div class="menu_title menu_dahsboard"></div>

                        <li class="item">
                            <div href="#" class="nav_link submenu_item">
                                <span class="navlink_icon">
                                    <i class="bx bx-home-alt"></i>
                                </span>
                                <span class="navlink">Home</span>
                                <i class="bx bx-chevron-right arrow-left"></i>
                            </div>

                            <ul class="menu_items submenu">
                                <a href="#" class="nav_link sublink">Nav Sub Link</a>
                                <a href="#" class="nav_link sublink">Nav Sub Link</a>
                                <a href="#" class="nav_link sublink">Nav Sub Link</a>
                                <a href="#" class="nav_link sublink">Nav Sub Link</a>
                            </ul>
                        </li>
                        <li class="item">
                            <div href="#" class="nav_link submenu_item">
                                <span class="navlink_icon">
                                    <i class="bx bx-grid-alt"></i>
                                </span>
                                <span class="navlink">Overview</span>
                                <i class="bx bx-chevron-right arrow-left"></i>
                            </div>

                            <ul class="menu_items submenu">
                                <a href="#" class="nav_link sublink">Nav Sub Link</a>
                                <a href="#" class="nav_link sublink">Nav Sub Link</a>
                                <a href="#" class="nav_link sublink">Nav Sub Link</a>
                                <a href="#" class="nav_link sublink">Nav Sub Link</a>
                            </ul>
                        </li>
                    </ul>

                    <ul class="menu_items">
                        <div class="menu_title menu_editor"></div>
                        <li class="item">
                            <a href="#" class="nav_link">
                                <span class="navlink_icon">
                                    <i class="bx bxs-magic-wand"></i>
                                </span>
                                <span class="navlink">Magic build</span>
                            </a>
                        </li>

                        <li class="item">
                            <a href="#" class="nav_link">
                                <span class="navlink_icon">
                                    <i class="bx bx-loader-circle"></i>
                                </span>
                                <span class="navlink">Filters</span>
                            </a>
                        </li>
                        <li class="item">
                            <a href="#" class="nav_link">
                                <span class="navlink_icon">
                                    <i class="bx bx-filter"></i>
                                </span>
                                <span class="navlink">Filter</span>
                            </a>
                        </li>
                        <li class="item">
                            <a href="#" class="nav_link">
                                <span class="navlink_icon">
                                    <i class="bx bx-cloud-upload"></i>
                                </span>
                                <span class="navlink">Upload new</span>
                            </a>
                        </li>
                    </ul>
                    <ul class="menu_items">
                        <div class="menu_title menu_setting"></div>
                        <li class="item">
                            <a href="#" class="nav_link">
                                <span class="navlink_icon">
                                    <i class="bx bx-flag"></i>
                                </span>
                                <span class="navlink">Notice board</span>
                            </a>
                        </li>
                        <li class="item">
                            <a href="#" class="nav_link">
                                <span class="navlink_icon">
                                    <i class="bx bx-medal"></i>
                                </span>
                                <span class="navlink">Award</span>
                            </a>
                        </li>
                        <li class="item">
                            <a href="#" class="nav_link">
                                <span class="navlink_icon">
                                    <i class="bx bx-cog"></i>
                                </span>
                                <span class="navlink">Setting</span>
                            </a>
                        </li>
                        <li class="item">
                            <a href="#" class="nav_link">
                                <span class="navlink_icon">
                                    <i class="bx bx-layer"></i>
                                </span>
                                <span class="navlink">Features</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar
