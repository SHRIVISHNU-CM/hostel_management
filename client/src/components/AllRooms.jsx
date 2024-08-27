import axios from "axios"
import { useEffect, useState } from "react"
import { BsFillPeopleFill } from "react-icons/bs";
import { RiCalendarCheckFill } from "react-icons/ri";
import { Link } from "react-router-dom"
import Loading from "./Loading";
function AllRooms() {
    const [allRoom,SetRooms] = useState([])
    const [ErrMsg, SetErrMsg] = useState("")
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        const timmer = setTimeout(() => {
            setLoading(false)
            axios.get("http://localhost:3001/admin/allrooms")
                .then((res) => {
                    console.log(res.data)
                    const allAdminPics = res.data.flatMap(room => room.adminPic)
                    SetRooms(allAdminPics)
                })
                .catch((e) => {
                    console.log(e.message)
                    SetErrMsg(e.message)
                })
        }, 2000)
        return ()=> clearTimeout(timmer)
    }, [])
    return (
        <>  
            {isLoading ? <Loading/> : null}
            
            <div className="flex  flex-col gap-y-10 items-center">
                {
                    allRoom.map((el, i) => {
                        return (
                            <div className="card bg-base-200 lg:w-[600px]  shadow-2xl" key={i}>
                                <figure className="p-2">
                                    <img
                                        src={el.cloudinary_uri}
                                        className="w-[200px]"
                                        alt="Rooms"
                                    />
                                </figure>

                                <div className="card-body">
                                    <h1 className="font-semibold">{ }</h1>
                                    <div className="card-actions justify-center">
                                        <h1 className="badge badge-outline">
                                            <RiCalendarCheckFill title="available" />
                                            {el.availability}
                                        </h1>
                                        <div className="badge badge-success" title="sharing">
                                            <BsFillPeopleFill />
                                            {el.sharing}
                                        </div>
                                    </div>
                                    <div className="">
                                        <Link to={`/room/${el._id}`} className="btn btn-active">Check Out</Link>
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
