import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Tuote = ({ nimi, kuvaus, hinta, myyja_nimi, id, match }) => {
    return (
        <Fragment>
            <h3>{nimi} tuote id {id}</h3>
            <p>{kuvaus}</p>
            <span>{hinta}</span><br></br>
            <span>{myyja_nimi}</span><br></br>
            <Link to={`tuotteet/${id}/arvostelut/`}>arvostelut</Link>
        </Fragment>)
}


const Tuotteet = (props) => {
    const [tuotteet, setTuotteet] = useState([])
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/tuotteet/").then(a => {
            setTuotteet(a.data ? a.data : [])
        })

    }, [])

    console.log(tuotteet, 'duodet', props)
    return (
        <div>
            {tuotteet.map((t, i) => (
                <Tuote {...t} key={i}></Tuote>
            ))}
        </div>)
}

export default Tuotteet