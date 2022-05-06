import { fromByteArray, toByteArray } from 'base64-js'

import {temporarilyNotSupport} from '../utils'

export const canIUse = temporarilyNotSupport('canIUse')

export const arrayBufferToBase64 = fromByteArray

export const base64ToArrayBuffer = toByteArray

export * from './system'
export * from './update'
export * from './debug'
export * from './performance'
export * from './crypto'
