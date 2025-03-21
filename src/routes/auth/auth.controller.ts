import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { startSession } from "mongoose";
import User from "../../models/users.mongo";
import { comparePasswords, hashPassword } from "../../services/hash";
import "dotenv/config";
import { createCustomer } from "../../services/customer/create-customer";
import { IUser } from "../../types";

export const httpLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await comparePasswords(password, user.password))) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    const token = jwt.sign({ id: user?._id, email }, process.env.JWT_SECRET!, {
      expiresIn: "24h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 3600 * 1000 * 24,
      path: "/",
    });
    res.json({ token, message: "Login succesful", error: null });
  } catch (error) {
    res.status(500).json({ token: null, message: "Login failed", error });
  }
};

export const httpRegister = async (req: Request<{}, {}, IUser>, res: Response) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const { email, password, firstName, lastName, height, weight, bmr, howActive, sex, goal, birthday } = req.body;

    if (!email || !password || !firstName || !lastName) {
      res.status(400).json({
        error: "Credentials missing",
      });
    }

    if (await User.exists({ email })) {
      res.status(409).json({
        error: "User already exists",
      });
    }

    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      height,
      weight,
      bmr,
      howActive,
      sex,
      goal,
      birthday,
    });

    const customer = await createCustomer(email, `${firstName} ${lastName}`);

    user.stripeCustomerId = customer.id;
    await user.save();

    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET!, {
      expiresIn: "24h",
    });
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({ token, message: "User created successfully" });
  } catch (error) {
    console.log({ error });
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: "Registration failed", error });
  }
};

export const httpUpdatePassword = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await User.findOneAndUpdate({ _id: req.user?.id }, { password: hashedPassword });
    res.status(201).json({ id: user?.id, message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Registration failed", error });
  }
};
