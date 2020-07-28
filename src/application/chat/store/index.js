import {
    fromJS
} from 'immutable'

export const ADD_MESSAGE = 'ADD_MESSAGE'

const changeMsg = (data) => ({
    type: ADD_MESSAGE,
    data: fromJS(data)
})

export const addMsg = (msg) => {
    return (dispatch, getState) => {
        const list = getState().getIn(['message', 'msgBox']).toJS();
        let data = [...list, msg];
        dispatch(changeMsg(data));
    }
}

export const deleteMsg = (id) => {
    return (dispatch, getState) => {
        const list = getState().getIn(['message', 'msgBox']).toJS();
        const newList = list.filter(item => item.local_msg_id != id)
        dispatch(changeMsg(newList))
    }
}

const defaultState = fromJS({
    msgBox: [],
})

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return state.set('msgBox', action.data);
        default:
            return state;
    }
}

export {
    reducer
}