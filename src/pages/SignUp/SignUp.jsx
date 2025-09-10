import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/Shared/SocialLogin/SocialLogin";

const SignUp = () => {
    const { createUser, updateUserProfile, userLogOut } = useAuth();
    const axiosSecurePublic = useAxiosPublic()
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,20}$/;

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {

        createUser(data.email, data.password)
            .then(() => {
                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosSecurePublic.post('users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    
                                    reset();
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User created successful. Login Now!",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });

                                    userLogOut()
                                        .then(() => {
                                            navigate('/login')
                                        })
                                }
                            })




                    })

            })

    };


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center flex-11/12">

                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card lg:flex-11/12">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body lg:w-3/4 mx-auto">
                        <h1 className="text-5xl font-bold">Sign Up now!</h1>
                        <fieldset className="fieldset">
                            {/* Name */}
                            <label className="label">Name</label>
                            <input type="text" name="name" {...register("name", { required: true })} className="input w-full focus:outline-0" placeholder="Name" />
                            {errors.name && <span className="text-rose-500">Name field is required</span>}

                            {/* Photo */}
                            <label className="label">Photo URL</label>
                            <input type="url" name="photo" {...register("photo", { required: true })} className="input w-full focus:outline-0" placeholder="Photo URL" />
                            {errors.photo && <span className="text-rose-500">Photo URL field is required</span>}


                            {/* email */}
                            <label className="label">Email</label>
                            <input type="email" name="email" {...register("email", { required: true })} className="input w-full focus:outline-0" placeholder="Email" />
                            {errors.email && <span className="text-rose-500">Email field is required</span>}

                            {/* password */}
                            <label className="label">Password</label>
                            <div className="relative">
                                <input type={showPassword ? 'text' : "password"} name="password" {...register("password", { required: true, pattern: regex })}
                                    className="input w-full focus:outline-0" placeholder="Password" />
                                {errors.password && <span className="text-rose-500">Password must be between 6 to 20 character with one uppercase, one lowercase and one number</span>}
                                <p onClick={() => setShowPassword(!showPassword)} className="text-2xl absolute right-5 top-1/2 -translate-y-1/2 z-50">
                                    {
                                        showPassword ? <FaRegEye /> : <FaRegEyeSlash />
                                    }
                                </p>
                            </div>

                            <input type="submit" className="btn btn-neutral mt-4" value="SignUp" />
                        </fieldset>
                    </form>
                    <div className="lg:w-3/4 mx-auto px-6">
                        <SocialLogin></SocialLogin>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SignUp;