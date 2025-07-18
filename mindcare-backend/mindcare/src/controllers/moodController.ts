import { Request, Response } from 'express';
import { Mood } from '../models/Mood';

export const getMoods = async (req: Request, res: Response) => {
  try {
    const moods = await Mood.find().sort({ date: -1 });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createMood = async (req: Request, res: Response) => {
  try {
    const newMood = new Mood(req.body);
    await newMood.save();
    res.json(newMood);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
