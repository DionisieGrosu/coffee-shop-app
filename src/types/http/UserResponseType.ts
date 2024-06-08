import User from '../UserType';

export type UserResponseType = {
  success: boolean;
  token?: string;
  data?: User;
  message?: string;
  errors?: object;
};
