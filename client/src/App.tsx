import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Profile from './pages/Profile'
import AllLeaves from './pages/user/AllLeaves'
import ApplyLeave from './pages/user/ApplyLeave'
import AllLeaveAdmin from './pages/admin/AllLeaveAdmin'
// import CheckUserLeave from './pages/admin/CheckUserLeave'

export default function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      {/* USER ROUTES */}
      <Route path="/profile" element={<Profile/>} />
      <Route path="/all-leaves" element={<AllLeaves/>} />
      <Route path="/apply-leave" element={<ApplyLeave/>} />

      {/* ADMIN ROUTES */}
      <Route path="/admin/check-all-leave" element={<AllLeaveAdmin/>} />
      {/* <Route path="/admin/check-all-leave" element={<CheckUserLeave/>} /> */}

      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
    </Routes>
    </>
  )
}
