import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { TodosPage } from "../TodosPage";
import { MainPage } from "../MainPage";
import { UserProfilePage } from "../UserProfilePage";
import { SignInPage } from "../SignInPage";
import { SignUpPage } from "../SignUpPage";
import { ProtectedRoute } from "../../components/UI/ProtectedRoute";

export const ApplicationRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/todos" element={<TodosPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Route>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};
