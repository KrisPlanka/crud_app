import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export const Event = mongoose.model('event', new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  }
}));