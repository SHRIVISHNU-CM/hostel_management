import React, { useEffect } from 'react'
import { useParams} from "react-router-dom"
import axios from "axios"
function SingleRoom() {
    const{id} = useParams()
    useEffect(()=>{
        axios.get(`http://localhost:3001/admin/room/${id}`)
        .then((res)=>{
          console.log(res.data.message[0].sharing)
        })
    
    })
  return (
    <>

    </>
  )
}

export default SingleRoom
