export function addEvent(event_data) {

    return {
        type: 'ADD_EVENT',
        payload: event_data
    }
}

export function getEvent() {

    return {
        type: 'GET_EVENT'
    }
}

export function editEvent(event_data) {
    
    return {
        type: 'EDIT_EVENT',
        payload: event_data
    }
}