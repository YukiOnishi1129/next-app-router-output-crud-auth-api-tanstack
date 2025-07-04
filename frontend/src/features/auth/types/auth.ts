import { UserType } from "@/features/users/types";

export type AuthType = {
  token: string;
  user: UserType;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
};
