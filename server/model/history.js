import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    url: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true,
        enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD']
    },
    headers: {
        type: Object,
        default: {}
    },
    body: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },
    response: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },
    status: {
        type: Number
    },
    time: {
        type: Number // Time in ms
    },
    size: {
        type: Number // Size in bytes
    }
}, { timestamps: true });

const History = mongoose.model("History", historySchema);

export default History;
