import { Request, Response } from "express";
import User from "../../models/users.mongo";
import { IUser } from "../../types/users.types";

export const httpGetProfile = async (req: Request, res: Response) => {
  try {
    const profile = await User.findById(req.user!.id);
    if (!profile) throw Error("no user was found");
    const {
      email,
      firstName,
      lastName,
      birthday,
      weight,
      height,
      bmr,
      sex,
      howActive,
    } = profile;
    res.status(200).json({
      profile: {
        email,
        firstName,
        lastName,
        birthday,
        weight,
        height,
        howActive,
        bmr,
        sex,
      },
      message: `Succesfully fetched ${req.user!.id}`,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      profile: null,
      message: `Cannot access profile information ${req.user!.id}`,
      error,
    });
  }
};

export const httpUpdateProfile = async (
  req: Request<{}, {}, Omit<IUser, "password">>,
  res: Response
) => {
  try {
    const newProfile = await User.findByIdAndUpdate(req.user!.id, req.body);
    res
      .status(201)
      .json({ newProfile, message: `Profile ${req.user!.id} updated` });
  } catch (error) {
    res
      .status(400)
      .json({ message: `Profile ${req.user!.id} failed to update`, error });
  }
};
