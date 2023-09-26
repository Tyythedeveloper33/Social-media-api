const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
// get all users
//`GET` a single user by its `_id` and populated thought and friend data
//POST` a new user:
//PUT` to update a user by its `_id
//`DELETE` to remove user by its `_id
router.use('/users', userRoutes);
//get all thoughts
//get a single thought by _id
//`POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
router.use('/thoughts', thoughtRoutes);

module.exports = router;