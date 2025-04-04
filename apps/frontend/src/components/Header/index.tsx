import { FC } from "react";
import { RoutesPaths } from "../../enums/routes-path";
import { LinkItem } from "../../types/link-item";
import { Navigation } from "../UI/Navigation";

const navigates: LinkItem[] = [
  { name: "Main page", link: RoutesPaths.MAIN_PAGE },
  { name: "Todo list", link: RoutesPaths.TODOS },
  { name: "User profile", link: RoutesPaths.USER_PROFILE },
  { name: "Sign in", link: RoutesPaths.SIGN_IN },
  { name: "Sign up", link: RoutesPaths.SIGN_UP },
];

export const Header: FC = () => {
  return (
    <header className="flex justify-around items-center w-full p-4 bg-gray-300">
      <Navigation
        menuItems={navigates}
        className={(isActive) => (isActive ? "font-bold text-md" : "text-sm")}
      />
    </header>
  );
};
