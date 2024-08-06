import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import SpinnerMini from "../SpinnerMini";
import toast from "react-hot-toast";
import { useState } from "react";

function LoginSection() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async (userData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://osaagos-api-alumni-website.onrender.com/api/users/login",
        userData
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      reset();
      toast.success("User login successfully");
      navigate("/user/profile");
    } catch (error) {
      toast.error("Wrong details");
    } finally {
      setIsLoading(false);
    }
  };
  function onSubmit({ email, password }) {
    const loginData = { email, password };
    loginUser(loginData);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:p-20 p-4 w-2/3 mx-auto"
      >
        <p className="text-4xl text-center font-semibold">LOGIN FORM</p>
        <div className="grid grid-cols-1 mt-8 formControl gap-2">
          <div className="sm:col-span-1 mt-2">
            <input
              id="email"
              name="email"
              type="email"
              {...register("email", {
                required: "This field is required",
              })}
              placeholder="Enter your Email"
              className="block w-full h-14 border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-orange-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 focus-visible:outline focus-visible:outline-0 sm:text-sm bg-orange-50 sm:leading-6"
            />
          </div>
          <div className="sm:col-span-1 mt-2">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              {...register("password", {
                required: "This field is required",
              })}
              className="block w-full h-14 border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-orange-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 focus-visible:outline focus-visible:outline-0 sm:text-sm bg-orange-50 sm:leading-6"
            />
          </div>
          <div className="sm:col-span-1 mt-2 flex justify-center">
            <Button size="small" disabled={isLoading}>
              {!isLoading ? "Log in" : <SpinnerMini />}
            </Button>
          </div>
        </div>
        <div className="flex justify-between h-20 p-4">
          <hr className=" w-40" style={{ alignSelf: "center" }} />
          <span
            className="text-sm text-gray-400"
            style={{ alignSelf: "center" }}
          >
            Don’t have an account?
            <Link to="/sign-up" className="text-orange-400">
              Sign Up
            </Link>
          </span>
          <hr className=" w-40" style={{ alignSelf: "center" }} />
        </div>
      </form>
    </>
  );
}

export default LoginSection;
