import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';


const Arvostelu = ({ arvostelija_nimi, tuote_id, tahdet, teksti }) => {
    return (<Fragment>
        <h3>{arvostelija_nimi}</h3>
        <h4>Tähdet: {tahdet}</h4>
        <p>{teksti}</p>
    </Fragment>)
}

const Arvostelut = (props) => {
    const [arvostelut, setArvostelut] = useState([])
    const id = props.match.params.filter
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/tuotteet/${id}/arvostelut/`).then(a => {
            setArvostelut(a.data.arvostelut ? a.data.arvostelut : [])
        })
    }, [])
    return (
        <div>
            {arvostelut.map((a, i) => (
                <Arvostelu {...a} key={i}></Arvostelu>
            ))}

        </div>)
}

export default Arvostelut