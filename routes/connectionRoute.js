const express = require('express');
const controller = require('../controllers/connectionController');
const router = express.Router();
const {isLoggedIn, isAuthor} = require('../middlewares/auth');
const{validateId, validateStory, validateResult} = require('../middlewares/validator');


//GET /stories send all stories to user
router.get('/', controller.index);

//GET /stories/new: send html form for creating new stories
router.get("/new", isLoggedIn, controller.new);

//POST /stories send a create a new story
router.post('/', isLoggedIn, validateStory,validateResult,controller.create);

//GET /stories/:id send details of story identified by id
router.get('/:id',validateId, controller.show);

//GET /spories/:id/edit : send html form for editing an existing story
router.get("/:id/edit", validateId, isLoggedIn, isAuthor, controller.edit);

//PUT /stories/:id  :update the story identified by id
router.put("/:id", validateId, isLoggedIn, isAuthor, validateStory,validateResult, controller.update);

//delete /stories/:id delete the story identified by id
router.delete("/:id", validateId, isLoggedIn, isAuthor, controller.delete);

module.exports = router;