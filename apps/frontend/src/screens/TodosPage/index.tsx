import { FC } from "react";
import { PageWrapper } from "../../components/UI/PageWrapper";
import { TodosContent } from "../../components/TodosContent";

export const TodosPage: FC = () => {
  return (
    <PageWrapper>
      <TodosContent />
    </PageWrapper>
  );
};
