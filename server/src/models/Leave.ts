import mongoose from 'mongoose'

const leaveSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    documentUrl: {
        type: String
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    }
}, {
    timestamps: true
})

const Leave = mongoose.model("Leave", leaveSchema)

export default Leave