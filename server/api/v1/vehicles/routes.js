const router = require('express').Router();
const protectedRoutes = require('../../../utils/protectedRoutes');

const controller = require('./controller');

// POSTS - PROTECTED ROUTES
router.route('/create').post(protectedRoutes, controller.create);

// PUTS - PROTECTED ROUTES
router.route('/update').put(protectedRoutes, controller.update);

// GETS - PROTECTED ROUTES

// DELETES - PROTECTED ROUTES
router.route('/delete').delete(protectedRoutes, controller.delete);

module.exports = router;
