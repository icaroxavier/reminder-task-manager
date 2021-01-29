import React, { useRef } from 'react';
import './atividades.js';
import { useState } from 'react';
import firebase from 'firebase';
import Popup from 'reactjs-popup';
import './atividades.css';



function Atividades({atividadeNome ,data, id, idGrupo, atualizarAtividades, on, off, index, dropzones}){
    
    
    const refMeu = useRef();
    
    const refCard = useRef();
    

    
    const [novoAtividadeNome, setNovoAtividadeNome] = useState('')
    

    const openTooltip = () => refMeu.current.open();
    const closeTooltip = () => refMeu.current.close();
    
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
        }, 800);
        

    }

    function salvarAtividade(){
        if (novoAtividadeNome != ''){
            editarNomeAtividade()
            setTimeout(() => {
              atualizarAtividades()
            }, 500);
            closeTooltip()
            setNovoAtividadeNome('')
          }else{
              closeTooltip()
              setNovoAtividadeNome('')
          }

    }

    

    
    
    const atividadeEditarEnter = (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          if (novoAtividadeNome != ''){
          editarNomeAtividade()
          setTimeout(() => {
            atualizarAtividades()
          }, 500);
          closeTooltip()
          setNovoAtividadeNome('')
        }else{
            closeTooltip()
            setNovoAtividadeNome('')
        }
          

          
        }
      };

      const cards = document.querySelectorAll('.customcard')

      
      
      function dragstart(){
        dropzones.forEach( dropzone => dropzone.classList.add('highlight'))

        refCard.current.classList.add('is-dragging')
        console.log(refCard.current)
      }

      function drag(){
         
        }
        function dragend(){
          dropzones.forEach ( dropzone => dropzone.classList.remove('highlight'))
          
          refCard.current.classList.remove('is-dragging')
        }
  

    return(
        
        <div>
             <li  ref={refCard} draggable='true' onDragStart={dragstart} onDrag={drag} onDragEnd={dragend} class="list-group-item font-weight-bold my-1 text-white customlist customcard" onClick={openTooltip} >{atividadeNome}</li>

            <Popup onOpen={on} onClose={off} modal ref={refMeu}>
                <li class="list-group-item font-weight-bold my-1 border border-dark">
                    <h3>Editar atividade</h3>
                    <input onKeyDown={(e) => atividadeEditarEnter(e)} onChange={(e) => setNovoAtividadeNome(e.target.value)} placeholder={atividadeNome} className="input py-1 col-6 mr-1" type="text" autoFocus></input>
                    <button type="button" onClick={salvarAtividade} className="btn btn-sm py-1 col-2 mr-1" ><strong>Salvar</strong></button>
                    <button type="button" onClick={excluirAtividade} className="btn btn-sm py-1 col-2 mr-1" ><strong>Excluir</strong></button>
                    <button type="button" onClick={closeTooltip} className="btn btn-sm py-1 col-1 px-1" ><strong>x</strong></button>
                    
                </li>
            </Popup>
            
           
            
            
        </div>
        
        
    )
}

export default Atividades;