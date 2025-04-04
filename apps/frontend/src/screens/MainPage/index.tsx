import { FC } from "react";
import { PageWrapper } from "../../components/UI/PageWrapper";

export const MainPage: FC = () => {
  return (
    <PageWrapper>
      <main className="mt-10 flex flex-col flex-grow justify-between gap-3 border rounded-2xl p-3 h-full max-h-50">
        <h1>Main content</h1>
        <h2>Some things</h2>
      </main>
    </PageWrapper>
  );
};
