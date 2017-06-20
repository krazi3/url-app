import express from 'express';
import urlRoutes from './url.route';

const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount url routes at /urls
router.use('/urls', urlRoutes);

export default router;
