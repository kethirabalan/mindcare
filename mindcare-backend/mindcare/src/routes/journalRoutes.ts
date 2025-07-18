import express from 'express';
import { getJournals, createJournal } from '../controllers/journalController';

const router = express.Router();

router.get('/', getJournals);
router.post('/', createJournal);

export default router;
