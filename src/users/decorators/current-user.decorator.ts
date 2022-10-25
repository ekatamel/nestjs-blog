import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, content: ExecutionContext) => {
    const request = content.switchToHttp().getRequest();
    return request.currentUser;
  },
);
