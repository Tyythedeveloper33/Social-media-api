const router = require("express").Router();

const {
    getAllUsers, 
    getOneUser, // by  _id
    createNewUser,  
    updateUser, // by _id
    deleteUser,    // by _id
//    **`/api/users/:userId/friends/:friendId`**
  addNewFriend,
   deleteFromFl
} = require('../../controllers/user') // file holding thes names for proper functionality

//  api/user
router.route("/").get(getAllUsers).post(createNewUser) //works perfectly

router.route("/:userId").get(getOneUser).put(updateUser).delete(deleteUser); // works perfectly

router.route("/:userId/friends/:friendId").post(addNewFriend).delete(deleteFromFl); // working successfully

module.exports = router;