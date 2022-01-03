import axios from 'axios'

const leadsReducer = (state = [], action) => {
    switch (action.type) {
        case 'START':
            const leads = action.data.leads
            if (leads) {
                state = leads
            }
            return state
        case 'DELETE':
            const id = action.data.id
            state = state.filter(l => l.id != id)
            return state
        case 'ADDLEAD':
            state = state.concat(action.data.lead)
        default:
            return state
    }
}

export const getLeads = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                'Authorization': `Token ${token}`
            }
        }
        const ans = await axios.get("api/leads", config)
        const leads = ans.data
        dispatch({
            type: 'START',
            data: {
                leads
            }
        })
    }
}
export const deleteLead = (id) => {
    return async (dispatch) => {
        const ans = await axios.delete(`api/leads/${id}`)

        dispatch({
            type: 'DELETE',
            data: {
                id
            }
        })
    }
}
export const addLead = (newlead, token) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }
        try {
            const ans = await axios.post("api/leads/", newlead, config)
            const lead = ans.data
            dispatch({
                type: 'ADDLEAD',
                data: {
                    lead
                }
            })

        } catch (error) {
            // console.log('erroria', error.response.data)
            // throw error
            console.log(error.response, 'tsekkingkiä')
            dispatch({
                type: 'GETERRORS',
                data: {
                    msg: error.response.data,
                    status: error.response.status
                }
            })
        }
    }
}

export default leadsReducer