import axios from "axios"
import { useEffect, useState } from "react"
import { BsFillPeopleFill } from "react-icons/bs";
import { RiCalendarCheckFill } from "react-icons/ri";
function AllRooms() {
    const [room, SetRoom] = useState([])
    const [ErrMsg, SetErrMsg] = useState("")
    useEffect(() => {
        axios.get("http://localhost:3001/admin/allrooms")
            .then((res) => {
                console.log(res.data[0].adminPic)
                SetRoom(res.data[0].adminPic)
            })
            .catch((e) => {
                console.log(e.message)
                SetErrMsg(e.message)
            })
    }, [])
    return (
        <>
            <div className="flex  flex-col gap-y-10 items-center">
                {
                    room.map((el, i) => {
                        return (
                            <div className="card bg-base-200 lg:w-[600px]  shadow-2xl" key={i}>
                                <img
                                    src={el.cloudinary_uri}
                                    className="h-15"
                                    alt="Rooms"
                                />
                                <div className="card-body">
                                    <h1 className="font-semibold">{ }</h1>
                                    <div className="card-actions justify-center">
                                        <h1 className="badge badge-outline">
                                        <RiCalendarCheckFill title="available"/>
                                            {el.availability}
                                        </h1>
                                        <div className="badge badge-success" title="sharing">
                                            <BsFillPeopleFill />
                                            {el.sharing}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {ErrMsg && <p>{ErrMsg}</p>}


        </>
    )
}

export default AllRooms
