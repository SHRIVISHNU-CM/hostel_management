import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../Context/UserContext'
import axios from 'axios'
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BiSolidLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom"
import { FaArrowCircleRight } from "react-icons/fa";

function UserProfile() {
  const { userID, logut } = useContext(userContext)
  const [info, setInfo] = useState("")
  const [meg, SetMeg] = useState("")
  const [room, setRoom] = useState([])
  const [roomDetails, setRoomDetails] = useState([])
  const [details, setDetails] = useState(false)
  const navigate = useNavigate()
  const findOne = `http://localhost:3001/api/oneuser/${userID}`

  useEffect(() => {
    axios.get(findOne)
      .then((res) => {
        console.log(res.data.message)
        setRoom(res.data.message.rooms)
        setInfo(res.data.message)
      })
      .catch((e) => {
        console.log(e)
        SetMeg(`${e.message}"Please Go to login page"`)
      })
  }, [userID])

  const HandleDelete = () => {
    axios.delete(`http://localhost:3001/api/delete/${userID}`)
      .then((res) => {
        console.log(res)
      })
      .catch(e => {
        console.log(e.message)
      })
  }

  const handleLogout = () => {
    axios.get('http://localhost:3001/api/logout',{withCredentials:true})
      .then((res) => {
        console.log(res)
        navigate('/register')
        logut()
      })

  }

  const ShowDetails = async () => {
    if (!details) {
      try {
        const details = await Promise.all(
          room.map((el) =>
            axios.get(`http://localhost:3001/admin/room/${el.room_id}`)
              .then((res) => res.data.message)
          )
        );
        console.log(details);
        setRoomDetails(details.flat());
      } catch (error) {
        console.log(error)
      }
    }
    setDetails(!details)
  }
  const HandleRoomDelete = async (RoomID) => {
    console.log(RoomID)
    try {
      await axios.delete(`http://localhost:3001/api/delete/details/${RoomID}`)
        .then((res) => {
          console.log(res)
        })
        .catch(e => console.log(e))
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      {meg && <p className='font-semibold'> {meg}</p>}
      <div className='flex justify-center my-12'>
        <div className='card bg-base-200 w-[500px]'>
          <div className='card-body'>
            <h1 className='font-semibold text-xl text-orange-600'>User Information</h1>
            <h1 className='card-title'>{info.name}</h1>
            {/* <h1>
              <span className='font-light text-lg text-slate-600'>Password:</span>{info.password}
            </h1> */}
            <h1>
              <span className='font-light text-lg text-slate-600'>Type:</span>{info.UserType}
            </h1>
            <div className='card-actions justify-end'>
              <RiDeleteBin2Fill
                title='Close this account'
                onClick={HandleDelete}
                className=' text-red-700 text-2xl hover:text-red-400' />
              <BiSolidLogOut
                title='Logout'
                onClick={handleLogout}
                className=' text-2xl text-green-600 hover:text-green-400'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-x-3'>
        <h1 className='font-semibold text-xl text-orange-600'>Registered status:</h1>
        <button className='btn btn-success' onClick={ShowDetails}>{details ? "Hide" : "Status"}</button>
      </div>
      {!details ? (
        null
      ) : (
        <div className='flex justify-center flex-col items-center gap-y-6'>
          {roomDetails.map((el, i) => (
            <div className='card w-[500px] bg-base-200' key={i}>
              <div className='card-body'>
                <h1 className='card-title'>Register Details</h1>
                <div className='flex items-center justify-around'>
                  <figure className='border border-green-600 h-20 w-24'>
                    <img src={el.cloudinary_uri} className='h-20' />

                  </figure>
                  <div>
                    <h1>Sharing: {el.sharing}</h1>
                    <h1>Availability : {el.availability}</h1>
                  </div>
                </div>

                <div className='card-actions justify-end'>
                  <Link to={`/room/${el._id}`}>
                    <FaArrowCircleRight
                      className=' text-2xl text-purple-700 hover:text-purple-400'
                    />
                  </Link>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default UserProfile