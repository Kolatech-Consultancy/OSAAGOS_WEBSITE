import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import SpinnerMini from "../SpinnerMini";
import toast from "react-hot-toast";
import { useState } from "react";
import parseJwt from "../TokenDecoder";
import axios from "../../utils/axios";

function LoginSection() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async (userData) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/users/login", userData);
      const { token } = response.data;
      localStorage.setItem("token", token);
      const payload = parseJwt(token);
      reset();
      toast.success("User login successfully");
      if (payload.role === "Admin") {
        navigate("/dashboard");
      } else {
        navigate("/user/profile");
      }
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
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
        className="sm:p-20 p-4 md:w-2/3 w-full mx-auto"
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
        <div className="flex justify-between text-center h-20 px-4 pt-4">
          <hr
            className="w-40 md:block hidden"
            style={{ alignSelf: "center" }}
          />
          <span
            className="text-sm text-gray-400 flex gap-1 text-center justify-center items-center"
            style={{ alignSelf: "center" }}
          >
            Don’t have an account?
            <Link to="/sign-up" className="text-orange-400">
              Sign Up
            </Link>
          </span>
          <hr
            className="w-40 md:block hidden"
            style={{ alignSelf: "center" }}
          />
        </div>
        <div className="flex justify-center items-center">
          <Link
            to={"/reset-password"}
            className="text-center text-blue-500 hover:text-blue-700 text-sm font-semibold"
          >
            Forgot password
          </Link>
        </div>
      </form>
    </>
  );
}

export default LoginSection;
