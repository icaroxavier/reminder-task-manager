import React, { useState, useEffect } from 'react';
import firebase from '../../config/firebase';
import './grupo-card.css';
import $ from 'jquery';



function GrupoCard(){

const [grupoNome, setGrupoNome] = useState();
const [faseBotao, setFaseBotao] = useState();


function mudarFase(){
    setFaseBotao(1);
}

function criarGrupo(){
    setFaseBotao(0);
}
    
const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      criarGrupo()
    }
  };


    return(
        
        
        
        
        <div className="col-md-3 col-sm-4 col-xs-12">
            <div className="card-body">
                {
                    faseBotao > 0 ?
                <>
                    
                    <input id='grupo' onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setGrupoNome(e.target.value)} className="py-2 col-12" type="text" placeholder="Nome do Grupo" autoFocus/>   
                   
                </>
                :
                <>
                    <button  onClick={mudarFase} className="btn btn-lg btn-block btn-grupo py-3" type="button">Novo grupo <i className="fas fa-plus"></i></button>
                    
                </>
                }
                </div>
            </div>
    )
}


export default GrupoCard;

