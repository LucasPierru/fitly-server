import { DefaultProperties } from "./common.types";

export type IUser = DefaultProperties & {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  bmr?: number;
};
