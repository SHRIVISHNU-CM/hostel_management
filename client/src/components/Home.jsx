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
            <main>
                <h1 className="font-semibold text-4xl text-blue-600 text-center border-t-2">Why <span className="font-bold text-orange-700 text-5xl">Kailasa ?</span></h1>
                <div className="flex flex-col my-8 gap-y-8 items-center lg:flex lg:flex-row lg:justify-around lg:my-8">
                    <div className="border w-72 h-72 rounded-xl bg-base-200 flex items-center hover:bg-slate-300">
                        <h1 className="font-bold text-purple-700 text-2xl text-center">Strong Student Community</h1>

                    </div>
                    <div className="border w-72 h-72 rounded-xl bg-base-200 flex items-center justify-center hover:bg-slate-300">
                        <h1 className="font-bold text-purple-700 text-2xl ">Affordable Price</h1>

                    </div>
                    <div className="border w-72 h-72 rounded-xl bg-base-200 flex items-center justify-center hover:bg-slate-300">
                        <h1 className="font-bold text-purple-700 text-2xl ">Trust</h1>

                    </div>
                </div>
            </main>


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