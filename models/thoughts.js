const { Schema, model } = require("mongoose");
const moment = require('moment');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
      reactionBody: { type: String, required: true ,  max: [280, ' must be under 280 characters'],}, 
      username: {type: String, required: true},
      createdat: {type: Date, default: Date.now, get: (timestamp) => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a'),},
  })

const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, required: true ,  min: [1, 'Must be between 1 and 280 characters'],
        max: 280},
        createdat: {type: Date, default: Date.now, get: (timestamp) => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a'),}, 
        username: {type: String, required: true},
        reactions: [reactionSchema],
        
        }
      );
      
      thoughtSchema.virtual("reactionCount").get(function () {
        return this.reactions.length;
      });

      const Thought = model('Thought', thoughtSchema);
  
      module.exports = Thought;

      
