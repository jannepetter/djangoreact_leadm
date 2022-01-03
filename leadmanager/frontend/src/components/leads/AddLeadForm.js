import React, { useState } from 'react';
import { addLead } from '../../reducers/leadsReducer';
import { connect, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { sendError } from '../../reducers/errorReducer';

const AddLeadForm = ({ auth }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()
    const alert = useAlert()

    const handleSubmit = (e) => {
        e.preventDefault()
        const newlead = { name: name, email: email, message: message }
        dispatch(addLead(newlead, auth?.token))
        setName("")
        setEmail("")
        setMessage("")
    }
    return (
        <div className="card card-body mt-4 mb-4">
            <h2>Add Lead</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        className="form-control"
                        type="text"
                        name="name"
                        onChange={(event) => setName(event.target.value)}
                        value={name}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                    />
                </div>
                <div className="form-group">
                    <label>Message</label>
                    <textarea
                        className="form-control"
                        type="text"
                        name="message"
                        onChange={(event) => setMessage(event.target.value)}
                        value={message}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );

    // <form>
    //     <h2>Add Lead</h2>
    //     <textarea placeholder='name' onChange={(event) => setName(event.target.value)} value={name}></textarea>
    //     <br></br>
    //     <textarea placeholder='email' onChange={(event) => setEmail(event.target.value)} value={email}></textarea>
    //     <br></br>
    //     <textarea placeholder='message' onChange={(event) => setMessage(event.target.value)} value={message}></textarea>
    //     <br></br>
    //     <button onClick={(e) => handleSubmit(e)}>Submit</button>
    // </form>)
}
const mapDispatchToProps = {
    addLead
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddLeadForm)