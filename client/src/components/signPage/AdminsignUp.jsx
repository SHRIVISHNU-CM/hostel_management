import axios from "axios";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function AdminsignUp() {
    const [name, Setname] = useState("")
    const [password, setPassword] = useState("")
    const [secret, SetSecret] = useState("")
    const [Err , SetErr] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            axios.post("http://localhost:3001/admin/signup", {
                name: name,
                password: password,
                secret: secret
            })
                .then((res) => {
                    console.log(res)
                })
                .catch(e => {
                    SetErr(e.response.data.message)
                    console.log(e.response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="flex justify-center my-2">
            <form className="border px-4 py-8" onSubmit={handleSubmit}>
                {Err && <h1>{Err}</h1>}
                <label className="input input-bordered flex items-center my-2">
                    <FaUser className="text-slate-600" />
                    <input
                        value={name}
                        onChange={e => Setname(e.target.value)}
                        type="text" placeholder="Enter Admin" />
                </label>
                <label className="input input-bordered flex items-center my-2">
                    <RiLockPasswordLine className="text-slate-600" />
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="text" placeholder="Enter Password" />
                </label>
                <label className="input input-bordered flex items-center my-2">
                    <MdPassword className="text-slate-600" />
                    <input
                        value={secret}
                        onChange={e => SetSecret(e.target.value)}
                        type="text" placeholder="Enter Secret Key" />
                </label>
                <button type="submit" className="btn btn-secondary">SignUp</button>
                <p>Already have an account?<Link to="/register/admin" className="btn btn-link">login</Link></p>

            </form>
        </section>
    )
}

export default AdminsignUp
