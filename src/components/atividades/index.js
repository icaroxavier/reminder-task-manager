import React from 'react';
import './atividades.css';

function Atividades({atividadeNome}){


    return(
        <li class="list-group-item  bg-info font-weight-bold">{atividadeNome}</li>
    )
}

export default Atividades;