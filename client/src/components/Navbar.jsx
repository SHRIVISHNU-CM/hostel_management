import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink, Link } from "react-router-dom"
import logo from "../assets/logo.png"
import { useContext } from "react";
import { userContext } from "../Context/UserContext";


function Navbar() {
    const { isloggedIn, AdminLogin, acc } = useContext(userContext)
    return (
        <>
            <div className="navbar bg-base-200 ">
                <div className="block lg:hidden navbar-start">
                    <div className="dropdown">
                        <div className="btn btn-ghost " tabIndex={0} role="button">
                            <FaBarsStaggered />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-lg dropdown-content bg-base-200 rounded-box z-10 mt-4 w-52 shadow"
                        >
                            {
                                AdminLogin ? <Link to="/contact">ContactUs</Link> :
                                    <Link to="/about">About</Link>
                            }
                            <Link to="/contact" className="my-2">Contact Us</Link>
                            {isloggedIn ?
                                <Link to="/userprofile" className="my-2">Profile</Link> :
                                <Link to="/register" className="my-2">Register</Link>
                            }
                        </ul>
                    </div>
                </div>
                <div className="navbar-start lg:navbar-center  ">
                    <div className="flex items-center btn hover:btn-ghost">
                        <img src={logo} className="w-[20px]" />
                        <Link to="/" className="font-semibold font-serif">kailasa</Link>
                    </div>
                </div>
                <div className="hidden lg:block lg:navbar-end">
                    <div className="flex justify-around">
                        {AdminLogin ?
                            <NavLink to="/adminContact"
                                className={({ isActive }) => `${isActive ? "font-semibold btn btn-success" : "font-semibold btn btn-ghost"}`}
                            >All contact</NavLink> :
                            <NavLink to='/about'
                                className={({ isActive }) => `${isActive ? "font-semibold btn btn-success" : "font-semibold btn btn-ghost"}`}>About</NavLink>
                        }
                        {AdminLogin ?
                            <NavLink to="/addPost"
                                className={({ isActive }) => `${isActive ? "font-semibold btn btn-success" : "font-semibold btn btn-ghost"}`}>Add Post</NavLink> :
                            <NavLink to="/contact"
                                className={({ isActive }) => `${isActive ? "font-semibold btn btn-success" : "font-semibold btn btn-ghost"}`}>Contact Us</NavLink>
                        }

                        {AdminLogin ?
                            <NavLink to="/adminprofile"
                                className={({ isActive }) => `${isActive ? "font-semibold btn btn-success" : "font-semibold btn btn-ghost"}`}>Admin Profile</NavLink>:
                                null
                            
                        }
                        {AdminLogin?
                            <NavLink to="/userRegister"
                            className={({isActive})=>`${isActive? "font-semibold btn btn-success" : "font-semibold btn btn-ghost"}`}
                            >User</NavLink>:null

                        }
                        {acc ?
                            null :
                            <NavLink to="/register"
                                className={({ isActive }) => `${isActive ? "font-semibold btn btn-success" : "font-semibold btn btn-ghost"} `}>Signin/Signup</NavLink>

                        }
                        {isloggedIn ? <NavLink to="/userprofile"
                            className={({ isActive }) => `${isActive ? "font-semibold btn btn-success" : "font-semibold btn btn-ghost"}`}>Profile</NavLink> :
                            null
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
