import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthUserContext } from "../../AuthContext/AuthContext";
import useToken from "../../hooks/useToken";

const Signup = () => {
  const { createAccount, updateUser, googleLogin } =
    useContext(AuthUserContext);
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createdUserEmail);
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  if (token) {
    navigate("/login");
  }

  const handleSignUp = (data) => {
    console.log(data);
    setMessage("");
    const displayName = data.displayName;
    const photoURL = "";

    createAccount(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        const profile = { displayName, photoURL };
        console.log(profile);
        updateUser(profile)
          .then(() => {
            saveUser(data.displayName, data.email);
          })
          .catch((error) => {
            const errorMessage = error.message;
            setMessage(errorMessage);
          });
      })
      .catch((error) => {
        console.log(error.message);
        const errorMessage = error.message;
        setMessage(errorMessage);
      });
  };

  const saveUser = (name, email) => {
    const user = { name, email };
    fetch("https://doctors-server-motiurrahman.vercel.app/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast("Uaer Created Successfully");
        setCreatedUserEmail(email);
        //  navigate("/login");
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        console.log("Email", user.email);
        toast("You have loggedin with google");
        navigate(from, { replace: true });
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
        onSubmit={handleSubmit(handleSignUp)}
      >
        <h1 className="text-center text-2xl font-bold">Sign Up</h1>
        <div className="form-control w-full max-w-xs my-2">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            {...register("displayName", {
              required: "Name field is required",
            })}
            type="text"
            name="displayName"
            placeholder="enter name"
            className="input input-bordered w-full max-w-xs"
          />
          {errors.displayName && (
            <span className="text-red-600 text-left">
              {errors.displayName.message}
            </span>
          )}
        </div>
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
              pattern: {
                value:
                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
                message:
                  "Minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character:",
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
          <p className="text-green text-center">{message}</p>
        </div>

        {/* <p>{data}</p> */}
        <input
          type="submit"
          className="btn btn-wide my-2"
          value="Create an Account"
        />
        <p>
          Already have an account?{" "}
          <Link className="text-primary" to="/login">
            Login
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

export default Signup;
