import { Link } from "react-router-dom"
import room1 from "../assets/room1.jpg"
function Home() {
    return (
        <>
            <h1 className="font-semibold text-center text-orange-600 text-xl">Welcome to Kailasa</h1>
            <div>
                <img src={room1} className="p-2"/>
                <Link to="/allrooms" className="btn btn-success relative bottom-6 left-3">check out</Link>
            </div>

        </>
    )
}
export default Home