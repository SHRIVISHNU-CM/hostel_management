import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";

function StudentUp() {
    const[name,SetName] = useState("")
    const[password,SetPassword] = useState("")
    return (
        <>
            <div className="flex justify-center">
                <form className="border px-4 py-8">
                    <label className="input input-bordered flex items-center my-2">
                        <FaUser className="text-slate-600"/>
                        <input 
                        value={name}
                        onChange={e=>SetName(e.target.value)}
                        type="text" placeholder="Enter username" />

                    </label>
                    <label className="input input-bordered flex items-center my-2">
                        <MdPassword className="text-slate-600"/>
                        <input 
                        value={password}
                        onChange={e=>SetPassword(e.target.value)}
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
