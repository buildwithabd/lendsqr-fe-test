import { Outlet } from "react-router-dom";

import './Layout.scss';
import Logo from '../../assets/logo.svg';
import SearchIcon from '../../assets/search-icon.svg';
import NotificationIcon from '../../assets/notification-icon.svg';
import Avatar from '../../assets/avatar.svg';
import DropdownIcon from '../../assets/dropdown-icon.svg';
import { sidebarNav } from "../../data/sidebarNav.ts";


const Layout = () => (
    <div className="layout">
        <header>
            <div className="header-left">
                <img src={Logo} alt="Lendsqr Logo" className="login-logo" />
                <div className="search">
                    <input className="search-input" type="search" id="site-search" name="q" placeholder="Search for anything" />
                    <div className="search-icon">
                        <img  src={SearchIcon} alt="search" />
                    </div>
                </div>
            </div>
            <div className="header-right">
                <a href="" className="docs">Docs</a>
                <img src={NotificationIcon} alt="Notifications" />
                <div className="user-menu">
                    <div className="avatar">
                        <img src={Avatar} alt="pfp" />
                    </div>
                    <h3 className="username">Adedeji</h3>
                    <div className="dropdown">
                        <img src={DropdownIcon} alt="dropdown" />
                    </div>
                </div>
            </div>
        </header>
        <div className="content">
            <aside>
                <div className="nav-link so-container">
                    <img src="/layouts/briefcase.svg" alt="switch organization" />
                    <h4>Switch Organization</h4>
                    <img src="/layouts/arrow-down.svg" alt="open dropdown" />
                </div>

                <div className="nav-link dashboard">
                    <img src="/layouts/home.svg" alt="dashboard" />
                    <h4>Dashboard</h4>
                </div>

                {sidebarNav.map((section) => (
                    <div key={section.title} className="nav-section">
                        <p className="nav-title">{section.title}</p>

                        {section.items.map((item) => (
                        <div key={item.label} className="nav-link">
                            <img src={item.icon} alt={item.label} />
                            <h4>{item.label}</h4>
                        </div>
                        ))}
                    </div>
                ))}

                <div className="nav-footer">
                    <div className="logout">
                        <img src="/layouts/sign-out.svg" alt="sign-out" />
                        <h4>Logout</h4>
                    </div>
                    <p>v1.2.0</p>
                </div>
            </aside>
            <main>
                <Outlet />
            </main>
        </div>
    </div>
)

export default Layout