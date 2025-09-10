import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";


const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    if(loading || isAdminLoading){
        return <span className="loading loading-dots loading-xl"></span>
    }
    if(user && isAdmin){
        return children;
    }
    return (
        <div>
            <Navigate to="/login" state={{from:location}} replace></Navigate>
        </div>
    );
};

export default AdminRoute;