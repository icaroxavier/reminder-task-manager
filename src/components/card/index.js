import React, { useState, useEffect, useRef } from 'react';
import Atividades from '../atividades';
import './card.css';
import firebase from 'firebase';
import Popup from 'reactjs-popup';


function Card({grupoNome, id, atualizarGrupo, controle, controleAtividade}){

    const [faseBotao, setFaseBotao] = useState();
    const [faseNome, setFaseNome] = useState();
    const [nome, setNome] = useState();
    const [atividadeNome, setAtividadeNome] = useState();
    let listaatividades = [];  // 
    const [atividades, setAtividades] = useState([]);
    const [controleAtividades, setControleAtividades] = useState(1);
    const ref = useRef();
    const refDeletar = useRef();
    const closeTooltip = () => ref.current.close();
    const confirmarClose = () => refDeletar.current.close();

   

    const db = firebase.firestore();

    
    

    function criarAtividade (){
        db.collection('grupos').doc(id).collection('atividades').add({
            atividadeNome: atividadeNome,
            data: Date.now()
        }).then(()=> {
            setTimeout(() => {
                mudarControleAtividades()
                atualizarGrupo()
                closeTooltip()
               
                
            }, 500);
            
        }).catch(erro =>{
            
        })
        
     }

     useEffect(() => {
        firebase.firestore().collection('grupos').doc(id).collection('atividades').orderBy('data').get().then(async (resultado) => {
            await resultado.docs.forEach(doc => {
                listaatividades.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setAtividades(listaatividades)
        })
    }, [controleAtividades, controleAtividade, controle])
    
    

    function mudarFase(){
        setFaseBotao(1)
        setFaseNome(0)
    }

    function mudarFaseNome(){
        
        setFaseNome(1)
        setFaseBotao(0)
        
    }
    function deletarGrupo(){
        firebase.firestore().collection('grupos').doc(id).delete().then(() =>{
            atualizarGrupo()
        })
    }

    const atividadeEnter = (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          confirmarClose()
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
            <div>
                
             
                
               
                {
                    faseNome > 0 ?
                <>
                        <input onChange={(e) => setNome(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} id="inputnome" name="grupoNome" placeholder={grupoNome} className="input py-2 col-12" type="text" autoFocus/>
                </>
                :
                <>
               
                    
                    <Popup trigger={<i  onClick={deletarGrupo} className="fas fa-times-circle fa-2x icon-xzin"></i>} modal ref={refDeletar}>
                        <div className='col-12 p-1 bg-danger border border-dark rounded'>
                            <h2 className='col-10 text-white text-center ml-4'>O que deseja?</h2>
                            <button type="button" className="btn btn-lg col-5 mr-5 ml-2" onClick={deletarGrupo}>Excluir Grupo</button>
                            <button type="button" className="btn btn-lg col-5"onClick={confirmarClose}>Fechar Popup</button>
                        </div>
                    </Popup>
                    <button onClick={mudarFaseNome} type="button" className="btn btn-lg nome-grupo"><strong>{grupoNome}</strong></button>
                    
                   
                
        
                </>
                }
                
                <div class="card">
                    <ul class="list-group list-group-flush">
                        <div className='my-1'>
                            {atividades.map(item => <Atividades idGrupo={id} atividadeNome={item.atividadeNome} id={item.id} atualizarAtividades={mudarControleAtividades}/>)}
                        </div>
                    </ul>
                </div>
                <Popup ref={ref} trigger={<button  id='button1' type="button" className="btn btn-lg">Novo Card <strong>+</strong></button>} modal>
                    <div className='row bg-info p-1 col-6 popupcontent border border-dark rounded'>
                        <h5 className='col-12 text-white'>Digite o nome da sua nova atividade</h5>
                        <input onKeyDown={(e) => atividadeEnter(e)} onChange={(e) => setAtividadeNome(e.target.value)} className="input py-1 col-8" type="text" autoFocus></input>
                        <button type="button" className="btn btn-sm col-3 ml-3" onClick={criarAtividade}>Salvar</button>
                    </div>
                </Popup>
                </div>
                
        </main>
       
    )
}

export default Card;


