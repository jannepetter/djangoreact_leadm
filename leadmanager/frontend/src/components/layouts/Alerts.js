import { string } from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { useAlert } from 'react-alert'
import { connect } from 'react-redux';

const Alerts = ({ errors }) => {
    const alert = useAlert()
    useEffect(() => {
        if (errors?.msg?.msg?.name) {
            alert.error(`Name: ${errors.msg.msg.name.join()} `)
        }
        if (errors?.msg?.msg?.email) {
            alert.error(`Email: ${errors.msg.msg.email.join()} `)
        }
        if (errors?.msg?.msg?.message) {
            alert.error(`Message: ${errors.msg.msg.message.join()} `)
        }
        if (errors?.msg?.msg?.password) {
            alert.error(`Password: ${errors.msg.msg.password.join()} `)
        }
        if (errors?.msg?.msg?.username) {
            alert.error(`Username: ${errors.msg.msg.username.join()} `)
        }
        if (errors?.msg?.msg?.non_field_errors) {
            alert.error(`Message: ${errors.msg.msg.non_field_errors.join()} `)
        }
        if (typeof (errors?.msg?.msg) === 'string') {
            alert.error(`Message: ${errors.msg?.msg} `)
        }

    }, [errors])
    return (
        <div>
        </div>)
}
const mapStateToProps = (state) => {
    return {
        errors: state.errors
    }
}
export default connect(mapStateToProps, null)(Alerts)
