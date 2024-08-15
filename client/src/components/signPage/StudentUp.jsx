import { useContext, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import axios from "axios";

function StudentUp() {
    const { userName, setUserName, userPassword, setUserPassword } = useContext(userContext)
    const HandleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/api/signup', {
            name: userName,
            password: userPassword
        })
            .then((res) => {
                console.log(res)

            })
            .catch((e) => {
                console.log(e)

            })
    }
    return (
        <>
            <div className="flex justify-center">
                <form className="border px-4 py-8" onSubmit={HandleSubmit}>
                    <label className="input input-bordered flex items-center my-2">
                        <FaUser className="text-slate-600" />
                        <input
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                            type="text" placeholder="Enter username" />

                    </label>
                    <label className="input input-bordered flex items-center my-2">
                        <MdPassword className="text-slate-600" />
                        <input
                            value={userPassword}
                            onChange={e => setUserPassword(e.target.value)}
                            type="text" placeholder="Enter Password" />

                    </label>
                    <button type="submit" className="btn btn-secondary">Login</button>
                    <p>Already have an Student Account? <Link to="/register/student" className="btn btn-link">Login</Link></p>
                </form>
            </div>
        </>
    )
}

export default StudentUp
