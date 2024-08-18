import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";

function Student() {
    const navigate = useNavigate()
    const { login , SetuserID, Account} = useContext(userContext)
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const HandleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/api/signin", {
            name: name.trim(),
            password: password.trim()
        })
            .then((res) => {
                console.log(res)
                login(name, password)
                SetuserID(res.data.message._id)
                navigate('/allrooms')
                Account()
            })
            .catch(e => console.log(e))
    }
    //userSignin
    return (
        <>
            <div className="flex justify-center my-2">
                <form className="border px-4 py-8" onSubmit={HandleSubmit}>
                    <label className="input input-bordered flex items-center gap-x-1 my-2">
                        <FaUser className="text-slate-600" />
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            type="text" placeholder="Enter username" />
                    </label>
                    <label className="input input-bordered flex items-center my-2">
                        <MdPassword className="text-slate-600" />
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="text" placeholder="Enter Password" />
                    </label>
                    <button type="submit" className="btn btn-accent">Login</button>
                    <p>Don't have an Student Account?<Link to="/register/studentUp" className="btn btn-link">Sign Up</Link></p>
                </form>
            </div>


        </>
    )
}
export default Student