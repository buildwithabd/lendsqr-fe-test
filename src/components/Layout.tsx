import { Outlet } from "react-router-dom";

import './Layout.scss';
import Logo from '../assets/logo.svg';


const Layout = () => (
    <div className="layout">
        <header>
            <div>
                <img src={Logo} alt="Lendsqr Logo" className="login-logo" />
                <input type="search" id="site-search" name="q" placeholder="Search for anything" />
            </div>
        </header>
        <aside></aside>
         <main>
            <Outlet />
        </main>
    </div>
)

export default Layout