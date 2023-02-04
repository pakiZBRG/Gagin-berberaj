import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { sendEmail } from "../middleware/sendEmail";
import { LogInfo } from "./logs";
import User from "../models/User";

dotenv.config();

const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_URL
    : process.env.DEV_URL;

const register = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(({ msg, param }) => {
      return { message: msg, field: param };
    });
    return res.status(422).json(errorMessages);
  }

  if (req.file) {
    if (req.file.size > 1 * 1024 * 1024) {
      return res.status(415).json({ error: "Image size too big. 1MB is limit." });
    }
  }

  try {
    const emailExists = await User.exists({ email });
    const usernameExists = await User.exists({ username });

    if (emailExists && usernameExists) {
      return res.status(409).json([
        { message: "Email is taken.", field: "email" },
        { message: "Username is taken.", field: "username" },
      ]);
    } else if (emailExists) {
      return res
        .status(409)
        .json([{ message: "Email is taken.", field: "email" }]);
    } else if (usernameExists) {
      return res
        .status(409)
        .json([{ message: "Username is taken.", field: "username" }]);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  try {
    const user = new User(req.body);
    if (req.file) {
      user.image = req.file.path;
    }
    console.log({ user })
    user.activationToken = uuidv4();
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    sendEmail(
      req.body,
      `${CLIENT_URL}/activate/${user.activationToken}`,
      res,
      "activate",
      "Activate your account"
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      activationToken: req.body.token,
      status: "PENDING",
    });
    if (user) {
      req.user = user;
      user.status = "ACTIVE";
      user.activationToken = "";
      await user.save();
      return res
        .status(200)
        .json({ message: "User is successfully registered." });
    }
    return res.status(404).json({ user: false });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const activationValidToken = async (req: Request, res: Response) => {
  try {
    const token = req.params.token;
    const user = await User.exists({
      activateToken: token,
      status: "PENDING",
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const passwordValidToken = async (req: Request, res: Response) => {
  try {
    const token = req.params.token;
    const user = await User.exists({ passwordToken: token });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (username === '' || password === '') {
    return res.status(406).json({ message: "Input the empty fields." })
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "Invalid credentials." })
  }

  try {
    const compare = await bcrypt.compare(password, user.password);
    if (compare) {
      const token = jwt.sign(
        {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
        process.env.JWT_SECRET
      );

      await LogInfo(req, res, "login");
      return res.status(200).json({ token });
    }
    return res.status(404).json({ message: "Invalid credentials" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array()[0].msg);
  }

  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with email doesn't exist." });
    }

    user.passwordToken = uuidv4();
    await user.save();

    sendEmail(
      req.body,
      `${CLIENT_URL}/reset-password/${user.passwordToken}`,
      res,
      "forgotPassword",
      "Reset your password"
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  const { password, confirmPassword, token } = req.body;
  if (password === '' || confirmPassword === '') {
    return res.status(404).json({ message: "Input the passwords and confirm it." })
  }

  if (password !== confirmPassword) {
    return res.status(406).json({ message: "Passwords do not match." })
  }

  try {
    const user = await User.findOne({ passwordToken: token });
    if (user) {
      const isRepeated = await bcrypt.compare(password, user.password);
      if (isRepeated) {
        return res.status(409).json({
          message: "Password is already used. Please choose a different one.",
        });
      }
      user.password = await bcrypt.hash(password, 10);
      user.passwordToken = "";
      await user.save();
      await LogInfo(req, res, "reset-password");
      return res
        .status(200)
        .json({ message: "Password successfully reseted." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default {
  register,
  activate,
  activationValidToken,
  passwordValidToken,
  login,
  forgotPassword,
  resetPassword,
};
