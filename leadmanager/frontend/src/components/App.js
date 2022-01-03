import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux'
import { getLeads } from "../reducers/leadsReducer";
import '../app.css'
import Leads from './leads/Leads';
import Alerts from './layouts/Alerts';
import { sendError } from '../reducers/errorReducer';
import {
    Switch,
    Route,
    Link
} from "react-router-dom";
import Register from './accounts/Register';
import Login from './accounts/Login';
import Header from './layouts/Header';
import PrivateRoute from './common/PrivateRoute';
import { loadUser } from '../reducers/auth';

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getLeads())
        dispatch(loadUser())
    }, [dispatch])


    return (
        <div>
            <Header></Header>
            <h1 className='hiphei'>Hello</h1>
            <Alerts></Alerts>
            <Switch>
                <PrivateRoute exact path="/" component={Leads}></PrivateRoute>
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/register" component={Register}></Route>
            </Switch>
        </div>)
}
const mapDispatchToProps = {
    getLeads,
}
const mapStateToProps = (state) => {
    return {
        leads: state.leads,
        errors: state.errors,
        auth: state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)