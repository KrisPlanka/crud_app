import * as userServices from '../services/user';

const eventServices = require('../services/event')

export const getEvents = async (req, res) => {
  try {
    res.status(200).json((await eventServices.getAll()))
  } catch (e) {
    res.status(500).json(e)
  }
}

export const getEvent = async (req, res) => {
  try {
    res.status(200).json((await eventServices.getById(req.params.id)))
  } catch (e) {
    res.status(500).json(e)
  }
}

export const createNewEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      userId
    } = req.body
    const newEvent = await eventServices.create({
      title,
      description,
      startDate,
      endDate,
      userId
    });

    await userServices.addEventToUser(userId, newEvent._id);

    res.status(201).json(newEvent);
  } catch (e) {
    res.status(500).json(e)
  }
}


export const updateOneEvent = async (req, res) => {
  const result = await eventServices.findOneAndUpdate(req.params.id, req.body)
  try {
    res.status(200).json((result))
  } catch (e) {
    res.status(500).json(e)
  }
}

export const deleteOneEvent = async (req, res) => {
  try {
    res.status(200).json((await eventServices.findOneAndDelete(req.params.id)))
  } catch (e) {
    res.status(500).json(e)
  }
}