const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller')
const job = require('../controllers/job.controller')
const auth = require('../middleware/jwt')

router.post('/sign-up', user.signUp);
router.post('/sign-in', user.signIn);
router.get('/list-job', auth.authenticateJWT, job.getListJob);
router.get('/job/:id', auth.authenticateJWT, job.getDetailJob);

module.exports = router;