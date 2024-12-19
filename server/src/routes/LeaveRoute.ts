import express from "express";
import upload from "../utils/multer-config";
import cloudinary from "../utils";
import Leave from "../models/Leave";
import { auth, CustomRequest } from "../middleware/middleware";
const router = express.Router();

// USER APPLY LEAVE
router.post(
  "/apply-leave",
  upload.single("image"),
  auth,
  async (req, res): Promise<any> => {
    try {
      const { startDate, endDate, reason, userId } = req.body;
      if (!startDate || !endDate || !reason || !userId)
        return res
          .status(400)
          .json({ message: "All fields are required", sucess: false });
      const upload = cloudinary.uploader.upload(req.file!.path, {
        folder: "collage-leave-application",
      });

      const documentUrl = (await upload).url;
      const leaveApplocation = await Leave.create({
        from: startDate,
        to: endDate,
        reason,
        documentUrl,
        user: userId,
      });

      res.status(200).json({ message: "Leave Applied", sucess: true });
    } catch (error: any) {
      res.status(500).json({ message: error.message, sucess: false });
    }
  }
);

// USER CHECK ACTIVE LEAVE APPLICATION AND HISTORY
router.get("/check-leave", auth, async (req, res): Promise<any> => {
  try {
    const reqWithUser = req as CustomRequest;
    const userId = reqWithUser.user.id;
    const applicationList = await Leave.find({ user: userId });
    res.status(200).json({ applicationList, sucess: true });
  } catch (error: any) {
    res.status(500).json({ message: error.message, sucess: false });
  }
});


// ADMIN CHECK LEAVE APPLICATION OF SINGLE USER
router.get("/check-leave/:userId", auth, async (req, res): Promise<any> => {
  try {
    const reqWithUser = req as CustomRequest;
    if (reqWithUser.user.role === "admin") {
      const userId = req.params.userId;
      const applicationList = await Leave.find({ user: userId });
      res.status(200).json({ applicationList, sucess: true });
    } else {
      return res
        .status(401)
        .json({ message: "Only Admin Can Approve", sucess: false });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message, sucess: false });
  }
});

// ADMIN CHECK LEAVE APPLICATION
router.get("/check-all-leave", auth, async (req, res): Promise<any> => {
  try {
    const reqWithUser = req as CustomRequest;
    if (reqWithUser.user.role === "admin") {
      const applicationList = await Leave.find({});
      res.status(200).json({ applicationList, sucess: true });
    } else {
      return res
        .status(401)
        .json({ message: "Only Admin Can Approve", sucess: false });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message, sucess: false });
  }
});

// ADMIN APPROVE LEAVE APPLICATION
router.patch("/approve-leave/:userId", auth, async (req, res): Promise<any> => {
  try {
    const reqWithUser = req as CustomRequest;
    if (reqWithUser.user.role === "admin") {
      const userId = req.params.userId;
      const applicationList = await Leave.findOneAndUpdate(
        { _id: userId },
        { status: "approved" }
      , { new: true });
      res
        .status(200)
        .json({ message: "Request Approved sucessfully", sucess: true, applicationList });
    } else {
      return res
        .status(401)
        .json({ message: "Only Admin Can Approve", sucess: false });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message, sucess: false });
  }
});
// ADMIN REJECT LEAVE APPLICATION
router.patch("/reject-leave/:userId", auth, async (req, res): Promise<any> => {
  try {
    const reqWithUser = req as CustomRequest;
    if (reqWithUser.user.role === "admin") {
      const userId = req.params.userId;
      const applicationList = await Leave.findOneAndUpdate(
        { _id: userId },
        { status: "rejected" }
      , { new: true });
      res
        .status(200)
        .json({ message: "Request Approved sucessfully", sucess: true, applicationList });
    } else {
      return res
        .status(401)
        .json({ message: "Only Admin Can Approve", sucess: false });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message, sucess: false });
  }
});

export default router;
