import { fromJS } from 'immutable'

export const ADD_MESSAGE = 'ADD_MESSAGE'

const changeMsg = (data) => ({
    type: ADD_MESSAGE,
    data: fromJS(data)
})

export const addMsg = (msg) => {
    return dispatch => {
        let data = msgBox.concat(msg);
        dispatch(changeMsg(data));
    }
}

const defaultState = fromJS({
    msgBox: [],
})

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return state.set('msgBox', action.data)
        default:
            return state;
    }
}

export { reducer }