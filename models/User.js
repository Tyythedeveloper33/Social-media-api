// Require schema and model from mongoose
const mongoose = require('mongoose');

// Construct a new instance of the schema class
const UserSchema = new mongoose.Schema({
  // Configure individual properties using Schema Types
  username: { type: String, required: true },
  thoughtText: { type: String, required: false },
  // The type of data is set to 'String' and required is set to false, meaning it will accept null values
 reactions: { type: String, required: false },
  
  reactionCount: Number,
  // Use built in date method to get current date
  createdat: { type: Date, default: Date.now },
});

// Using mongoose.model() to compile a model based on the schema 'bookSchema'
const Users = mongoose.model('MyUser', UserSchema);

// Create new instances of the model, a document
Users.create([
  { username: 'tyythegoon',thoughtText: "im in my own world", },
  { username: 'enphanamus', thoughtText: "im in my own world"},
  { username: '2cups',thoughtText: "im in my own world"},
  { username: 'diamond2flatt', thoughtText: "im in my own world" },
  { username: 'gotmonion',thoughtText: "im in my own world" },
  { username: 'petty',thoughtText: "im in my own world"},
  { username: 'glorr',thoughtText: "im in my own world" },
]);

module.exports = Users;
