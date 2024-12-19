import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";
import express from "express";
import { auth, CustomRequest } from "../middleware/middleware";
const router = express.Router();

// Register User
router.post("/register", async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password)
      return res
        .status(400)
        .json({ message: "All fields are required", sucess: false });

    const alreadyUser = await User.findOne({ email });

    if (alreadyUser)
      return res
        .status(400)
        .json({ message: "User already exists", sucess: false });

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashPassword,
      role,
    });
    const token = jwt.sign(
      { id: user._id, username, role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "30d" }
    );
    res
      .status(201)
      .json({ message: "User created successfully", sucess: true, token, username: user.username, role: user.role });
  } catch (error: any) {
    res.status(500).json({ message: error.message, sucess: false });
  }
});

// Login User
router.post("/login", async (req, res): Promise<any> => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "All fields are required", sucess: false });
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "User not found", sucess: false });
    const checkPassword = await bcrypt.compare(password, user.password!);

    if (!checkPassword)
      return res
        .status(400)
        .json({ message: "Invalid credentials", sucess: false });

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "30d" }
    );
    res
      .status(201)
      .json({ message: "User login successfully", sucess: true, token, username: user.username, role: user.role });
  } catch (error: any) {
    res.status(500).json({ message: error.message, sucess: false });
  }
});

// Get User Profile
router.get("/me", auth, async (req, res): Promise<any> => {
  try {
    const reqWithUser = req as CustomRequest;
    res.status(200).json({ user: reqWithUser.user, sucess: true });
  } catch (error: any) {
    res.status(500).json({ message: error.message, sucess: false });
  }
});
// Get User Profile
// router.get("/:id", auth, async (req, res): Promise<any> => {
//   try {
//     const user = await User.findById(req.params.id);
//     res.status(200).json({ user, sucess: true });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message, sucess: false });
//   }
// });

export default router;
