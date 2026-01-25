import { Outlet } from "react-router-dom"

const Layout = () => (
    <div className="layout">
        <header></header>
        <aside></aside>
         <main>
            <Outlet />
        </main>
    </div>
)

export default Layout