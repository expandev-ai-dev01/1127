import { Router } from 'express';
import * as taskController from '@/api/v1/internal/task/controller';

const router = Router();

/**
 * @summary Internal (authenticated) routes
 * @description Protected API endpoints requiring authentication
 */

/**
 * @summary Task management routes
 */
router.post('/task', taskController.postHandler);
router.get('/task', taskController.getHandler);

export default router;
