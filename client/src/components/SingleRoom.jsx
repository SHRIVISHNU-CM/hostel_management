import React, { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import axios from "axios"
import { userContext } from '../Context/UserContext'
function SingleRoom() {
  const [room, SetRoom] = useState([])
  const { id } = useParams()
  const {userID}  = useContext(userContext)
  const [err , Seterr] = useState("")
  useEffect(() => {
    axios.get(`http://localhost:3001/admin/room/${id}`)
      .then((res) => {
        console.log(res.data.message[0].sharing)
        SetRoom(res.data.message[0])
      })

  }, [])
  //function for bookNow 
  const HandleBookNow = () => {
    
      axios.post(`http://localhost:3001/api/details`,{
        main:userID,
        room_id:id
      })
      .then((res)=>{
        console.log(res)
      })
      .catch((e)=>{
        Seterr(e.response.data)
        console.log(e.response.data)
      })
  }
  return (
    <>
      <div className='card w-[600px] bg-base-200 shadow-xl my-4 mx-4'>
        <figure className='p-2'>
          <img className='w-[200px]' src={room.cloudinary_uri} />
        </figure>
        <div className='card-body'>
          <h1 className='font-semibold text-xl'>Sharing:{room.sharing}</h1>
          <h1 className='font-semibold text-xl'>Availability: {room.availability}</h1>
          <h1 className='font-semibold text-xl'>Price:{room.amount}</h1>
          <h1 className='font-semibold text-xl'>Location: {room.location}</h1>
          <h1 className='font-semibold text-xl'>Country: {room.country}</h1>

          <div>
            <button className='btn btn-active' onClick={HandleBookNow}>Book Now</button>
          </div>
          {err && <h1 className='font-light text-xl text-purple-400'>{err}</h1>}
        </div>

      </div>
    </>
  )
}

export default SingleRoom
