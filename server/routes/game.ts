import express from 'express';
import { User } from '../models/User';

const router = express.Router();

// Get user game state
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        let user = await User.findOne({ userId });

        if (!user) {
            // Create new user if not exists (auto-registration for prototype)
            user = await User.create({ userId });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Sync/Update game state
router.post('/:userId/sync', async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body;

        // Prevent overwriting userId or _id
        delete updates.userId;
        delete updates._id;

        const user = await User.findOneAndUpdate(
            { userId },
            { $set: updates },
            { new: true, upsert: true } // Create if not exists
        );

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
