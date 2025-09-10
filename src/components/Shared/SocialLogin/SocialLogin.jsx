import { FaGoogle } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {

    const { loginWithGoogle } = useAuth();
    const axiosSecurePublic = useAxiosPublic();
    const navigate = useNavigate()

    const handleLoginWithGoogle = () => {
        loginWithGoogle()
            .then(result => {
                const userInfo = {
                    email:result.user.email,
                    name:result.user.displayName,
                }
                axiosSecurePublic.post('/users', userInfo)
                .then(()=>{
                    navigate('/')
                })

            })
    }
    return (
        <div>
            <div className="divider divider-primary"></div>
            <button onClick={handleLoginWithGoogle} className="btn btn-active"><FaGoogle className="text-[#4285F4] text-lg" /> Google Login</button>

        </div>
    );
};

export default SocialLogin;