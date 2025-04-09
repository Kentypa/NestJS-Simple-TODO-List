import { createParamDecorator, ExecutionContext } from "@nestjs/common";

const getUserByContext = (context: ExecutionContext) =>
  context.switchToHttp().getRequest().user;

export const UserDecorator = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => getUserByContext(context)
);
