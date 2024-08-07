import { Link, NavLink } from "react-router-dom"


function Nav() {
    return (
        <>
            <div className="flex justify-center">
                <div className=" flex gap-x-9">
                    <NavLink
                        className={({ isActive }) => `${isActive ? "font-semibold btn btn-accent" : "font-light btn btn-ghost"}`}
                        to="/register/admin">Admin</NavLink>
                    <NavLink
                        className={({ isActive }) => `${isActive ? "font-semibold btn btn-accent" : "font-light btn btn-ghost"}`}
                        to="/register/student">Student</NavLink>
                </div>
            </div>
        </>
    )
}

export default Nav