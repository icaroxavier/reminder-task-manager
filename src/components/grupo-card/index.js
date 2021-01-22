import React, { useState, useEffect } from 'react';
import firebase from '../../config/firebase';
import './grupo-card.css';



function GrupoCard(){

const [grupoNome, setGrupoNome] = useState();
const [faseBotao, setFaseBotao] = useState();

const db = firebase.firestore();


function mudarFase(){
    setFaseBotao(1);
}
    
function criarGrupo(){
    setFaseBotao(0);
    db.collection('grupos').add({
        nome: grupoNome
    }).then(() => {
        setFaseBotao(0);
}).catch(erro => {
    alert(erro);
    setFaseBotao(0);
})


}
    

    return(
        
        
        
        <div className="col-md-3 col-sm-4">
            <div className="card-body">
                {
                    faseBotao > 0 ?
                <>
                    <input onChange={(e) => setGrupoNome(e.target.value)} className="py-2 col-12" type="text" placeholder="Nome do Grupo"/>
                    <button onClick={criarGrupo} className="col-12 btn btn-sm btn-block btn-grupo py-2" type="button">Criar</button>   
                </>
                :
                <>
                    <button  onClick={mudarFase} className="btn btn-lg btn-block btn-grupo py-3 showThis" type="button">Novo grupo <i class="fas fa-plus"></i></button>
                    
                </>
                }
                </div>
            </div>
    )
}

function GrupoCardd(){
    return(
        <div>
            <input type="text"/>
            <button>Enviar</button>
        </div>
    )
}

export default GrupoCard;

