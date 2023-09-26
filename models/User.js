// Require schema and model from mongoose
const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
  // Configure individual properties using Schema Types
  username: { type: String, required: true , unique: true, trim: true},
  thoughts: { type: String, required: false },
  // The type of data is set to 'String' and required is set to false, meaning it will accept null values
  friends: [ 
    {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
],
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

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

const User = model("MyUser", UserSchema);

module.exports = User;
