import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserDetails() {
    const { id } = useParams()
    const [data, setData] = useState([])
    const [allRooms, setAllRooms] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get(`http://localhost:3001/api/oneuser/${id}`);
                const rooms = userResponse.data.message.rooms;
                setData(rooms);

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

    }, [])
    return (
        <>
            {
                allRooms.map((el,i)=>{
                    return(
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

                                    
                                </div>
                            </div>
                    )
                })
            }
        </>
    )
}
export default UserDetails;