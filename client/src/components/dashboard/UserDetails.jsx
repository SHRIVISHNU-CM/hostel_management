import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

function UserDetails() {
    const { id } = useParams()
    const [data, setData] = useState([])
    const [allRooms, setAllRooms] = useState([])
    const [allot, SetAlloted] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get(`http://localhost:3001/api/oneuser/${id}`);
                const rooms = userResponse.data.message.rooms;
                setData(rooms);
                console.log(rooms[0].alloted)
                const roomResponses = await Promise.all(
                    rooms.map((room) =>
                        axios.get(`http://localhost:3001/admin/room/${room.room_id}`)
                    )
                );

                const roomData = roomResponses.map(res => res.data.message);
                const flattened = roomData.flat()
                setAllRooms(flattened)
                console.log(flattened)


            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData()

    }, [id])
    
    const handleChange = (e, _id) => {
        SetAlloted(prev => ({
            ...prev,
            [_id]: e.target.value
        }))
    }
    const handleUpdate = async (e, roomID) => {
        console.log("update", e)
        e.preventDefault()
        const newVal = allot[roomID] !== undefined ? allot[roomID] : ""
        try {
            const response = await axios.put(`http://localhost:3001/api/user/details/${roomID}`, {alloted: newVal},{withCredentials:true})
            console.log(response)
    
            setData(prev => prev.map(room => 
                room._id === roomID ? {...room, alloted: newVal} : room
            ))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {
                data.map((ele, i) => {
                    const roomDetails = allRooms.find((el) => el._id === ele.room_id)

                    return roomDetails ? (
                        <div className='card w-[700px] bg-base-200 my-3' key={i} >
                            <div className='card-body'>
                                <h1 className='card-title'>Register Details</h1>
                                <div className='flex items-center justify-around'>
                                    <figure className='border border-green-600 h-20 w-24'>
                                        <img src={roomDetails.cloudinary_uri} className='h-20' />

                                    </figure>
                                    <div className="">
                                        <h1 className="my-2">Sharing: {roomDetails.sharing}</h1>
                                        <h1 className="my-2">Availability : {roomDetails.availability}</h1>
                                        <h1 className="my-2">Price:{roomDetails.amount}/month</h1>
                                        <h1 className="my-2">Alloted:</h1>
                                        <form onSubmit={e=>handleUpdate(e,ele._id)}>
                                            <label className="input input-bordered py-2 input-ghost ">
                                                <input
                                                className=""
                                                    value={allot[ele._id] !== undefined ? allot[ele._id] : ele.alloted}
                                                    onChange={e=>handleChange(e,ele._id)}
                                                />
                                            </label>
                                            <div className="card-actions justify-center my-4">
                                                <button 
                                                type="submit" 
                                                className="btn btn-success">
                                                    Save
                                                </button>
                                            </div>

                                        </form>

                                    </div>
                                </div>

                            </div>
                        </div>
                    ) : null
                })
            }
        </>
    )
}
export default UserDetails;