import { Router, Request, Response } from 'express';
import { Mood } from '../models/Mood';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// POST /api/moods
router.post('/', authenticate, async (req: any, res: Response) => {
  const { mood, note } = req.body;

  try {
    const newMood = await Mood.create({
      mood,
      note,
      userId: req.user.id
    });

    res.status(201).json(newMood);
  } catch (err) {
    console.error('Error creating mood:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/moods (only current user's moods)
router.get('/', authenticate, async (req: any, res: Response) => {
  try {
    const moods = await Mood.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(moods);
  } catch (err) {
    console.error('Error fetching moods:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/moods/:id
router.delete('/:id', authenticate, async (req: any, res: Response) => {
  const { id } = req.params;
  await Mood.findByIdAndDelete(id);
  res.json({ message: 'Mood deleted' });
});

export default router;
