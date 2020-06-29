const router = require('express').Router();
const protectedRoutes = require('../../../utils/protectedRoutes');

const controller = require('./controller');

// POSTS - PROTECTED ROUTES
router.route('/create').post(protectedRoutes, controller.create);

// PUTS - PROTECTED ROUTES
router.route('/update').put(protectedRoutes, controller.update);
router.route('/remove').get(protectedRoutes, controller.remove);
router.route('/pay').get(protectedRoutes, controller.addPay);

// GETS - PROTECTED ROUTES
router.route('/getAll').get(protectedRoutes, controller.getAll);
router.route('/get').get(protectedRoutes, controller.getProperty);

// DELETES - PROTECTED ROUTES
router.route('/delete').delete(protectedRoutes, controller.delete);

module.exports = router;
