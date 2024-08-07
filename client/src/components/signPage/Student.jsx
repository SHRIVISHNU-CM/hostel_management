import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import axios from "axios"
import { Link } from "react-router-dom";

function Student() {
    const [name, Setname] = useState("")
    const [password, SetPassword] = useState("")

    //userSignin
    return (
        <>
            <div className="flex justify-center my-2">
                <form className="border px-4 py-8">
                    <label className="input input-bordered flex items-center gap-x-1 my-2">
                        <FaUser className="text-slate-600" />
                        <input
                            value={name}
                            onChange={e => Setname(e.target.name)}
                            type="text" placeholder="Enter username" />

                    </label>
                    <label className="input input-bordered flex items-center my-2">
                        <MdPassword className="text-slate-600" />
                        <input
                            value={password}
                            onChange={e => SetPassword(e.target.value)}
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