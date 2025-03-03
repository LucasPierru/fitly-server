import { Types } from "mongoose";
import { DefaultProperties } from "./common.types";
import { ISubscription } from "./subscription.types";

export type Sex = "male" | "female";

export type HowActive = "sedentary" | "light" | "moderate" | "active" | "very_active";

export type Goal = "fat_loss" | "muscle_gain" | "improve_stamina" | "maintenance";

export type IUser = DefaultProperties & {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  birthday?: string;
  bmr?: number;
  sex: Sex;
  howActive: HowActive;
  goal: Goal;
  stripeCustomerId?: string;
  subscription?: Types.ObjectId | ISubscription;
};
