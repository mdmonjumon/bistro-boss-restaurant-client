import { FaCalendar, FaCartPlus, FaHome } from "react-icons/fa";
import { MdOutlinePayment, MdReviews } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";
import './Dashboard.css'
import { GiHamburgerMenu } from "react-icons/gi";
import { RiShoppingBag2Fill } from "react-icons/ri";
import useCart from "../hooks/useCart";
import { FaBook, FaList, FaUsers, FaUtensils } from "react-icons/fa6";
import useAdmin from "../hooks/useAdmin";



const Dashboard = () => {
    const [cart] = useCart();
    const [isAdmin] = useAdmin();
    return (
        <div className="flex gap-10">
            <div className="w-80 min-h-screen bg-[#D1A054] menu">
                <h2 className="text-2xl font-black uppercase text-center">Bistro boss <br />restaurant</h2>
                <ul className="ml-5 mt-10 font-medium text-base space-y-1">

                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to="/dashboard/adminHome" className="flex items-center gap-1"> <FaHome size={18}></FaHome> Admin Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addItems" className="flex items-center gap-1"> <FaUtensils size={18}></FaUtensils> Add Items</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/ManageItems" className="flex items-center gap-1"> <FaList size={18} /> Manage Items</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageBookings" className="flex items-center gap-1"> <FaBook size={18} /> Manage Bookings</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allUsers" className="flex items-center gap-1"> <FaUsers size={20} /> All Users</NavLink>
                                </li>
                               
                            </>
                            :
                            <>
                                <li>
                                    <NavLink to="/dashboard/userHome" className="flex items-center gap-1"> <FaHome size={30}></FaHome> USER HOME</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reservation" className="flex items-center gap-1"> <FaCalendar size={30}></FaCalendar> RESERVATION</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/paymentHistory" className="flex items-center gap-1 uppercase"> <MdOutlinePayment size={30} /> payment history</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/cart" className="flex items-center gap-1 uppercase"> <FaCartPlus size={30} /> My Cart ({cart.length})</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/review" className="flex items-center gap-1 uppercase"> <MdReviews size={30} /> Add Review</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/booking" className="flex items-center gap-1 uppercase"> <TbBrandBooking size={30} /> My Booking</NavLink>
                                </li>
                            </>
                    }

                    <div className="divider divider-primary"></div>

                    <li>
                        <NavLink to="/" className="flex items-center gap-1 uppercase"> <FaHome size={30} /> Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/menu" className="flex items-center gap-1 uppercase"> <GiHamburgerMenu size={30} />Our Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/:category" className="flex items-center gap-1 uppercase"> <RiShoppingBag2Fill size={30} /> Food Order</NavLink>
                    </li>

                </ul>

            </div>
            <div className="w-full">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;