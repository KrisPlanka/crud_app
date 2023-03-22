import { User } from '../../models/user'

export const getAll = async () => {
  return await User.find().populate({
    path: 'events',
    options: { sort: { startDate: 1 } },
  });
};

export const getById = async (id) => User.findById(id).populate('events');

export const create = async (user) => User.create(user)

export const findOneAndUpdate = async (id, user) => User.findOneAndUpdate(id, user)

export const findOneAndDelete = async (id) => User.findOneAndDelete({_id: id})

export const addEventToUser = async (userId, eventId) => {
  return await User.findByIdAndUpdate(
    userId,
    { $push: { events: eventId } },
    { new: true, useFindAndModify: false }
  );
}