import { BsFillPeopleFill } from "react-icons/bs";
import { RiCalendarCheckFill } from "react-icons/ri";
import { AiFillPicture } from "react-icons/ai";
import { useContext, useState } from "react";
import { userContext } from "../../Context/UserContext";
import axios from "axios";

function AddPost() {
    const { AdminID } = useContext(userContext)
    const [formData, SetFormData] = useState({
        sharing: "",
        availability: "",
        image: ""
    })
    const [file, Setfile] = useState(null)
    const handleInput = (e) => {
        SetFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const HandleFileChange = (e) => {
        Setfile(e.target.files[0])
    }
    const HandleSubmit = async (e) => {
        e.preventDefault()
        console.log(AdminID)
        const data = new FormData()
        data.append("main", AdminID)
        data.append("sharing", formData.sharing)
        data.append("availability", formData.availability)
        data.append("image", formData.image)

        if (file) {
            data.append("image", file)
        }
        try {
            const response = await axios.post("http://localhost:3001/admin/rooms", data)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    {
        return (
            <>
                <h1>Post</h1>
                <h1 className="font-semibold text-xl text-gray-500 text-center">HI There... Add Some New Rooms</h1>
                <div className="card w-96 bg-base-200">
                    <div className="card-body">
                        <form onSubmit={HandleSubmit}>
                            <label className="input input-bordered flex items-center gap-x-2 my-2">
                                <BsFillPeopleFill className="text-gray-500" />
                                <input
                                    name="sharing"
                                    value={formData.sharing}
                                    onChange={handleInput}
                                    type="text"
                                    placeholder="Enter Number of sharing" />
                            </label>
                            <label className="input input-bordered flex items-center gap-x-2 my-2">
                                <RiCalendarCheckFill className="text-gray-500" />
                                <input
                                    name="availability"
                                    value={formData.availability}
                                    onChange={handleInput}
                                    type="text" placeholder="Enter Availability Yes or No" />
                            </label>
                            <label className="input input-bordered flex items-center gap-x-2 my-2">
                                <AiFillPicture className="text-gray-500" />
                                <input
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInput}
                                    type="text"
                                    placeholder="Enter Name of Picture" />
                            </label>
                            <h1>
                                <span className="font-bold text-warning">Note:</span>
                                Enter Name of the picture name "image" Only.
                            </h1>
                            <input
                                type="file"
                                onChange={HandleFileChange}
                                className="file-input file-input-bordered file-input-primary"
                            />
                            <div className="card-actions justify-end my-2">
                                <button
                                    type="submit"
                                    className="btn btn-success text-white"
                                >Post</button>
                            </div>
                        </form>

                    </div>

                </div>
            </>
        )
    }
}

export default AddPost