import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowCircleRight } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";


function AdminRooms({ details }) {
    const [rooms, SetRooms] = useState([])
    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomData = await Promise.all(details.map(async (e) => {
                    const res = await axios.get(`http://localhost:3001/admin/room/${e}`)

                    return res.data.message

                }))
                const flattenedRoomData = roomData.flat();

                SetRooms(flattenedRoomData);
                console.log(flattenedRoomData);

            } catch (error) {
                console.log(error)
            }
        }
        fetchRoom()
    }, [details])
    const HandleDelete = (el) => {
        try {
            axios.delete(`http://localhost:3001/admin/deleteDB/${el._id}`)

                .then((res) => {
                    console.log(res)
                    SetRooms((prev) => prev.filter(room => room._id !== el._id))
                })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div className='px-5 py-3'>
                {
                    rooms.map((el, i) => {
                        return (
                            <div className='card w-[500px] bg-base-200 my-3' key={i} >
                                <div className='card-body'>
                                    <h1 className='card-title'>Register Details</h1>
                                    <div className='flex items-center justify-around'>
                                        <figure className='border border-green-600 h-20 w-24'>
                                            <img src={el.cloudinary_uri} className='h-20' />

                                        </figure>
                                        <div>
                                            <h1>Sharing: {el.sharing}</h1>
                                            <h1>Availability : {el.availability}</h1>
                                            <h1>Price:{el.amount}/month</h1>
                                        </div>
                                    </div>

                                    <div className='card-actions justify-end'>
                                        <Link to={`/adminupdate/${el._id}`}>
                                            <FaEdit
                                                className='text-2xl text-green-700 hover:text-green-300'

                                            />
                                        </Link>
                                        <Link to={`/room/${el._id}`}>
                                            <FaArrowCircleRight
                                                className=' text-2xl text-purple-700 hover:text-purple-400'
                                            />
                                        </Link>
                                        <RiDeleteBin2Fill
                                            title='Close this account'
                                            onClick={() => HandleDelete(el)}
                                            className=' text-red-700 text-2xl hover:text-red-400' />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default AdminRooms
