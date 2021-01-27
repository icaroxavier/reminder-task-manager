import React, { useState, useEffect, useRef } from 'react';
import Atividades from '../atividades';
import './card.css';
import firebase from 'firebase';
import Popup from 'reactjs-popup';


function Card({grupoNome, id, atualizarGrupo, controle, controleAtividade}){

    const [faseBotao, setFaseBotao] = useState();
    const [faseNome, setFaseNome] = useState();
    const [nome, setNome] = useState();
    const [atividadeNome, setAtividadeNome] = useState('');
    let listaatividades = [];  // 
    const [atividades, setAtividades] = useState([]);
    const [controleAtividades, setControleAtividades] = useState(1);
    const ref = useRef();
    const refDeletar = useRef();
    const closeTooltip = () => ref.current.close();
    const openTooltip = function (){
        ref.current.open()
        on()
    }
    const confirmarClose = () => refDeletar.current.close();

   

    const db = firebase.firestore();

    
    

    function criarAtividade (){
        if (atividadeNome != ''){
        db.collection('grupos').doc(id).collection('atividades').add({
            atividadeNome: atividadeNome,
            data: Date.now()
        }).then(()=> {
            setTimeout(() => {
                mudarControleAtividades()
                atualizarGrupo()
                closeTooltip()
                setAtividadeNome('')
               
                
            }, 500);
            
        }).catch(erro =>{
            setAtividadeNome('')
        })
    }else{
        setAtividadeNome('')
        closeTooltip()
    }
        
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
            off()
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
          if(nome == ''){
            atualizarGrupo()
          }else{
            setTimeout(() => {
                atualizarGrupo()
                  editarNome()
                  setNome('')
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

    function mudarFaseNome0 (){
        setFaseNome(0)
        setNome('')
    }
    function on() {
        document.getElementById("overlay").style.display = "block";
      }
      
      function off() {
        document.getElementById("overlay").style.display = "none";
      }

       
    
    

    return(
        
        
        <main className="col-md-3 col-sm-4 col-xs-12 mb-3 mt-2">
            <div id="overlay"></div>
            <div>
                
             
                
               
                {
                    faseNome > 0 ?
                <>
                        <input  onBlur={mudarFaseNome0} onChange={(e) => setNome(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} id="inputnome" name="grupoNome" placeholder={grupoNome} className="input py-2 col-12" type="text" autoFocus/>
                </>
                :
                <>
               
                    
                    <Popup position='center' onOpen={on} onClose={off} trigger={<i className="fas fa-times-circle fa-2x icon-xzin"></i>} modal ref={refDeletar}>
                        
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
                            {atividades.map(item => <Atividades idGrupo={id} atividadeNome={item.atividadeNome} id={item.id} atualizarAtividades={mudarControleAtividades} on={on} off={off}/>)}
                        </div>
                    </ul>
                </div>
                <button  onClick={openTooltip} id='button1' type="button" className="btn btn-lg">Novo Card <strong>+</strong></button>
                
                </div>
                <Popup onClose={off} modal position='center' ref={ref}>
                    <div className=' bg-info p-1 col-12 border border-dark rounded'>
                        <h5 className='col-12 text-white'>Digite o nome da sua nova atividade</h5>
                        <input  onKeyDown={(e) => atividadeEnter(e)} onChange={(e) => setAtividadeNome(e.target.value)} className="input py-1 col-8" type="text" autoFocus></input>
                        <button type="button" className="btn btn-sm col-3 ml-3" onClick={criarAtividade}>Salvar</button>
                    </div>
                </Popup>
                
        </main>
        
       
    )
}

export default Card;


