import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { TodosPage } from "../TodosPage";
import { MainPage } from "../MainPage";
import { UserProfilePage } from "../UserProfilePage";
import { SignInPage } from "../SignInPage";
import { SignUpPage } from "../SignUpPage";
import { ProtectedRoute } from "../../components/UI/ProtectedRoute";
import { useSelector } from "react-redux";
import { authSelector } from "../../stores/selectors/authSelector";

export const ApplicationRoutes: FC = () => {
  const isAuth = useSelector(authSelector);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route element={<ProtectedRoute isAuthorized={isAuth} />}>
          <Route path="/todos" element={<TodosPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Route>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};
