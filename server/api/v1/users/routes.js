const router = require('express').Router();

const protectedRoutes = require('../../../utils/protectedRoutes');

const controller = require('./controller');

// UNPROTECTED ROUTES
router.route('/signup').post(controller.signup);
router.route('/login').post(controller.login);

// GETS - PROTECTED ROUTES
router.route('/getInsurances').get(protectedRoutes, controller.getInsurances);
router.route('/getLicenses').get(protectedRoutes, controller.getLicenses);
router.route('/getProperties').get(protectedRoutes, controller.getProperties);
router.route('/getVehicles').get(protectedRoutes, controller.getVehicles);
router.route('/getMedicalHistory').get(protectedRoutes, controller.getMedicalHistory);
router.route('/getCriminalHistory').get(protectedRoutes, controller.getCriminalHistory);

// POSTS - PROTECTED ROUTES

// PUTS - PROTECTED ROUTES
router.route('/update').put(protectedRoutes, controller.update);
router.route('/setOrganization').put(protectedRoutes, controller.setOrganization);
router.route('/setHistoryAccess').put(protectedRoutes, controller.setHistoryAccess);
router.route('/setWanted').put(protectedRoutes, controller.setWanted);
router.route('/setDeceased').put(protectedRoutes, controller.setDeceased);

module.exports = router;
