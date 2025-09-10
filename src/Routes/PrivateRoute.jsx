
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    if(loading){
        return <span className="loading loading-dots loading-xl"></span>
    }
    if(user){
        return children;
    }
    return (
        <div>
            <Navigate to="/login" state={{from:location}} replace></Navigate>
        </div>
    );
};

export default PrivateRoute;