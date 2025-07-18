import { Request, Response } from 'express';
import Journal from '../models/Journal';

export const getJournals = async (req: Request, res: Response) => {
  try {
    const journals = await Journal.find().sort({ createdAt: -1 });
    res.json(journals);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createJournal = async (req: Request, res: Response) => {
  try {
    const newJournal = new Journal(req.body);
    await newJournal.save();
    res.json(newJournal);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
