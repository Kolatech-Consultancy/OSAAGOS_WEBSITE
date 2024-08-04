// import FirstSection from "./firstSection";
// import SignUpSection from "./signupSection";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors, isLoading: isLoad } = formState;
  const isLoading = false;
  const navigate = useNavigate();

  const registerUser = async (userData) => {
    try {
      const response = await axios.post(
        " https://osaagos-api-alumni-website.onrender.com/api/users/register",
        userData
      );
      console.log(isLoad);

      console.log("User registered successfully:", response.data);

      console.log(isLoad);
      navigate("/login");
    } catch (error) {
      console.error(
        "Error registering user:",
        error.response ? error.response.data : error.message
      );
    }
  };

  function onSubmit({ name, email, password }) {
    const regData = { name, email, password };
    registerUser(regData);
  }

  return (
    <>
      {/* <FirstSection/>
            <SignUpSection/> */}
      <p className="text-4xl text-center font-semibold mt-8">Register User</p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Full name" error={errors?.fullName?.message}>
          <Input
            type="text"
            id="name"
            disabled={isLoading}
            {...register("name", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="Email address" error={errors?.email?.message}>
          <Input
            type="email"
            id="email"
            disabled={isLoading}
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Password (min 8 characters)"
          error={errors?.password?.message}
        >
          <Input
            type="password"
            id="password"
            disabled={isLoading}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Repeat password"
          error={errors?.passwordConfirm?.message}
        >
          <Input
            type="password"
            id="passwordConfirm"
            disabled={isLoading}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Passwords need to match",
            })}
          />
        </FormRow>

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button
            variation="secondary"
            type="reset"
            disabled={isLoading}
            onClick={reset}
          >
            Cancel
          </Button>
          <Button disabled={isLoading}>Submit</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default SignUp;
