import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { AuthUserContext } from "../../AuthContext/AuthContext";
import Loading from "../../Component/Loading/Loading";
import useToken from "../../hooks/useToken";

const Login = () => {
  const { login, googleLogin } = useContext(AuthUserContext);
  const [msg, setMessage] = useState("");
  const [loginUserEmail, setLoginUserEMail] = useState("");
  const [loading, setLoading] = useState(false);
  const [token] = useToken(loginUserEmail);
  let navigate = useNavigate();
  const navigation = useNavigation();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
      setLoading(true);
    }
  }, [token]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    setLoading(true);
    console.log(data.email, data.password);
    login(data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        // setMessage("You have loggedin");
        setLoginUserEMail(data.email);
      })
      .catch((error) => {
        setMessage(error.message);
        setLoading(false);
      });
  };

  const saveUser = (name, email, role = "buyer") => {
    const user = { name, email, role };
    fetch("https://server-sh-bike-motiurrahman.vercel.app/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          setLoginUserEMail(email);
          toast("Your Account has been Created Successfully");
        } else {
          navigate(from, { replace: true });
        }
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        console.log(user);
        saveUser(user.displayName, user.email);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setMessage(errorMessage);
      });
  };

  if (navigation.state === "loading") {
    return <Loading></Loading>;
  }

  return (
    <div className="lg:w-1/2 m-auto mb-10 flex justify-items-center items-center flex-col">
      <form onSubmit={handleSubmit(handleLogin)}>
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
        <div className="form-control w-full max-w-xs my-2 items-center">
          {loading ? (
            <button className="btn loading btn-wide">... Just wait</button>
          ) : (
            <input type="submit" className="btn btn-wide my-2" value="Login" />
          )}
        </div>

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
