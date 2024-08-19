import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { userContext } from '../../Context/UserContext'
import AdminRooms from './AdminRooms'
import { RiDeleteBin2Fill } from "react-icons/ri";


function AdminProfile() {
  const { AdminID } = useContext(userContext)
  const [details, SetDetails] = useState([])
  const [data, SetData] = useState({
    name: "",
    password: ""
  })
  const GetAPI = `http://localhost:3001/admin/admin/${AdminID}`
  const adminUpdate = `http://localhost:3001/admin/adminupdate/${AdminID}`
  useEffect(() => {
    axios.get(GetAPI)
      .then((res) => {
        console.log(res.data.message.adminPic)
        console.log(res.data.message)
        SetDetails(res.data.message.adminPic)
        SetData({
          ...data,
          name: res.data.message.name,
          password: res.data.message.password
        })
      })
      .catch(e => console.log(e))
  }, [GetAPI])
  const HandleSubmit = (e) => {
    e.preventDefault()
    try {
      axios.put(adminUpdate, data)
        .then((res) => {
          console.log(res)
        })
        .catch(e => console.log(e))
    } catch (error) {
      console.log(error)
    }
  }
  const handleDrop = () => {
    try {
      axios.delete(`http://localhost:3001/admin/admindelete/${AdminID}`)
      .then(res=>console.log(res))
      
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <h1 className='text-xl font-semibold'>HI {data.name}, Welcome..</h1>
      <div className='flex md:flex-col md:justify-center  lg:flex-row lg:justify-around '>
        <div className='indicator my-11'>
          <div className='card h-min w-96 bg-base-200'>
            <div className='card-body'>
              <form onSubmit={HandleSubmit}>
                <label className='input input-bordered input-primary flex items-center gap-x-2 my-2'>
                  Admin Name:
                  <input
                    value={data.name}
                    onChange={e => SetData({ ...data, name: e.target.value })}
                  />
                </label>
                <label className='input input-bordered input-secondary flex items-center gap-x-2 my-2'>
                  Password :
                  <input
                    value={data.password}
                    onChange={e => SetData({ ...data, password: e.target.value })}
                  />
                </label>
                <div className='indicator-item indicator-bottom'>
                  <button
                    type='submit'
                    className='btn btn-warning'>Reset</button>
                </div>
              </form>
              <div className='card-actions justify-start'>
                <RiDeleteBin2Fill
                  title='Close this account'
                  onClick={handleDrop}
                  className=' text-red-700 text-2xl hover:text-red-400' />
              </div>
            </div>
          </div>
        </div>
        <div className='  w-[450px] lg:w-[600px] h-[80vh] overflow-scroll border overflow-x-hidden relative  right-4'>
          <h1 className='font-semibold text-yellow-700 text-2xl px-4 py-8'>Recent Post</h1>
          <AdminRooms details={details} />
        </div>
      </div>

    </>
  )
}

export default AdminProfile
