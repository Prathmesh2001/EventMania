import React from 'react'
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types'

function Lndindpage(props) {
    const history = useHistory()
    if(localStorage.getItem('access_t')){
        props.handle_token()
        .then(()=>
            history.push(`home`)
        )
        
    }
    return (
        <div>
            <h1>Landed Out</h1>
        </div>
    )
}

export default Lndindpage

Lndindpage.prototype ={
    handle_token: PropTypes.object.isRequired,
}