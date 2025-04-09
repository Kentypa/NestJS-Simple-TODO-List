import { Navigate, Outlet } from "react-router";
import React from "react";

type ProtectedRouteProps = {
  isAuthorized: boolean;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthorized,
}) => {
  return <>{isAuthorized ? <Outlet /> : <Navigate to="/sign-in" />}</>;
};
