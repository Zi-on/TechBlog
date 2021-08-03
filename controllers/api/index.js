const router = require('express').Router();
const homeRoutes = require('./userRoutes');

router.use('/', homeRoutes);

module.exports = router;