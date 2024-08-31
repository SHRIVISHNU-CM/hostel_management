import React, { Suspense, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom'
import Register from './components/Register.jsx'
import Home from './components/Home.jsx'
import Loading from './components/Loading.jsx'

import { userContext } from './Context/UserContext.jsx'


//lazy components

const LazyAllRooms = React.lazy(() => import("./components/AllRooms.jsx"))
const SingleRoom = React.lazy(() => import('./components/SingleRoom.jsx'))
const About = React.lazy(() => import('./components/About.jsx'))
const Contact = React.lazy(() => import('./components/Contact.jsx'))
const UserProfile = React.lazy(() => import('./components/dashboard/UserProfile.jsx'))
const AdminProfile = React.lazy(() => import('./components/dashboard/AdminProfile.jsx'))
const AdminContact = React.lazy(() => import("./components/dashboard/AdminContact.jsx"))
const AddPost = React.lazy(() => import('./components/dashboard/AddPost.jsx'))
const AdminUpdate = React.lazy(() => import('./components/dashboard/AdminUpdate.jsx'))
const UserRegister = React.lazy(() => import("./components/dashboard/UserRegister.jsx"))
const UserDetails = React.lazy(() => import('./components/dashboard/UserDetails.jsx'))
const UserEdit = React.lazy(()=>import('./components/dashboard/UserEdit.jsx'))
const Admin = React.lazy(() => import('./components/signPage/Admin.jsx'))
const Signin = React.lazy(() => import('./components/signPage/Student.jsx'))
const AdminsignUp = React.lazy(() => import('./components/signPage/AdminsignUp.jsx'))
const StudentUp = React.lazy(() => import('./components/signPage/StudentUp.jsx'))
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<App />}>
        <Route path='' element={<Home />} />
        <Route path='about' element={
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>} />
        <Route path='contact' element={
          <Suspense fallback={<Loading />}>
            <Contact />
          </Suspense>} />
        <Route path='userprofile' element={<Suspense fallback={<Loading />}>
          <UserProfile />
        </Suspense>} />
        <Route path='adminprofile' element={<Suspense fallback={<Loading />}>
          <AdminProfile />
        </Suspense>} />
        <Route path='adminContact' element={<Suspense fallback={<Loading />}>
          <AdminContact />
        </Suspense>} />
        <Route path='addPost' element={<Suspense fallback={<Loading />}>
          <AddPost />
        </Suspense>} />
        <Route path='adminupdate/:id' element={<Suspense fallback={<Loading />}>
          <AdminUpdate />
        </Suspense>} />
        <Route path='userRegister' element={<Suspense fallback={<Loading />}>
          <UserRegister />
        </Suspense>} />
        <Route path='userdetails/:id' element={<Suspense fallback={<Loading />}>
          <UserDetails />
        </Suspense>} />
        <Route path='useredit/:id' element={<Suspense fallback={<Loading/>}>
          <UserEdit />
        </Suspense>} />
        <Route path='register' element={<Register />} >
          <Route index element={<Navigate to="admin" replace />} />
          <Route path='admin' element={<Suspense fallback={<Loading/>}>
            <Admin />
          </Suspense>} />
          <Route path='student' element={<Suspense fallback={<Loading/>}>
            <Signin />
          </Suspense>} />
          <Route path='AdminSignup' element={<Suspense>
            <AdminsignUp />
          </Suspense>} />
          <Route path='studentUp' element={<Suspense>
            <StudentUp />
          </Suspense>} />
        </Route>
        <Route path='allrooms' element={
          <Suspense fallback={<Loading />}>
            <LazyAllRooms />
          </Suspense>
        } />
        <Route path='room/:id' element={
          <Suspense fallback={<Loading />}>
            <SingleRoom />
          </Suspense>} />
      </Route>
    </Route>
  )
)



function Root() {
  const [userName, setUserName] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [userID, SetuserID] = useState('')
  const [isloggedIn, setIsloggedIn] = useState(false)
  const [AdminName, SetAdminName] = useState("")
  const [AdminID, SetAdminID] = useState("")
  const [AdminLogin, SetAdminLogin] = useState(false)
  const [acc, setacc] = useState(false)



  const login = (name, password) => {
    setUserName(name)
    setUserPassword(password)
    setIsloggedIn(true)
  }
  const logut = () => {
    setUserName("")
    setUserPassword("")
    setIsloggedIn(false)
    setacc(false)
  }
  const AdminIsLoggin = (name) => {
    SetAdminLogin(true)
    SetAdminName(name)
  }
  const AdminIsLogout = () => {
    SetAdminLogin(false)
    setacc(false)
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
        userID,
        SetuserID,
        AdminName,
        SetAdminName, AdminID, SetAdminID, AdminLogin, SetAdminLogin, AdminIsLoggin, AdminIsLogout, setacc, acc, Account
      }}>
        <RouterProvider router={router} />
      </userContext.Provider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />)
