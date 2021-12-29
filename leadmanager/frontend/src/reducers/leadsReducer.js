import axios from 'axios'
const leadsReducer = (state = [], action) => {
    switch (action.type) {
        case 'START':
            const leads = action.data.leads
            if (leads) {
                state = leads
            }
            return state

        default:
            return state
    }
}

export const getLeads = () => {
    return async (dispatch) => {
        const ans = await axios.get("api/leads")
        const leads = ans.data
        dispatch({
            type: 'START',
            data: {
                leads
            }
        })
    }
}

export default leadsReducer