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
router.route("/").get(getAllThoughts).post(createNewThought)

router
.route("/:thoughtId").get(getOneThought).put(updateThought).delete(deleteThought);

router.route("/:userId/friends/:friendId").post(createReaction).delete(deleteReaction);


module.exports = router;