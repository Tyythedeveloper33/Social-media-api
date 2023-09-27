const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type:String, required: true, unique: true, match:[/.+@.+\..+/, "Must match an email address!"],},
  thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create the User model based on the schema
const User = model("MyUser", UserSchema);

// Usage example: Create new instances of the model, a document
User.create([
  { username: 'tyythegoon', email: "tyythegoon@gmail.com" },
  { username: 'enphanamus', email: "enphann@gmail.com" },
  { username: '2cups', email: "2good22@gmail.com" },
  { username: 'diamond2flatt', email: "presssureee@gmail.com" },
  { username: 'gotmonion', email: "monionnnn@gmail.com" },
  { username: 'petty', email: "2petty@gmail.com" },
  { username: 'glorr', email: "gloriaa22@gmail.com" },
])
  .then((createdUsers) => {
    console.log('Created users:', createdUsers);
  })
  .catch((error) => {
    console.error('Error creating users:', error);
  });

module.exports = User;


