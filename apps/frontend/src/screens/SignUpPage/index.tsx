import { FC, useEffect } from "react";
import { PageWrapper } from "../../components/UI/PageWrapper";
import { useForm } from "../../hooks/use-form";
import { Queries } from "../../enums/queries";
import { useNavigate } from "react-router";
import { RoutesPaths } from "../../enums/routes-path";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../../services/authService";

export const SignUpPage: FC = () => {
  const { signUpUser } = authService(Queries.AUTH);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const registerMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const { formState, handleChange, handleSubmit } = useForm(
    { email: "", password: "" },
    (formState) => {
      registerMutation.mutate(formState);
    }
  );

  useEffect(() => {
    if (registerMutation.isSuccess) {
      navigate(RoutesPaths.SIGN_IN);
    }
  }, [registerMutation.isSuccess, navigate]);

  return (
    <PageWrapper>
      <form
        className="flex flex-col mt-20 border gap-3 p-3 rounded-2xl"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">Email: </label>
        <input
          name="email"
          type="email"
          id="email"
          value={formState.email}
          onChange={handleChange}
          className="border rounded-xl p-1.5"
          autoComplete="on"
          required
        />
        <label htmlFor="password">Password: </label>
        <input
          name="password"
          type="password"
          id="password"
          value={formState.password}
          onChange={handleChange}
          className="border rounded-xl p-1.5"
          autoComplete="on"
          required
        />
        <button className="bg-gray-300 hover:bg-gray-500 rounded-xl p-1.5">
          Sign up
        </button>
      </form>
      {registerMutation.isError && (
        <h2>
          Can`t register:{" "}
          {registerMutation.error.message.includes("409")
            ? "This email is already used"
            : registerMutation.error.message}
        </h2>
      )}
    </PageWrapper>
  );
};
