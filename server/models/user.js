import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export const User = mongoose.model('user', new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  events: [{
    type: Schema.Types.ObjectId,
    ref: 'event'
  }]
}));
