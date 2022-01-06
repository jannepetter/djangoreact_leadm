import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../reducers/auth';
import { getLeads } from '../../reducers/leadsReducer';


const Login = ({ isAuthenticated }) => {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    if (isAuthenticated) {
        return <Redirect to="/" />
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            dispatch(login(username, password)).then(a => {
                dispatch(getLeads())
            })
            setUserName("")
            setPassword("")
        } catch (error) {
            console.log('login error')
        }
    }

    return (
        <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
                <h2 className="text-center">Login</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder='Your username'
                            className="form-control"
                            name="username"
                            onChange={(e) => setUserName(e.target.value)}
                            value={username}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            autoComplete='none'
                            placeholder='Your password here'
                            className="form-control"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </div>
                    <p>
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
const mapDispatchToProps = {
    login
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)