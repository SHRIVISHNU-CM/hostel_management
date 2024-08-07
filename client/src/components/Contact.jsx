import { CgProfile } from "react-icons/cg";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";

function Contact() {
    return (
        <>
            <h1 className='text-xl font-semibold text-orange-600 '>Contact Page</h1>
            <div className="flex justify-center ">
                <form className=" w-96">
                    <h1 className='font-light text-xl'>Enter Your Details</h1>
                    <label className='input input-bordered flex items-center gap-1 my-2'>
                        <CgProfile className="text-slate-400" />
                        <input type='text' placeholder="Enter your name" />
                    </label>
                    <label className='input input-bordered flex items-center gap-1 my-2'>
                        <MdOutlineMailOutline className="text-slate-400" />
                        <input type='text' placeholder="Email" />
                    </label>
                    <label className='input input-bordered flex items-center gap-1 my-2'>
                        <FaPhoneAlt className="text-slate-400" />
                        <input type='text' placeholder="Phone" />
                    </label>
                    <label className='input input-bordered flex items-center gap-1 my-2'>
                        <FaUserGraduate className="text-slate-400" />
                        <input type='text' placeholder="College" />
                    </label>
                    <label className='input input-bordered flex items-center gap-1 my-2'>
                        <IoLocationSharp className="text-slate-400" />
                        <input type='text' placeholder="Home Town" />
                    </label>
                    <button className="btn font-light btn-secondary">Submit</button>
                </form>
            </div>

        </>
    )
}

export default Contact
