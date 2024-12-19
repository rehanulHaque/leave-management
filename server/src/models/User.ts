import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

export default User
