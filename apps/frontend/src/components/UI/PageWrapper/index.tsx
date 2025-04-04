import { ComponentWithChildren } from "../../../types/components-with-children";
import { Footer } from "../../Footer";
import { Header } from "../../Header";

export const PageWrapper: ComponentWithChildren = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
