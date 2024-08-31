import axios from "axios"
import { useEffect, useState } from "react"
import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../Loading";



function UserRegister() {
    const [allData, SetAllData] = useState([])
    const [err, SetErr] = useState("")
    const [loading, SetLoading] = useState(false)
    useEffect(() => {
        try {
            axios.get("http://localhost:3001/api/all", { withCredentials: true })
            
                .then((res) => {
                    console.log(res.data.message)
                    SetAllData(res.data.message)

                })
                .catch(e => {
                    console.log(e.response.data)
                    SetErr(e.response.data.message)
                })

        } catch (error) {
            console.log(error)
        }

    }, [])
    if(loading){
        return(
            <>
                <Loading/>
            </>
        )
    }
    return (
        <>
            <h1 className="text-xl text-orange-600">All Users</h1>
            {err && <h1 className="font-semibold text-xl text-purple-700">{err}</h1>}

            <div className="flex flex-col items-center">
                {
                    allData.map((el, i) => {
                        return (
                            <div className="card lg:w-96 bg-base-200 my-3" key={i}>
                                <div className="card-body">
                                    <h1>UserName:{el.name}</h1>
                                    <h1>College:{el.college}</h1>

                                    <h1>address:{el.address}</h1>
                                    <h1>Number:{el.phone}</h1>
                                </div>
                                <div className="card-actions items-center justify-end px-4 py-6">
                                    <Link
                                        to={`/userdetails/${el._id}`}
                                    >
                                        <FaArrowCircleRight
                                            className=' text-2xl text-purple-700 hover:text-purple-400'
                                        />
                                    </Link>

                                    <h1>Show Details</h1>
                                </div>

                            </div>
                        )
                    })
                }
            </div>


        </>
    )
}
export default UserRegister