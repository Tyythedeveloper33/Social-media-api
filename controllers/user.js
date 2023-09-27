const { Users, thoughts } = require('../models');

const userFunctions = {
    // Get all users
    async getAllUsers(req, res) {
        try {
          // Attempt to find all users in the database
          const result = await Users.find({})
            .populate('friends')     // Populate the 'friends' field of users
            .populate('thoughts');    // Populate the 'thoughts' field of users
          
          // If the query is successful, send a JSON response with a status of 200 (OK)
          res.status(200).json(result);
        } catch (err) {
          // If an error occurs during the query or population, catch the error
          console.error(err);
          // Send an error response (HTTP status 500) with the error details
          res.status(500).send(err);
        }
      },
    
  
    // Create a user
    createNewUser(req, res) {
        // Use the Mongoose `create` method to create a new user document
        Users.create(req.body)
          .then((userData) => {
            // If the user is successfully created, send the user data as JSON
            res.json(userData);
          })
          .catch((err) => {
            // If an error occurs during user creation, log the error
            console.error(err);
            // Send an error response (HTTP status 500) with the error details as JSON
            res.status(500).json({ error: "An error occurred while creating a new user." });
          });
      },
    
  
      getOneUser(req, res) {
        // Use the Mongoose `findOne` method to find a user by their user ID
        Users.findOne({ _id: req.params.userId })
          .select('-__v') // Exclude the '__v' field from the result
          .populate('friends') // Populate the 'friends' field
          .populate('thoughts') // Populate the 'thoughts' field
          .then((userData) => {
            if (!userData) {
              // If no user is found, send a 404 (Not Found) response
              return res.status(404).json({ message: 'User not found.' });
            }
            // Send the user data as JSON with a status of 200 (OK)
            res.json(userData);
          })
          .catch((err) => {
            // If an error occurs during the query, log the error and send a 500 (Internal Server Error) response
            console.error(err);
            res.status(500).json({ error: 'An error occurred while retrieving the user.' });
          });
      },


      
      // Update a user's data by their user ID
  async updateUser(req, res) {
    try {
      // Use async/await to find and update a user by their user ID
      const userData = await Users.findOneAndUpdate(
        { _id: req.params.userId }, // Find the user by their user ID
        { $set: req.body }, // Update the user's data with the data from req.body
        { runValidators: true, new: true } // Options: run validators and return the updated user data
      );
      
      if (!userData) {
        // If no user is found, send a 404 (Not Found) response with an appropriate message
        return res.status(404).json({ message: 'User not found, please try again.' });
      }
      
      // Send the updated user data as JSON with a status of 200 (OK)
      res.json(userData);
    } catch (error) {
      // If an error occurs during the update, log the error and send a 500 (Internal Server Error) response with an error message
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
  },

 // Add a new friend to a user's list of friends
 addNewFriend(req, res) {
    // Use the Mongoose `findOneAndUpdate` method to find and update a user by their user ID
    Users.findOneAndUpdate(
      { _id: req.params.userId }, // Find the user by their user ID
      { $addToSet: { friends: req.params.friendId } }, // Add the friend to the 'friends' array (if not already present)
      { new: true } // Options: return the updated user data
    )
      .then((userData) => {
        if (!userData) {
          // If no user is found, send a 404 (Not Found) response with an appropriate message
          return res.status(404).json({ message: 'User not found.' });
        }
        // Send the updated user data as JSON with a status of 200 (OK)
        res.json(userData);
      })
      .catch((err) => {
        // If an error occurs during the update, log the error and send a 500 (Internal Server Error) response with an error message
        console.error(err);
        res.status(500).json({ error: 'An error occurred while adding a new friend.' });
      });
  },


  // Delete a user by their user ID
  deleteUser(req, res) {
    // Use the Mongoose `findByIdAndDelete` method to find and delete a user by their user ID
    Users.findByIdAndDelete({ _id: req.params.userId })
      .then((userData) => {
        if (!userData) {
          // If no user with the specified ID is found, send a 404 (Not Found) response with an appropriate message
          return res.status(404).json({ message: 'User not found.' });
        }

        // If the user is successfully deleted, you can send a confirmation message or an empty response
        res.status(204).end(); // Respond with a 204 (No Content) status to indicate successful deletion
      })
      .catch((err) => {
        // If an error occurs during the deletion, log the error and send a 500 (Internal Server Error) response with an error message
        console.error(err);
        res.status(500).json({ error: 'An error occurred while deleting the user.' });
      });
  },

   // Remove a friend from a user's list of friends
   deleteFromFl(req, res) {
    // Use the Mongoose `findOneAndUpdate` method to find and update a user by their user ID
    Users.findOneAndUpdate(
      { _id: req.params.userId }, // Find the user by their user ID
      { $pull: { friends: req.params.friendId } }, // Remove the friend from the 'friends' array
      { new: true } // Options: return the updated user data
    )
      .then((userData) => {
        if (!userData) {
          // If no user with the specified ID is found, send a 404 (Not Found) response with an appropriate message
          return res.status(404).json({ message: 'User not found.' });
        }
        // Send the updated user data as JSON with a status of 200 (OK)
        res.json(userData);
      })
      .catch((err) => {
        // If an error occurs during the update, log the error and send a 500 (Internal Server Error) response with an error message
        console.error(err);
        res.status(500).json({ error: 'An error occurred while removing a friend.' });
      });
  },
// curly bracket to close userFunction object
}

  module.exports = userFunctions;