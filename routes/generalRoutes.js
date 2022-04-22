const express = require('express');
const controller = require('../controllers/generalController');
const router = express.Router();
const {isLoggedIn, isAuthor} = require('../middlewares/auth');
const{validateId, validateStory, validateResult} = require('../middlewares/validator');


//GET /index homepage
router.get('/', controller.index);

//GET /about page
router.get("/about", controller.about);

//GET /contact page
router.get('/contact', controller.contact);

module.exports = router;