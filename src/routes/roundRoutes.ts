import { Router } from 'express';
import { getAllRounds, getGameResults } from '../controllers/roundController';

const router = Router();

router.get('/allRounds', getAllRounds);
router.get('/gameResults', getGameResults);

export default router;
