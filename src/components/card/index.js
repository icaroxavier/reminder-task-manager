import React, { useState, useEffect } from 'react';
import Atividades from '../atividades';

import './card.css';


function Card({key, nome, id}){

    const [faseBotao, setFaseBotao] = useState();
    const [faseNome, setFaseNome] = useState();
    
    

    function mudarFase(){
        setFaseBotao(1)
        setFaseNome(0)
    }

    function mudarFaseNome(){
        
        setFaseNome(1)
        setFaseBotao(0)
        
    }


   
    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          setFaseNome(0)
        }
      };
      const handleKeyDownCard = (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          setFaseBotao(0)
        }
      };
    
    
      
    


    return(
        
        <main className="col-md-3 col-sm-4 col-xs-12 mb-3 mt-2 flexbox">
            <div className="card bg-dark">
                {
                    faseNome > 0 ?
                <>
                    
                        <input onKeyDown={(e) => handleKeyDown(e)} id="inputnome" name="grupoNome" className="input py-2 col-12" type="text" value={nome} autoFocus/>
                    
                   
                </>
                :
                <>
                    <button onClick={mudarFaseNome} type="button" className="btn btn-lg"><strong>{nome}</strong></button>
                    
                </>
                }
                <div class="card">
                    <ul class="list-group list-group-flush">
                        <Atividades/>
                        <Atividades/>
                        <Atividades/>
                        <Atividades/>
                        <Atividades/>
                        
                    </ul>
                </div>
                {
                    faseBotao > 0 ?
                <>
                    <input onKeyDown={(e) => handleKeyDownCard(e)} id="inputcard" className="input py-2 col-12" type="text" placeholder="Nome da Atividade" autoFocus/>
                   
                </>
                :
                <>
                    <button onClick={mudarFase} type="button" className="btn btn-lg">Nova Atividade <strong>+</strong></button>
                    
                </>
                }
                
                
            </div>
        </main>
       
    )
}

export default Card;