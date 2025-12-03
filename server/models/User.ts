import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true }, // Simple string ID for now
    hearts: { type: Number, default: 5 },
    xp: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    gems: { type: Number, default: 150 },
    currentLevel: { type: Number, default: 1 },
    completedLevels: { type: [Number], default: [] },
    cooldownEndTime: { type: Date, default: null },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
