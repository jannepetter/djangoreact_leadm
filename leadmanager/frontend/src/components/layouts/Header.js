import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import authReducer, { logout } from '../../reducers/auth';

const Header = ({ auth, user }) => {
    const dispatch = useDispatch()

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout(auth.token))
    }


    const authLinks = (
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <Link to="/" className="nav-link">
                Leads
            </Link>
            <Link to="/tuotteet" className="nav-link">
                Tuotteet
            </Link>

            <span className="navbar-text mr-3">
                <strong>{user ? `Welcome ${user.username}` : ''}</strong>
            </span>
            <li className="nav-item">
                <button onClick={(e) => handleLogout(e)} className="nav-link btn btn-info btn-sm text-light">
                    Logout
                </button>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
                <Link to="/register" className="nav-link">
                    Register
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/login" className="nav-link">
                    Login
                </Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a className="navbar-brand" href="#">
                        Lead Manager
                    </a>
                </div>
                {auth.isAuthenticated ? authLinks : guestLinks}
            </div>
        </nav>
    );
}
const mapDispatchToProps = {
    logout
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        user: state.auth.user

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)