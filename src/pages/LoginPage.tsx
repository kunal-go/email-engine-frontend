import { Button, Container, PasswordInput, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-location";
import { apiUserLogin } from "../apis";
import { setAccessToken } from "../core";

type FormData = {
  username: string;
  password: string;
};

export const LoginPage = () => {
  const { register, handleSubmit, reset, formState } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const { data } = await apiUserLogin(formData);
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
      <Container className="flex flex-col min-h-screen justify-around">
        <div className="max-w-xl mx-auto flex flex-col gap-8 bg-white p-8 rounded-lg w-full">
          <h2 className="text-4xl font-bold text-center">
            Email Engine Portal Login
          </h2>
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
                label="Password"
                {...register("password", { required: "Password is required" })}
              />
            </div>
            <Button
              type="submit"
              className=" w-full my-3"
              loading={formState.isLoading}
              disabled={formState.isSubmitting}
            >
              Login
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};
