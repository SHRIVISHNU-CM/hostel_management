import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { userContext } from '../../Context/UserContext'
function AdminProfile() {
  const { AdminID } = useContext(userContext)
  const [data, SetData] = useState({
    name:"",
    password:""
  })
  const GetAPI = `http://localhost:3001/admin/admin/${AdminID}`
  useEffect(() => {
    axios.get(GetAPI)
      .then((res) => {
        console.log(res.data.message)
        SetData({
          ...data,
          name: res.data.message.name,
          password: res.data.message.password
        })
      })
  }, [GetAPI])
  const HandleSubmit = (e) => {
    e.preventDefault()
    try {
      axios.put(`http://localhost:3001/admin/adminupdate/${AdminID}`, data)
        .then((res) => {
          console.log(res)
        })
        .catch(e => console.log(e))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <h1 className='text-xl font-semibold'>HI {data.name}, Welcome..</h1>
      <div className='indicator'>
        <div className='card  w-96 bg-base-200'>
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
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminProfile
