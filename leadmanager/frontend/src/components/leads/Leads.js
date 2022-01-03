import React, { Fragment } from 'react';
import { deleteLead } from '../../reducers/leadsReducer';
import { connect, useDispatch } from 'react-redux'
import AddLeadForm from './AddLeadForm';


const Leads = ({ leads }) => {
    const dispatch = useDispatch()
    return (
        <div>
            <AddLeadForm></AddLeadForm>
            <Fragment>
                <h2>Leads</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map(l => (
                            <tr key={l.id}>
                                <th>{l.id}</th>
                                <th>{l.name}</th>
                                <th>{l.email}</th>
                                <th>{l.message}</th>
                                <th><button className='btn-danger' onClick={() => dispatch(deleteLead(l.id))}>Delete</button></th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Fragment>

        </div>)
}
const mapDispatchToProps = {
    deleteLead
}
const mapStateToProps = (state) => {
    return {
        leads: state.leads,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Leads)