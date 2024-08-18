import { useContext, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import axios from "axios";

function Admin() {
    const { SetAdminID, AdminIsLoggin,setacc,Account } = useContext(userContext)
    const [password, setPassword] = useState("")
    const [secret, SetSecret] = useState("")
    const [name, setName] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            axios.post('http://localhost:3001/admin/signin', {
                name: name,
                password:password,
                secret:secret
            })
                .then((res) => {
                    console.log(res)
                    AdminIsLoggin(name)
                    Account()
                    SetAdminID(res.data.data._id)
                })
                .catch((e) => {
                    console.log(e)
                })

        } catch (error) {
            console.log(error)
        }

    }
    //admin login
    return (
        <>
            <section className="flex justify-center my-2">
                <form className="border px-4 py-8" onSubmit={handleSubmit}>
                    <label className="input input-bordered flex items-center my-2">
                        <FaUser className="text-slate-600" />
                        <input
                        tabIndex={0}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            type="text" placeholder="Enter Admin" />
                    </label>
                    <label className="input input-bordered flex items-center my-2">
                        <RiLockPasswordLine className="text-slate-600" />
                        <input
                            tabIndex={0}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="text" placeholder="Enter password Key" />
                    </label>
                    <label className="input input-bordered flex items-center my-2">
                        <MdPassword className="text-slate-600" />
                        <input
                        tabIndex={0}
                            value={secret}
                            onChange={e => SetSecret(e.target.value)}
                            type="text" placeholder="Enter secret" />
                    </label>
                    <button type="submit" className="btn btn-secondary">login</button>
                    <p>Don't have an account? <Link to="/register/AdminSignup" className="btn btn-link">SignUp</Link></p>

                </form>
            </section>

        </>
    )
}
export default Admin