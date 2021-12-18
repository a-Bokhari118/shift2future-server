import express from 'express';
import { login, register } from '../controllers/auth';

const router = express.Router();

router.post('/admin/register', register);
router.post('/admin/login', login);

module.exports = router;
