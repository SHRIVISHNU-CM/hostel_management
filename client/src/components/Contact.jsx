import { CgProfile } from "react-icons/cg";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaNs8, FaPhoneAlt } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import { useState } from "react";
import axios from "axios";

function Contact() {
    const [name, SetName] = useState("")
    const [email, SetEmail] = useState("")
    const [phone, SetPhone] = useState("")
    const [college, SetCollege] = useState("")
    const [location, SetLocation] = useState("")
    const [ErrMsg,SetErrMsg]  = useState("")

    const HandleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3001/admin/contactus",{
            name:name,
            email:email,
            phone:phone,
            college:college,
            hometown:location
        })
        .then(()=>{
            SetName("")
            SetCollege("")
            SetEmail("")
            SetPhone("")
            SetLocation("")
        })
        .catch((e)=>{
            console.log("Try again ! request failed")

            SetErrMsg("Please Try Again Request Failed!")
        })
        
    }
    return (
        <>
            <h1 className='text-xl font-semibold text-orange-600 '>Contact Page</h1>
            <div className="flex justify-center ">
                <form className=" w-96" onSubmit={HandleSubmit}>
                    <h1 className='font-light text-xl'>Enter Your Details</h1>
                    <label className='input input-bordered flex items-center gap-1 my-2'>
                        <CgProfile className="text-slate-400" />
                        <input
                            value={name}
                            onChange={e => {
                                console.log(e.target.value)
                                SetName(e.target.value)
                            }}
                            type='text' placeholder="Enter your name" />
                    </label>
                    <label className='input input-bordered flex items-center gap-1 my-2'>
                        <MdOutlineMailOutline className="text-slate-400" />
                        <input
                            value={email}
                            onChange={e => SetEmail(e.target.value)}
                            type='text' placeholder="Email" />
                    </label>
                    <label className='input input-bordered flex items-center gap-1 my-2'>
                        <FaPhoneAlt className="text-slate-400" />
                        <input
                            value={phone}
                            onChange={e => SetPhone(e.target.value)}
                            type='text' placeholder="Phone" />
                    </label>
                    <label className='input input-bordered flex items-center gap-1 my-2'>
                        <FaUserGraduate className="text-slate-400" />
                        <input
                            value={college}
                            onChange={e => SetCollege(e.target.value)}
                            type='text' placeholder="College" />
                    </label>
                    <label className='input input-bordered flex items-center gap-1 my-2'>
                        <IoLocationSharp className="text-slate-400" />
                        <input
                            value={location}
                            onChange={e => SetLocation(e.target.value)}
                            type='text' placeholder="Home Town" />
                    </label>
                    <button
                        type="submit"
                        className="btn font-light btn-secondary">
                        Submit
                        </button>
                    { ErrMsg && <h1 className="font-semibold text-xl text-warning">{ErrMsg}</h1>}
                    
                </form>
            </div>

        </>
    )
}

export default Contact
