import {createStore} from 'redux'
import{Reducer} from './Reducer'

const EventStore=createStore(Reducer)

export default EventStore