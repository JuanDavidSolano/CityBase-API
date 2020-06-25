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
router.route('/getMedicalHistory').get(protectedRoutes, controller.getMedicalHistory);
router.route('/getCriminalHistory').get(protectedRoutes, controller.getCriminalHistory);

// POSTS - PROTECTED ROUTES

// PUTS - PROTECTED ROUTES
router.route('/update').put(protectedRoutes, controller.update);
router.route('/setOrganization').put(protectedRoutes, controller.setOrganization);
router.route('/setMedicalHistory').put(protectedRoutes, controller.setMedicalHistory);
router.route('/setCriminalHistory').put(protectedRoutes, controller.setCriminalHistory);
router.route('/setHistoryAccess').put(protectedRoutes, controller.setHistoryAccess);
router.route('/setWanted').put(protectedRoutes, controller.setWanted);
router.route('/setDeceased').put(protectedRoutes, controller.setDeceased);
router.route('/setProperties').put(protectedRoutes, controller.setProperties);
router.route('/setLicenses').put(protectedRoutes, controller.setLicenses);
router.route('/setInsurances').put(protectedRoutes, controller.setInsurances);

module.exports = router;
