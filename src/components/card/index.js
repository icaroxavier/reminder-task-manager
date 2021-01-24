import React, { useState } from 'react';
import Atividades from '../atividades';
import './card.css';
import $ from 'jquery';


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
      
      function setarFoco() {
          setTimeout(() => {
            document.getElementById('inputfocus').focus();
          }, 500);
     }
      
    
    

    return(
        
        <main className="col-md-3 col-sm-4 col-xs-12 mb-3 mt-2 flexbox">
            <div className="card bg-dark">
                <div class="float-right">
                    <button class="btn btn-default" type="submit">
                        <i className="fas fa-times-circle float-right"></i>
                     </button>
                </div>
            
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
                    <button  onClick={setarFoco} id='button1' type="button" className="btn btn-lg" data-toggle="modal" data-target="#exampleModal">Nova Atividade <strong>+</strong></button>
                </div>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Crie uma nova atividade</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                </div>
                                <div class="modal-body">
                                        <input id='inputfocus' className="input py-2 col-12" type="text" placeholder="Nome da Atividade" autoFocus/>
                                </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn" data-dismiss="modal">Fechar</button>
                                        <button type="button" class="btn">Criar nova atividade</button>
                                </div>
                            </div>
                        </div>
                </div>
        </main>
       
    )
}

export default Card;


