import { Router } from 'express';
import externalRoutes from '@/routes/v1/externalRoutes';
import internalRoutes from '@/routes/v1/internalRoutes';

const router = Router();

/**
 * @summary V1 API Router
 * @description Routes for API version 1
 */
router.use('/external', externalRoutes);
router.use('/internal', internalRoutes);

export default router;
