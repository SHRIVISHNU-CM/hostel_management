import axios from "axios"
import { useEffect, useState } from "react"
import { FaArrowCircleRight } from "react-icons/fa";


function UserRegister (){
    const [allData,SetAllData] =  useState([])
    useEffect(()=>{
        axios.get("http://localhost:3001/api/all")
        .then((res)=>{
            console.log(res.data.message)
            SetAllData(res.data.message)

        })
        .catch(e=>{
            console.log(e)
        })
    },[])
    return (
        <>
            <h1>All Users</h1>
            {
                allData.map((el,i)=>{
                    return(
                        <div className="card w-96 bg-base-200 my-3" key={i}>
                            <div className="card-body">
                                 <h1>UserName:{el.name}</h1>
                                 <h1>College:{el.college}</h1>
                                 
                                 <h1>address:{el.address}</h1>
                                 <h1>Number:{el.phone}</h1>
                            </div>
                            <div className="card-actions items-center justify-end px-4 py-6">
                                <FaArrowCircleRight
                                    className=' text-2xl text-purple-700 hover:text-purple-400'
                                />
                                <h1>Show Details</h1>
                            </div>

                        </div>
                    )
                })
            }

        </>
    )
}
export default UserRegister