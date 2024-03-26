const Router = require('express');
const router = new Router();
const apiController = require("../controller/api.controller");



router.get('/visitors-data', apiController.getVisitorsData);
router.get('/tea-sales-data', apiController.getTeaSalesData);
router.get('/sales-by-packaging', apiController.getSalesByPackaging);
router.get('/sales-by-channels', apiController.getSalesByChannelsChart);
router.get('/tea-popularity-ratings', apiController.getTeaPopularityRatings);


router.post('/login', apiController.postLogin);
router.post('/registration', apiController.postRegistration);
router.post('/feedback', apiController.postFeedback);


router.get('/user', apiController.getOneUser);


module.exports = router;