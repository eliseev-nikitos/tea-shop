const Router = require('express');
const router = new Router();
const adminController = require("../controller/admin.controller");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });


router.get('/users', adminController.getUsers);
router.put(`/users/update/:id`, adminController.updateUser);
router.delete(`/users/delete/:id`, adminController.deleteUser);


router.get(`/tea`, adminController.getAddTea);
router.get(`/tea/:id`, adminController.getUpdateTea);
router.post(`/tea`, upload.single('img'), adminController.createTea);
router.put(`/tea/:id`, upload.single('img'), adminController.updateTea);
router.delete(`/tea/:id`, adminController.deleteTea);

module.exports = router;