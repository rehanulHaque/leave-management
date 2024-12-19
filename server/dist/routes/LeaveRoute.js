"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_config_1 = __importDefault(require("../utils/multer-config"));
const utils_1 = __importDefault(require("../utils"));
const Leave_1 = __importDefault(require("../models/Leave"));
const middleware_1 = require("../middleware/middleware");
const router = express_1.default.Router();
// USER APPLY LEAVE
router.post("/apply-leave", multer_config_1.default.single("image"), middleware_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate, reason, userId } = req.body;
        if (!startDate || !endDate || !reason || !userId)
            return res
                .status(400)
                .json({ message: "All fields are required", sucess: false });
        const upload = utils_1.default.uploader.upload(req.file.path, {
            folder: "collage-leave-application",
        });
        const documentUrl = (yield upload).url;
        const leaveApplocation = yield Leave_1.default.create({
            from: startDate,
            to: endDate,
            reason,
            documentUrl,
            user: userId,
        });
        res.status(200).json({ message: "Leave Applied", sucess: true });
    }
    catch (error) {
        res.status(500).json({ message: error.message, sucess: false });
    }
}));
// USER CHECK ACTIVE LEAVE APPLICATION AND HISTORY
router.get("/check-leave", middleware_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqWithUser = req;
        const userId = reqWithUser.user.id;
        const applicationList = yield Leave_1.default.find({ user: userId });
        res.status(200).json({ applicationList, sucess: true });
    }
    catch (error) {
        res.status(500).json({ message: error.message, sucess: false });
    }
}));
// ADMIN CHECK LEAVE APPLICATION OF SINGLE USER
router.get("/check-leave/:userId", middleware_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqWithUser = req;
        if (reqWithUser.user.role === "admin") {
            const userId = req.params.userId;
            const applicationList = yield Leave_1.default.find({ user: userId });
            res.status(200).json({ applicationList, sucess: true });
        }
        else {
            return res
                .status(401)
                .json({ message: "Only Admin Can Approve", sucess: false });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message, sucess: false });
    }
}));
// ADMIN CHECK LEAVE APPLICATION
router.get("/check-all-leave", middleware_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqWithUser = req;
        if (reqWithUser.user.role === "admin") {
            const applicationList = yield Leave_1.default.find({});
            res.status(200).json({ applicationList, sucess: true });
        }
        else {
            return res
                .status(401)
                .json({ message: "Only Admin Can Approve", sucess: false });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message, sucess: false });
    }
}));
// ADMIN APPROVE LEAVE APPLICATION
router.patch("/approve-leave/:userId", middleware_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqWithUser = req;
        if (reqWithUser.user.role === "admin") {
            const userId = req.params.userId;
            const applicationList = yield Leave_1.default.findOneAndUpdate({ _id: userId }, { status: "approved" }, { new: true });
            res
                .status(200)
                .json({ message: "Request Approved sucessfully", sucess: true, applicationList });
        }
        else {
            return res
                .status(401)
                .json({ message: "Only Admin Can Approve", sucess: false });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message, sucess: false });
    }
}));
// ADMIN REJECT LEAVE APPLICATION
router.patch("/reject-leave/:userId", middleware_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqWithUser = req;
        if (reqWithUser.user.role === "admin") {
            const userId = req.params.userId;
            const applicationList = yield Leave_1.default.findOneAndUpdate({ _id: userId }, { status: "rejected" }, { new: true });
            res
                .status(200)
                .json({ message: "Request Approved sucessfully", sucess: true, applicationList });
        }
        else {
            return res
                .status(401)
                .json({ message: "Only Admin Can Approve", sucess: false });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message, sucess: false });
    }
}));
exports.default = router;
