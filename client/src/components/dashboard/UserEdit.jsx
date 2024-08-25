import { useEffect } from "react"
import { useParams } from "react-router-dom"

function UserEdit(){
    const {id} = useParams()
    useEffect(()=>{
        console.log(id)
    },[])
    return(
        <>

        </>
    )
}

export default UserEdit