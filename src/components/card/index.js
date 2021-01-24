import React, { useState, useEffect } from 'react';
import Atividades from '../atividades';

import './card.css';


function Card(){

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
                        <input onKeyDown={(e) => handleKeyDown(e)} id="inputnome" name="grupoNome" className="input py-2 col-12" type="text" value='Nome do Grupo' autoFocus/>
                </>
                :
                <>
                    <button onClick={mudarFaseNome} type="button" className="btn btn-lg"><strong>Nome do grupo</strong></button>
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
               
              
                    {/* /* <input onKeyDown={(e) => handleKeyDownCard(e)} id="inputcard" className="input py-2 col-12" type="text" placeholder="Nome da Atividade" autoFocus/> */  }
                
                    <button onClick={mudarFase} type="button" className="btn btn-lg">Nova Atividade <strong>+</strong></button>
                    
              
                
                
                    {
                        faseBotao > 0 ?
                        <>
                            <div class="modal" tabindex="-1">
                            <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                <h5 class="modal-title">Modal title</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                <p>Modal body text goes here.</p>
                                </div>
                                <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                            </div>
                            </div>
                        </>
                        :
                        <div>coco</div>
                  }
                    
                
            </div>
        </main>
       
    )
}

export default Card;