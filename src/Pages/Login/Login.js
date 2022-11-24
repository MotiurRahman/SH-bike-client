import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthUserContext } from "../../AuthContext/AuthContext";
import useToken from "../../hooks/useToken";

const Login = () => {
  const { login, googleLogin } = useContext(AuthUserContext);
  const [msg, setMessage] = useState("");
  const [loginUserEmail, setLoginUserEMail] = useState("");
  const [token] = useToken(loginUserEmail);
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState("");

  if (token) {
    navigate(from, { replace: true });
  }

  const handleLogin = (data) => {
    console.log(data.email, data.password);
    login(data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setMessage("You have loggedin");
        setLoginUserEMail(data.email);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;

        setMessage("You have loggedin with google");
        console.log(user);

        toast("You have loggedin with google");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        setMessage(errorMessage);
      });
  };

  return (
    <div className="lg:w-1/2 m-auto ">
      <form
        className="flex justify-items-center items-center flex-col"
        onSubmit={handleSubmit(handleLogin)}
      >
        <h1 className="text-center text-2xl font-bold">Login</h1>
        <div className="form-control w-full max-w-xs my-2">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            {...register("email", {
              required: "Email field is required",
            })}
            type="email"
            name="email"
            placeholder="enter email"
            className="input input-bordered w-full max-w-xs"
          />
          {errors.email && (
            <span className="text-red-600 text-left">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="form-control w-full max-w-xs my-2">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be six cahracter long",
              },
            })}
            type="password"
            name="password"
            placeholder="Enter password"
            className="input input-bordered w-full max-w-xs"
          />
          {errors.password && (
            <span className="text-red-600 text-left">
              {errors.password.message}
            </span>
          )}
          <label className="label">
            <Link to="forgotPassword">
              <span className="label-text-alt">Forgot Password?</span>
            </Link>
          </label>
          <p>{msg}</p>
        </div>

        {/* <p>{data}</p> */}
        <input type="submit" className="btn btn-wide my-2" value="Login" />
        <p>
          New to this website?{" "}
          <Link className="text-primary" to="/signup">
            Create new account
          </Link>
        </p>
      </form>
      <div className="divider">OR</div>
      <button onClick={handleGoogleLogin} className="btn btn-outline btn-wide">
        Continue with Google
      </button>
    </div>
  );
};

export default Login;
