import { hooks } from './hooks'
import { Events } from './event-emitter'

const eventCenter = hooks.call('getEventCenter', Events)!

export type EventsType = typeof Events
export { eventCenter, Events }