
const initialstate = { event_data: [] }

export const Reducer = (state = initialstate, action) => {

    switch (action.type) {

        case 'GET_EVENT':
            return { ...state }

        case 'ADD_EVENT':
            return {
                ...state,
                event_data: state.event_data.concat(action.payload)
            };

        case 'EDIT_EVENT':
            return {
                ...state,
                event_data: state.event_data.map(
                    (content, i) => content.id == action.payload.id ? {
                        ...content, event: action.payload.event, title: action.payload.title,
                        categories: action.payload.categories, summary: action.payload.summary,
                        site: action.payload.site, checked: action.payload.checked,
                        timezone: action.payload.timezone, startDate: action.payload.startDate,
                        endDate: action.payload.endDate, startTime: action.payload.startTime,
                        endTime: action.payload.endTime, img: action.payload.img,
                        description: action.payload.description
                    }
                        : content)
            };

        default: return state
    }
}

export default Reducer