const userServices = require('../services/user')
import { User } from '../../models/user';


export const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  try {
    const users = await User.find().skip(offset).limit(limit).populate({
      path: 'events',
      options: { sort: { startDate: 1 } },
    });
    res.json(users);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    res.status(200).json((await userServices.getById(req.params.id)))
  } catch (e) {
    res.status(500).json(e)
  }
}

export const createNewUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      events
    } = req.body
    res.status(201).json((await userServices.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      events
    })))
  } catch (e) {
    res.status(500).json(e)
  }
}

export const updateOneUser = async (req, res) => {
  const result = await userServices.findOneAndUpdate(req.params.id, req.body)
  try {
    res.status(200).json((result))
  } catch (e) {
    res.status(500).json(e)
  }
}

export const deleteOneUser = async (req, res) => {
  try {
    res.status(200).json((await userServices.findOneAndDelete(req.params.id)))
  } catch (e) {
    res.status(500).json(e)
  }
}


