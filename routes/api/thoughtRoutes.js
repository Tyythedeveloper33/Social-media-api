const router = require("express").Router();

const {
    getAllThoughts, 
    getOneThought, // by  _id
    createNewThought,  
    updateThought, // by _id
    deleteThought,    // by _id
//    **`/api/thoughts/:thoughtId/reactions`**
   createReaction,
   deleteReaction
} = require('../../controllers/thoughts') // file holding thes names for proper functionality

//  api/user
router.route("/").get(getAllThoughts).post(createNewThought) // works perfect

router.route("/:thoughtId").get(getOneThought).put(updateThought).delete(deleteThought); // works perfect

router.route('/:thoughtId/reactions').post(createReaction); // working
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction); // createreaction is adding a frinds to the friends list instead of adding reaction


module.exports = router;