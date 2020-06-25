const router = require('express').Router();
const users = require('./users/routes');

router.use('/users', users);

module.exports = router;
