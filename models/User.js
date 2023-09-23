// Require schema and model from mongoose
const mongoose = require('mongoose');
const thoughtSchema = new mongoose.Schema({
  title: { type: String, required: false },
 
});
const friendsSchema = new mongoose.Schema({
  title: { type: String, required: true },
 
});
// Construct a new instance of the schema class
const UserSchema = new mongoose.Schema({
  // Configure individual properties using Schema Types
  username: { type: String, required: true },
  thoughts: { type: String, required: false },
  // The type of data is set to 'String' and required is set to false, meaning it will accept null values
  friends: [friendsSchema],
  thoughts: [thoughtSchema],
  reactionCount: Number,
  // Use built in date method to get current date
  email:{ type: String, required: true }, 
  createdat: { type: Date, default: Date.now },
});

// Using mongoose.model() to compile a model based on the schema 'bookSchema'
const Users = mongoose.model('MyUser', UserSchema);

// Create new instances of the model, a document
Users.create([
  { username: 'tyythegoon', email: "tyythegoon@gmail.com"},
  { username: 'enphanamus',email: "enphann@gmail.com"},
  { username: '2cups',email: "2good22@gmail.com"},
  { username: 'diamond2flatt' ,email: "presssureee@gmail.com"},
  { username: 'gotmonion',email: "monionnnn@gmail.com" },
  { username: 'petty',email: "2petty@gmail.com"},
  { username: 'glorr',email: "gloriaa22@gmail.com" },
]);

module.exports = Users;
