import React, { useState, useEffect } from 'react';
import Atividades from '../atividades';
import './card.css';
import firebase from 'firebase';
import Popup from 'reactjs-popup';


function Card({grupoNome, id, atualizarGrupo, controle}){

    const [faseBotao, setFaseBotao] = useState();
    const [faseNome, setFaseNome] = useState();
    const [nome, setNome] = useState();
    const [atividadeNome, setAtividadeNome] = useState();
    let listaatividades = [];  // 
    const [atividades, setAtividades] = useState([]);
    const [controleAtividades, setControleAtividades] = useState(1);

    const db = firebase.firestore();
    

    function criarAtividade (){
        db.collection('grupos').doc(id).collection('atividades').add({
            atividadeNome: atividadeNome
        }).then(()=> {
            setTimeout(() => {
                mudarControleAtividades()
                atualizarGrupo()
                
            }, 500);
            
        }).catch(erro =>{
            
        })
        
     }

     useEffect(() => {
        firebase.firestore().collection('grupos').doc(id).collection('atividades').get().then(async (resultado) => {
            await resultado.docs.forEach(doc => {
                listaatividades.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setAtividades(listaatividades)
        })
    }, [controleAtividades, controle])
    
    

    function mudarFase(){
        setFaseBotao(1)
        setFaseNome(0)
    }

    function mudarFaseNome(){
        
        setFaseNome(1)
        setFaseBotao(0)
        
    }
    function botaoFechar(){
        alert('Você clicou no X')
    }

    const atividadeEnter = (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          criarAtividade()
          
        }
      };

   
    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          setFaseNome(0)
          if(nome === null || nome == null || nome == '' || nome === ''){
            atualizarGrupo()
          }else{
            setTimeout(() => {
                atualizarGrupo()
                  editarNome()
            }, 500);
        }
        }
      };
      
      
     
     function editarNome(){
         firebase.firestore().collection('grupos').doc(id).update({
             grupoNome : nome
         })

     }

     const mudarControleAtividades = function(){
        if (controleAtividades === 0){
            setControleAtividades(1)
        }else{
            setControleAtividades(0)
        }
    }

       
    
    

    return(
        
        <main className="col-md-3 col-sm-4 col-xs-12 mb-3 mt-2">
            <div className="card">
                
             
                
               
                {
                    faseNome > 0 ?
                <>
                        <input onChange={(e) => setNome(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} id="inputnome" name="grupoNome" placeholder={grupoNome} className="input py-2 col-12" type="text" autoFocus/>
                </>
                :
                <>
               
                    
                    <i  onClick={botaoFechar} className="fas fa-times-circle fa-2x icon-xzin"></i>
                    <button onClick={mudarFaseNome} type="button" className="btn btn-lg nome-grupo"><strong>{grupoNome}</strong></button>
                    
                   
                
        
                </>
                }
                
                <div class="card">
                    <ul class="list-group list-group-flush">
                        <div>
                            {atividades.map(item => <Atividades atividadeNome={item.atividadeNome}/>)}
                        </div>
                    </ul>
                </div>
                <Popup trigger={<button  id='button1' type="button" className="btn btn-lg">Nova Atividade <strong>+</strong></button>}>
                    <div className='row bg-danger p-1 popupcontent'>
                        <input onKeyDown={(e) => atividadeEnter(e)} onChange={(e) => setAtividadeNome(e.target.value)} className="input py-1 col-8" type="text" autoFocus></input>
                        <button type="button" className="btn btn-sm col-3 ml-3" onClick={criarAtividade}>Salvar</button>
                    </div>
                </Popup>
                </div>
                
        </main>
       
    )
}

export default Card;


