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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware/middleware");
const router = express_1.default.Router();
// Register User
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password)
            return res
                .status(400)
                .json({ message: "All fields are required", sucess: false });
        const alreadyUser = yield User_1.default.findOne({ email });
        if (alreadyUser)
            return res
                .status(400)
                .json({ message: "User already exists", sucess: false });
        const hashPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield User_1.default.create({
            username,
            email,
            password: hashPassword,
            role,
        });
        const token = jsonwebtoken_1.default.sign({ id: user._id, username, role }, process.env.JWT_SECRET || "secret", { expiresIn: "30d" });
        res
            .status(201)
            .json({ message: "User created successfully", sucess: true, token, username: user.username, role: user.role });
    }
    catch (error) {
        res.status(500).json({ message: error.message, sucess: false });
    }
}));
// Login User
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res
                .status(400)
                .json({ message: "All fields are required", sucess: false });
        const user = yield User_1.default.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found", sucess: false });
        const checkPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!checkPassword)
            return res
                .status(400)
                .json({ message: "Invalid credentials", sucess: false });
        const token = jsonwebtoken_1.default.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET || "secret", { expiresIn: "30d" });
        res
            .status(201)
            .json({ message: "User login successfully", sucess: true, token, username: user.username, role: user.role });
    }
    catch (error) {
        res.status(500).json({ message: error.message, sucess: false });
    }
}));
// Get User Profile
router.get("/me", middleware_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqWithUser = req;
        res.status(200).json({ user: reqWithUser.user, sucess: true });
    }
    catch (error) {
        res.status(500).json({ message: error.message, sucess: false });
    }
}));
// Get User Profile
// router.get("/:id", auth, async (req, res): Promise<any> => {
//   try {
//     const user = await User.findById(req.params.id);
//     res.status(200).json({ user, sucess: true });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message, sucess: false });
//   }
// });
exports.default = router;
