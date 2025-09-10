
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { FaCartPlus } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";

const Navbar = () => {
    const { user, userLogOut } = useAuth()
    const [cart] = useCart();
    const [isAdmin] = useAdmin()

    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/menu">Our Menu</NavLink></li>
        <li><NavLink to="/order/salad">Food Order</NavLink></li>
        {
            user && isAdmin && <li><NavLink to="/dashboard/adminHome">Dashboard</NavLink></li>
        }
        {
            user && !isAdmin && <li><NavLink to="/dashboard/userHome">Dashboard</NavLink></li>
        }
        {
            user ?
                <button onClick={userLogOut} className="btn btn-ghost text-lg">Logout</button>
                :
                <div className="flex">
                    <li><NavLink to="/login">Login</NavLink></li>
                    <li><NavLink to="/signup">SignUp</NavLink></li>
                </div>
        }
    </>

    return (
        <div className="navbar shadow-sm fixed z-10 bg-black/40  max-w-7xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-white">
                        {/* nav links */}
                        {navLinks}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl text-white">Bistro Boss</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-lg text-white">

                    {/* nav links */}
                    {navLinks}
                </ul>
            </div>

            <div className="navbar-end">
                <Link to="/dashboard" className="flex items-center flex-row-reverse gap-2 bg-white px-4 py-2 rounded">
                    <FaCartPlus className="text-3xl" /> <div className="badge badge-lg badge-secondary">+{cart.length}</div>
                </Link>
            </div>

        </div>
    );
};

export default Navbar;