import { FaUser } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function AdminsignUp() {
    return (
        <section className="flex justify-center my-2">
            <form className="border px-4 py-8">
                <label className="input input-bordered flex items-center my-2">
                    <FaUser className="text-slate-600"/>
                    <input type="text" placeholder="Enter Admin" />
                </label>
                <label className="input input-bordered flex items-center my-2">
                    <RiLockPasswordLine className="text-slate-600"/>
                    <input type="text" placeholder="Enter Secret Key" />
                </label>
                <label className="input input-bordered flex items-center my-2">
                    <MdPassword className="text-slate-600"/>
                    <input type="text" placeholder="Enter Password" />
                </label>
                <button type="submit" className="btn btn-secondary">SignUp</button>
                <p>Already have an account?<Link to="/register/admin" className="btn btn-link">login</Link></p>

            </form>
        </section>
    )
}

export default AdminsignUp
