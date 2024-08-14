import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import axios from "axios"
function SingleRoom() {
  const [room, SetRoom] = useState([])
  const { id } = useParams()
  useEffect(() => {
    axios.get(`http://localhost:3001/admin/room/${id}`)
      .then((res) => {
        console.log(res.data.message[0].sharing)
        SetRoom(res.data.message[0])
      })

  }, [])
  return (
    <>
      <div className='card w-[600px] bg-base-200 shadow-xl'>
        <figure className='p-2'>
          <img src={room.cloudinary_uri} />
        </figure>
        <div className='card-body'>
          <h1 className='font-semibold text-xl'>Sharing:{room.sharing}</h1>
          <h1 className='font-semibold text-xl'>Availability: {room.availability}</h1>
          <div>
            <button className='btn btn-active'>Book Now</button>
          </div>
        </div>

      </div>
    </>
  )
}

export default SingleRoom
