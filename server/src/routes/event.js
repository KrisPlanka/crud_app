import { Router } from 'express'
import * as eventController from '../controllers/event'
const Event = Router()

Event.get('/', eventController.getEvents)

Event.get('/:id', eventController.getEvent)

Event.post('/', eventController.createNewEvent)

Event.patch('/:id', eventController.updateOneEvent)

Event.delete('/:id', eventController.deleteOneEvent)

export default Event