import { UserInRequest } from './users.types';

declare global {
  namespace Express {
    interface Request {
      user: UserInRequest;
    }
  }
}
