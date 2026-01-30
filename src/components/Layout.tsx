import { Outlet } from "react-router-dom";

import './Layout.scss';
import Logo from '../assets/logo.svg';


const Layout = () => (
    <div className="layout">
        <header>
            <div className="header-left">
                <img src={Logo} alt="Lendsqr Logo" className="login-logo" />
                <div className="search">
                    <input className="search-input" type="search" id="site-search" name="q" placeholder="Search for anything" />
                    <div className="search-icon"></div>
                </div>
            </div>
        </header>
        <aside></aside>
         <main>
            <Outlet />
        </main>
    </div>
)

export default Layout