import React from 'react'
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


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<App />}>
        <Route path='' element={<Home/>}/>
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='register' element={<Register />} >
          <Route index element={<Navigate to="admin" replace />} />
          <Route path='admin' element={<Admin />} />
          <Route path='student' element={<Signin />} />
          <Route path='AdminSignup' element={<AdminsignUp />} />
          <Route path='studentUp' element={<StudentUp />} />
        </Route>
        <Route path='allrooms' element={<AllRooms/>}/>
        <Route path='room/:id' element={<SingleRoom/>}/>
      </Route>
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
