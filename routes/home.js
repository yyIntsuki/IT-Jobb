var express = require('express');
var router = express.Router();
var homeController = require('../controllers/home');

router.get('/hem', homeController.Index);
router.get('/profil', homeController.Profile);
router.get('/info', homeController.About);

module.exports = router;
