import { Event } from '../../models/event'

export const getAll = async () => Event.find({})

export const getById = async (id) => Event.findById(id)

export const create = async (event) => Event.create(event)

export const findOneAndUpdate = async (id, event) => Event.findOneAndUpdate(id, event)

export const findOneAndDelete = async (id) => Event.findOneAndDelete(id)