import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BsFillPeopleFill } from "react-icons/bs";
import { RiCalendarCheckFill } from "react-icons/ri";
import { HiCurrencyRupee } from "react-icons/hi";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaLocationCrosshairs } from "react-icons/fa6";

function AdminUpdate() {
    const { id } = useParams()
    const [values, SetValues] = useState({
        sharing: "",
        availability: "",
        amount: "",
        location: "",
        country: ""
    })
    const [file, Setfile] = useState(null)
    useEffect(() => {
        axios.get(`http://localhost:3001/admin/room/${id}`)
            .then((res) => {
                console.log(res.data.message[0])
                SetValues({
                    ...values,
                    sharing: res.data.message[0].sharing,
                    availability: res.data.message[0].availability,
                    amount: res.data.message[0].amount,
                    location: res.data.message[0].location,
                    country: res.data.message[0].country

                })
            })
    }, [])
    const handleInput = (e) => {
        SetValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    const HandleFileChange = (e) => {
        Setfile(e.target.files[0])
    }
    const HandleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("sharing", values.sharing)
            formData.append('availability', values.availability)
            if (file) {
                formData.append("image", file)
            }
            const res = await axios.put(`http://localhost:3001/admin/roomsUpdate/${id}`, formData)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="card w-96 bg-base-200">
                <div className="card-body">
                    <form onSubmit={HandleSubmit}>
                        <label className="input input-bordered flex items-center gap-x-2 my-2">
                            <BsFillPeopleFill className="text-gray-500" />
                            <input
                                name="sharing"
                                value={values.sharing}
                                onChange={handleInput}
                                type="text"
                                placeholder="Enter Number of sharing" />
                        </label>
                        <label className="input input-bordered flex items-center gap-x-2 my-2">
                            <RiCalendarCheckFill className="text-gray-500" />
                            <input
                                name="availability"
                                value={values.availability}
                                onChange={handleInput}
                                type="text" placeholder="Enter Availability Yes or No" />
                        </label>
                        <label className="input input-bordered flex items-center gap-x-2 my-2">
                            <HiCurrencyRupee className="text-gray-500" />
                            <input
                                name='amount'
                                value={values.amount}
                                onChange={handleInput}
                                type='Number'
                                placeholder='Enter amount'
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-x-2 my-2">
                            <FaMapLocationDot className="text-gray-500" />
                            <input
                                name='location'
                                value={values.location}
                                onChange={handleInput}
                                type='text'
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-x-2 my-2">
                            <FaLocationCrosshairs className="text-gray-500" />

                            <input
                                name='country'
                                value={values.country}
                                onChange={handleInput}
                                type='text'
                            />
                        </label>

                        <h1>
                            <span className="font-bold text-warning">Note:</span>
                            Price is for Per Month
                        </h1>
                        <input
                            type="file"
                            onChange={HandleFileChange}
                            className="file-input file-input-bordered file-input-primary"
                        />
                        <div className="card-actions justify-end my-2">
                            <button
                                type="submit"
                                className="btn btn-success text-white">
                                Update

                            </button>
                        </div>
                    </form>

                </div>

            </div>

        </>
    )
}

export default AdminUpdate
