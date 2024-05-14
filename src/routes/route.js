const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller')
const auth = require('../middleware/jwt')

router.post('/sign-up', user.signUp);
router.post('/sign-in', user.signIn);
router.get('/:id', auth.authenticateJWT, user.getUserName);
router.post('/job', auth.authenticateJWT, user.signIn)

module.exports = router;