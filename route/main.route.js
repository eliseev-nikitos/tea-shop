const Router = require('express');
const router = new Router();
const mainController = require("../controller/main.controller");

router.get('/', mainController.getMain);
router.get('/auth', mainController.getAuth);
router.get('/registration', mainController.getRegistration);
router.get('/blog', mainController.getBlog);
router.get('/catalog', mainController.getCatalog);
router.get('/instruction', mainController.getInstruction);
router.get('/product/:id', mainController.getProduct);
router.get('/stat', mainController.getStat);
router.get('/logout', mainController.logout);

router.get('/search', mainController.search);


module.exports = router;
