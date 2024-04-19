import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutAsync } from "../store/authSlice"
// import MobileMenu from "./MobileMenu";

export default function MainNavigation() {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = useSelector(state => state.auth.isAuthenticated)

    const handleLogout = async () => {
        await dispatch(logoutAsync({}))
        navigate("/");
    }

    return (
        <nav className="container sticky top-0 min-w-[100vw] py-1 px-4 lg:px-2 xl:px-6 bg-white z-20">
            {/* Conainter for nav items */}
            {auth && <div className="flex items-center space-x-2 my-6 xl:space-x-96">
                {/* Menu Items */}
                <div className="hidden items-center justify-around space-x-5 text-sm uppercase text-grayishBlue md:flex lg:text-xl md: w-full">
                    <Link to="overview">Overview</Link>
                    <button className="whitespace-no-wrap px-4 py-2 text-white bg-darkRed border-s border-darkRed rounded-lg shadow-md hover:text-darkRed hover:bg-white" onClick={handleLogout}>Log Out</button>
                </div>
                {/* <MobileMenu /> */}
                {/* Hamburger */}
                <button className={`z-30 block md:hidden focus:outline-none hamburger ${showMenu ? 'open' : null}`} onClick={() => setShowMenu(prev => !prev)}>
                    <span className="hamburger-top"></span>
                    <span className="hamburger-middle"></span>
                    <span className="hamburger-bottom"></span>
                </button>
                {/* Mobile Menu */}
                <div className={`fixed inset-0 z-20 flex-col items-center self-end w-full h-full m-h-screen px-6 py-1 pt-32 pb-4 tracking-widest text-white uppercase divide-y divide-gray-500 opacity-90 bg-veryDarkBlue ${showMenu ? 'flex' : 'hidden'} md:hidden`}>
                    <div className="w-full py-3 hover:text-softRed" onClick={handleLogout}>Logout</div>
                </div>
            </div>}
        </nav>
    )
}