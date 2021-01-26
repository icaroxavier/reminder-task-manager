import React, { useRef } from 'react';
import './atividades.css';
import { useState } from 'react';
import firebase from 'firebase';
import Popup from 'reactjs-popup';

function Atividades({atividadeNome, id, idGrupo, atualizarAtividades, on, off}){

    
    const [novoAtividadeNome, setNovoAtividadeNome] = useState('')
    const ref = useRef();

    const openTooltip = () => ref.current.open();
    const closeTooltip = () => ref.current.close();
    
    function editarNomeAtividade(){

        firebase.firestore().collection('grupos').doc(idGrupo).collection('atividades').doc(id).update({
            atividadeNome : novoAtividadeNome
        })

    }

    function excluirAtividade(){
        firebase.firestore().collection('grupos').doc(idGrupo).collection('atividades').doc(id).delete()
        closeTooltip()
        setTimeout(() => {
            atualizarAtividades()
        }, 500);
        

    }

    

    
    
    const atividadeEditarEnter = (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          if (novoAtividadeNome != '' || novoAtividadeNome != null || novoAtividadeNome != undefined){
          editarNomeAtividade()
          setTimeout(() => {
            atualizarAtividades()
          }, 200);
          
          closeTooltip()
        }else{
            closeTooltip()
        }
          

          
        }
      };
  

    return(
        <div>
             <li class="list-group-item  bg-info font-weight-bold my-1" onClick={openTooltip} >{atividadeNome}</li>

            <Popup onOpen={on} onClose={off} modal ref={ref}>
                <li class="list-group-item bg-info font-weight-bold my-1 border border-dark">
                    <input onKeyDown={(e) => atividadeEditarEnter(e)} onChange={(e) => setNovoAtividadeNome(e.target.value)} placeholder={atividadeNome} className="input py-1 col-6 mr-1" type="text" autoFocus></input>
                    <button type="button" onClick={excluirAtividade} className="btn btn-sm py-1 col-4 mr-1" ><strong>Excluir</strong></button>
                    <button type="button" onClick={closeTooltip} className="btn btn-sm py-1 col-1 px-1" ><strong>x</strong></button>
                    
                </li>
            </Popup>
            
           
            
            
        </div>
        
    )
}

export default Atividades;