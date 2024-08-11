import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../Context/UserContext'
import axios from 'axios'
import { RiDeleteBin2Fill } from "react-icons/ri";


function UserProfile() {
  const { userID } = useContext(userContext)
  const [info, setInfo] = useState("")
  const findOne = `http://localhost:3001/api/oneuser/${userID}`
  useEffect(() => {
    axios.get(findOne)
      .then((res) => {
        console.log(res.data.message)
        setInfo(res.data.message)
      })
  }, [])
  return (
    <>
      <div className='card bg-base-200 w-[500px]'>
        <div className='card-body'>
          <h1 className='font-semibold text-xl text-orange-600'>User Information</h1>
          <h1 className='card-title'>{info.name}</h1>
          <h1>
            <span className='font-light text-lg text-slate-600'>Password:</span>{info.password}
          </h1>
          <h1>
            <span className='font-light text-lg text-slate-600'>Type:</span>{info.UserType}
          </h1>
          <div className='card-actions justify-end'>
            <RiDeleteBin2Fill title='Close this account' className=' text-red-700 text-2xl hover:text-red-400'/>
          </div>
        </div>

      </div>
    </>
  )
}

export default UserProfile
