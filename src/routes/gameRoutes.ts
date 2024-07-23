import { Router } from 'express';
import { startGame, playMove } from '../controllers/gameController';

const router = Router();

router.post('/start', startGame);
router.post('/move', playMove);

export default router;
