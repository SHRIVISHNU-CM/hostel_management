import { Link } from "react-router-dom"
import room1 from "../assets/room1.jpg"
import logo from "../assets/logo.png"
function Home() {
    return (
        <>
            <head className="flex justify-around">
                <div>
                    <img src={room1} className="p-2 w-[400px] rounded-xl" />
                    <Link to="/allrooms" className="btn btn-success relative bottom-6 left-3">check out</Link>
                </div>
                <div>
                <h1 className="font-semibold text-orange-600 text-4xl my-6">Welcome to Kailasa</h1>
                <h1 className=" my-8">
                <span className="font-bold  text-5xl text-orange-700">Ultimate</span> 
                <span className="font-semibold text-4xl text-purple-700">place for students to reside</span></h1>
                </div>
            </head>
            


            <footer className="footer footer-center bg-base-300  text-base-content p-4">
                <div className="flex gap-3">
                    <img src={logo} className=" w-9" />
                    <aside>
                        <p className="font-semibold">
                            Copyright {new Date().getFullYear()} - All Right Reservered
                        </p>
                    </aside>
                </div>
            </footer>
        </>
    )
}
export default Home