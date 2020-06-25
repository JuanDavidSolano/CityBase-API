const router = require('express').Router();

const protectedRoutes = require('../../../utils/protectedRoutes');

const controller = require('./controller');

router.route('/signup').post(controller.signup);
router.route('/login').post(controller.login);

module.exports = router;
