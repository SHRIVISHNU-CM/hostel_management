import { Outlet } from "react-router-dom"
import Nav from "./signPage/Nav"

function Register() {
    return (
        <>
            <div className=" h-min p-4 ">
                <Nav />
                <Outlet />
            </div>

        </>
    )
}

export default Register
