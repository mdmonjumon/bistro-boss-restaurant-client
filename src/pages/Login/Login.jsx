import { useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Login = () => {
    const { userLogin } = useAuth()
    const captchaRef = useRef(null)
    const [disableLogin, setDisableLogin] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()
    // const from = location.state?.from?.pathname || "/";
    const from = location.state?.from || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries());

        userLogin(data?.email, data?.password)
            .then(result => {
                if (result?.user) {
                    Swal.fire({
                        icon: "success",
                        title: "Successfully Login",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate(from)
                    form.reset();
                }
            })


    }

    const handleValidateCaptcha = () => {
        const captcha = captchaRef.current.value;
        if (validateCaptcha(captcha)) {
            setDisableLogin(false)
        }
        else {
            setDisableLogin(true)
            alert("invalid captcha")
        }
    }

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

                    <form onSubmit={handleLogin} className="card-body lg:w-3/4 mx-auto">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" name="email" className="input w-full" placeholder="Email" />
                            <label className="label">Password</label>
                            <input type="password" name="password" className="input w-full" placeholder="Password" />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <div className='my-2'><LoadCanvasTemplate /></div>
                            <input type="text" ref={captchaRef} name="captcha" className="input w-full" placeholder="type the text above" />
                            <div onClick={handleValidateCaptcha} className='btn btn-outline w-max mx-auto border-0'>Validate Captcha</div>
                            <input disabled={disableLogin} type="submit" className="btn btn-neutral mt-4" value="Login" />
                        </fieldset>
                    </form>
                    <p className='text-center'>New here? <Link to="/signup" className='text-rose-600'>Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;