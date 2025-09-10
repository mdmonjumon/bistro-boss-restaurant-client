import useAuth from "../../../hooks/useAuth";


const UserHome = () => {
    const {user} = useAuth();
    return (
        <div>
            <h2 className="text-2xl">Hi, {user ? user?.displayName : ''}  Welcome Back</h2>

        </div>
    );
};

export default UserHome;