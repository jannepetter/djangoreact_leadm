import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux'
import { getLeads } from "../reducers/leadsReducer";
import '../app.css'
const App = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getLeads())
    }, [dispatch])

    return (
        <div>
            <h1 className='hiphei'>Hello djangoreacti!</h1>
        </div>)
}
const mapDispatchToProps = {
    getLeads,
}
const mapStateToProps = (state) => {
    return {
        leads: state.leads,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)