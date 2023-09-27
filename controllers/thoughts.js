const { Users, thoughts } = require('../models');

const thoughtsFunctions = {
    // Get all users
    async getAllThoughts(req, res) {
        try {
          // Attempt to find all users in the database
          const thoughtData = await thoughts.find({})
          .sort({ createdAt: -1 })
          
          // If the query is successful, send a JSON response with a status of 200 (OK)
          res.status(200).json(thoughtData);
        } catch (err) {
          // If an error occurs during the get method, catch the error
          console.error(err);
          // Send an error response (HTTP status 500) with the error details
          res.status(500).send(err);
        }
      },
    
  
    // Create a user
    createNewThought(req, res) {
        // Use the Mongoose `create` method to create a new user thought
        thoughts.create(req.body)
          .then((thoughtsData) => {
            // If the thought is successfully created, send the user data as JSON
            res.json(thoughtsData);
          })
          .catch((err) => {
            // If an error occurs during thought creation, log the error
            console.error(err);
            // Send an error response (HTTP status 500) with the error details as JSON
            res.status(500).json({ error: "An error occurred while creating a new thought." });
          });
      },
    
  
      getOneThought(req, res) {
        // Use the Mongoose `findOne` method to find a thought by the ID
        thoughts.findOne({ _id: req.params.thoughtId })
          .then((thoughtsData) => {
            if (!thoughtsData) {
              // If no thought is found, send a 404 (Not Found) response
              return res.status(404).json({ message: 'thought not found.' });
            }
            // Send the user data as JSON with a status of 200 (OK)
            res.json(thoughtsData);
          })
          .catch((err) => {
            // If an error occurs during the query, log the error and send a 500 (Internal Server Error) response
            console.error(err);
            res.status(500).json({ error: 'An error occurred while retrieving the thought.' });
          });
      },


      
      // Update a thoughts data by the ID
  async updateThought(req, res) {
    try {
      // Use async/await to find and update a thought by the ID
      const thoughtData = await thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId }, // Find the thought by the ID
        { $set: req.body }, // Update the thoughts data with the data from req.body
        { runValidators: true, new: true } // Options: run validators and return the updated thought data
      );
      
      if (!thoughtData) {
        // If no thought is found, send a 404 (Not Found) response with an appropriate message
        return res.status(404).json({ message: 'thought not found, please try again.' });
      }
      
      // Send the updated thought data as JSON with a status of 200 (OK)
      res.json(thoughtData);
    } catch (error) {
      // If an error occurs during the update, log the error and send a 500 (Internal Server Error) response with an error message
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
  },

 // Add a new friend to a user's list of friends
 createReaction(req, res) {
    // Use the Mongoose `findOneAndUpdate` method to find and update a user by their user ID
    thoughts.findOneAndUpdate(
      { _id: req.params.userId }, // Find the user by their user ID
      { $addToSet: { reactions: req.body } }, // Add the friend to the 'friends' array (if not already present)
      { new: true } // Options: return the updated user data
    )
      .then((thoughtsData) => {
        if (!thoughtsData) {
          // If no user is found, send a 404 (Not Found) response with an appropriate message
          return res.status(404).json({ message: 'User not found.' });
        }
        // Send the updated user data as JSON with a status of 200 (OK)
        res.json(thoughtsData);
      })
      .catch((err) => {
        // If an error occurs during the update, log the error and send a 500 (Internal Server Error) response with an error message
        console.error(err);
        res.status(500).json({ error: 'An error occurred while adding a new friend.' });
      });
  },


   // Delete a specific reaction from a thought by thought ID and reaction ID
   deleteReaction(req, res) {
    // Use the Mongoose `findOneAndUpdate` method to find and update a thought by its thought ID
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId }, // Find the thought by its thought ID
      { $pull: { reactions: { reactionId: req.params.reactionId } } }, // Remove the specified reaction from the 'reactions' array
      { runValidators: true, new: true } // Options: run validators and return the updated thought data
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          // If no thought with the specified ID is found, send a 404 (Not Found) response with an appropriate message
          return res.status(404).json({ message: 'No thought with this id is found.' });
        }
        // Send the updated thought data as JSON with a status of 200 (OK)
        res.json(thoughtData);
      })
      .catch((err) => {
        // If an error occurs during the update, log the error and send a 500 (Internal Server Error) response with an error message
        console.error(err);
        res.status(500).json({ error: 'An error occurred while deleting the reaction.' });
      });
  },

   // Remove a friend from a user's list of friends
   deleteThought(req, res) {
    // Use the Mongoose `findOneAndUpdate` method to find and update a user by their user ID
    thoughts.findOneAndRemove(
      { _id: req.params.userId }, // Find the user by their user ID
    )
      .then((thoughtsData) => {
        if (!thoughtsData) {
          // If no user with the specified ID is found, send a 404 (Not Found) response with an appropriate message
          return res.status(404).json({ message: 'thoughts not found.' });
        }
        // Send the updated user data as JSON with a status of 200 (OK)
        res.json(thoughtsData);
      })
      .catch((err) => {
        // If an error occurs during the update, log the error and send a 500 (Internal Server Error) response with an error message
        console.error(err);
        res.status(500).json({ error: 'An error occurred while removing a thought.' });
      });
  },
// curly bracket to close userFunction object
}

  module.exports = thoughtsFunctions;