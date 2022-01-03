import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../reducers/auth';


const Register = (props) => {
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const dispatch = useDispatch()
    const alert = useAlert()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password === password2) {
            const newuser = {
                username: username,
                password: password,
                email: email
            }
            dispatch(register(newuser))
            setUserName("")
            setPassword("")
            setPassword2("")
            setEmail("")
        } else {
            alert.error('salasanat ei mätsää')
        }
    }


    return (

        <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
                <h2 className="text-center">Register</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            onChange={(e) => setUserName(e.target.value)}
                            value={username}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password2"
                            onChange={(e) => setPassword2(e.target.value)}
                            value={password2}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                    </div>
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
const mapDispatchToProps = {
    register
}

const mapStateToProps = (state) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register)