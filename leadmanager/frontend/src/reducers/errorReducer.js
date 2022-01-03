
const errorReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GETERRORS':
            const jea = { msg: action.data, status: action.data.status }
            state = { ...jea }
            return state

        default:
            return state
    }
}
export const sendError = (error) => {
    return async (dispatch) => {
        dispatch({
            type: 'GETERRORS',
            data: {
                msg: error.data,
                status: error.status
            }
        })
    }
}
export default errorReducer