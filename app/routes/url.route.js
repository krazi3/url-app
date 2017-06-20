import urlCtrl from '../controllers/url.controller';
import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation.js';

const router = express.Router();

router.route('/')
  /** GET /urls - list of saved urls */
  .get(urlCtrl.list)


  /** POST /urls - save url and its metadata */
  .post(validate(paramValidation.extractUrl), urlCtrl.extract);

export default router;
