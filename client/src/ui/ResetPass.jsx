import { useForm } from "react-hook-form";
import Button from "./Button";
import Form from "./Form";
import FormRow from "./FormRow";
import Input from "./Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ResetPass() {
  const navigate = useNavigate();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors, isLoading } = formState;

  const findUser = async (userData) => {
    try {
      const response = await axios.get(
        "https://osaagos-api-alumni-website.onrender.com/api/users/profile/email",
        userData
      );
      if (response.data) {
        toast.success("User found");
        navigate("/reset");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  function onSubmit({ email }) {
    console.log("Submit clicked");

    const regData = { email };
    findUser(regData);
  }

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6 my-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Enter your email
      </h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          <Button
            variation="secondary"
            type="reset"
            size="small"
            disabled={isLoading}
            onClick={reset}
          >
            Cancel
          </Button>
          <Button disabled={isLoading} size="small">
            Submit
          </Button>
        </FormRow>
      </Form>
    </div>
  );
}

export default ResetPass;
