import { Button, Container, PasswordInput, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-location";
import { apiUserRegister } from "../apis/user/apiUserRegister";
import { setAccessToken } from "../core";

type FormData = {
  username: string;
  createPassword: string;
  confirmPassword: string;
};

export const RegisterPage = () => {
  const { register, handleSubmit, reset, formState } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (formData) => {
    try {
      if (formData.createPassword !== formData.confirmPassword) {
        notifications.show({
          color: "red",
          message: "Passwords do not match",
        });
        return;
      }

      const { data } = await apiUserRegister({
        username: formData.username,
        password: formData.createPassword,
      });
      setAccessToken(data.accessToken);
      navigate({ to: "/" });
      reset();
    } catch (error) {
      console.log(error);
      notifications.show({
        color: "red",
        message:
          error instanceof Error ? error.message : "Something went wrong",
      });
    }
  });

  return (
    <div className="bg-gray-100">
      <Container className="flex flex-col min-h-screen">
        <div className="max-w-xl mx-auto flex flex-col gap-8 bg-white p-8 rounded-lg w-full mt-36">
          <h2 className="text-4xl font-bold text-center">
            Email Engine Portal
          </h2>
          <h3 className="text-2xl font-bold text-center">Register</h3>
          <form
            className="w-full flex flex-col items-center gap-3 "
            onSubmit={onSubmit}
          >
            <div className="w-full">
              <TextInput
                className="text-start"
                label="Username"
                {...register("username", { required: "Username is required" })}
              />
            </div>
            <div className="w-full">
              <PasswordInput
                className="text-start "
                label="Create Password"
                {...register("createPassword", {
                  required: "Password is required",
                })}
              />
            </div>
            <div className="w-full">
              <PasswordInput
                className="text-start "
                label="Confirm Password"
                {...register("confirmPassword", {
                  required: "Password is required",
                })}
              />
            </div>
            <Button
              type="submit"
              className=" w-full my-3"
              loading={formState.isLoading}
              disabled={formState.isSubmitting}
            >
              Create Account
            </Button>
          </form>

          <div>
            Already have an account?{" "}
            <a
              href="/login"
              onClick={() => navigate({ to: "/register" })}
              className="underline text-blue-500"
            >
              Login
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};
