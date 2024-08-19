import React, { Suspense, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Register from './components/Register.jsx'
import Admin from './components/signPage/Admin.jsx'
import Signin from './components/signPage/Student.jsx'
import AdminsignUp from './components/signPage/AdminsignUp.jsx'
import StudentUp from './components/signPage/StudentUp.jsx'
import Home from './components/Home.jsx'
import AllRooms from './components/AllRooms.jsx'
import SingleRoom from './components/SingleRoom.jsx'
import Loading from './components/Loading.jsx'
import AdminContact from "./components/dashboard/AdminContact.jsx"
import UserRegister from "./components/dashboard/UserRegister.jsx"

import { userContext } from './Context/UserContext.jsx'
import UserProfile from './components/dashboard/UserProfile.jsx'
import AddPost from './components/dashboard/AddPost.jsx'
import AdminProfile from './components/dashboard/AdminProfile.jsx'
import AdminUpdate from './components/dashboard/AdminUpdate.jsx'
import UserDetails from './components/dashboard/UserDetails.jsx'


//lazy components

const LazyAllRooms = React.lazy(() => import("./components/AllRooms.jsx"))
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<App />}>
        <Route path='' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='userprofile' element={<UserProfile />} />
        <Route path='adminprofile' element={<AdminProfile/>}/>
        <Route path='adminContact' element={<AdminContact/>}/>
        <Route path='addPost' element={<AddPost/>}/>
        <Route path='adminupdate/:id' element={<AdminUpdate/>}/>
        <Route path='userRegister' element={<UserRegister/>}/>
        <Route path='userdetails/:id' element={<UserDetails/>}/>
        <Route path='register' element={<Register />} >
          <Route index element={<Navigate to="admin" replace />} />
          <Route path='admin' element={<Admin />} />
          <Route path='student' element={<Signin />} />
          <Route path='AdminSignup' element={<AdminsignUp />} />
          <Route path='studentUp' element={<StudentUp />} />
        </Route>
        <Route path='allrooms' element={
          <Suspense fallback={<Loading />}>
            <LazyAllRooms />
          </Suspense>
        } />
        <Route path='room/:id' element={<SingleRoom />} />
      </Route>
    </Route>
  )
)



function Root() {
  const [userName, setUserName] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [userID, SetuserID] = useState('')
  const [isloggedIn, setIsloggedIn] = useState(false)
  const [AdminName,SetAdminName] = useState("")
  const [AdminID, SetAdminID] = useState("")
  const [AdminLogin ,SetAdminLogin] = useState(false)
  const [acc,setacc]  = useState(false)


  const login = (name, password) => {
    setUserName(name)
    setUserPassword(password)
    setIsloggedIn(true)
  }
  const logut = () => {
    setUserName("")
    setUserPassword("")
    setIsloggedIn(false)
  }
  const AdminIsLoggin = (name) =>{
    SetAdminLogin(true)
    SetAdminName(name)
  }
  const AdminIsLogout  = () => {
    SetAdminLogin(false)
    SetAdminName("")
  }
  const Account = () => {
    setacc(true)
  }

  return (
    <React.StrictMode>
      <userContext.Provider value={{
        userName, 
        setUserName, 
        userPassword, 
        setUserPassword, 
        login, 
        logut, 
        isloggedIn,
        userID , 
        SetuserID,
        AdminName,
        SetAdminName,AdminID, SetAdminID,AdminLogin ,SetAdminLogin,AdminIsLoggin,AdminIsLogout,setacc,acc,Account
      }}>
        <RouterProvider router={router} />
      </userContext.Provider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />)
