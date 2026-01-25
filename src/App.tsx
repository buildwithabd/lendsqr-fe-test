import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.scss'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import UserDetails from './pages/UserDetails'
import Layout from './components/Layout'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
