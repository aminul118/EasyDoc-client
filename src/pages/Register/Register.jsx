import { FaEnvelope, FaLock, FaUserAlt } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import LoginLottie from "../../components/LoginLottie";
import GoogleLogin from "../../components/GoogleLogin";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const { name, email, password } = data;
    createUser(email, password)
      .then(() => {
        updateUserProfile(name);
        reset();
        navigate("/login");
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  };
  return (
    <section className="min-h-[calc(100vh-288px)] flex justify-center items-center">
      <div className="flex flex-col md:flex-row h-screen md:h-auto container mx-auto shadow-xl rounded-2xl overflow-hidden ">
        <Helmet>
          <title>Register</title>
        </Helmet>
        {/* Left Side - Full-Screen Lottie */}
        <div className="md:w-1/2  overflow-hidden z-50 relative ">
          <LoginLottie />
        </div>

        {/* Right Side */}
        <div
          className="md:w-1/2 w-full flex flex-col justify-center items-center p-6 md:p-8 bg-white"
          data-aos="fade-left"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-center">
            Register
          </h2>
          <p className="text-gray-500 mb-8 text-center">
            Please register a new account.
          </p>
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
            {/* Name Field */}
            <div className="relative w-full mb-4">
              <FaUserAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Name"
                required
                {...register("name")}
                className="w-full px-10 py-2 border-b rounded-md outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Email Field */}
            <div className="relative w-full mb-4">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                {...register("email")}
                required
                placeholder="Email"
                className="w-full px-10 py-2 border-b rounded-md outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Password Field */}
            <div className="relative w-full mb-4">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
                })}
                required
                placeholder="Password"
                className="w-full px-10 py-2 border-b rounded-md outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <p className="ml-4 pb-4 text-sm text-red-500" role="alert">
                {errors.password?.type === "minLength" && (
                  <span>*Password should be atleast 6 digit</span>
                )}

                {errors.password?.type === "pattern" && (
                  <span>
                    *One Uppercase, One lowercase and one special charecter
                    required
                  </span>
                )}
              </p>
            </div>

            {/* Remember Me & Recovery */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember Me
              </label>
              <Link className="text-blue-500 text-sm">Recovery Password</Link>
            </div>

            {/* Register Button */}
            <button className="w-full bg-blue-600 text-white py-2 rounded-md mb-4 hover:bg-blue-700 btn">
              Register
            </button>

            {/* Google Sign-In */}
            <GoogleLogin />
          </form>

          {/* Login Link */}
          <p className="mt-4 text-gray-500 text-center">
            Already have an account?
            <Link to="/login" className="text-blue-500 hover:underline ml-2">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
