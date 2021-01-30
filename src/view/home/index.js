import React, { useState, useEffect } from 'react';
import './home.css';
import Navbar from '../../components/navbar';
import firebase from '../../config/firebase';

import Card from '../../components/card';
import {useSelector} from 'react-redux';







function Home(){
    
    
    
    const [grupos, setGrupos] = useState([]);
    let listagrupos = [];
    const [controle, setControle] = useState(1);
    const [grupoNome, setGrupoNome] = useState();
    const [faseBotao, setFaseBotao] = useState();
    const usuarioEmail = useSelector(state => state.usuarioEmail);
    const db = firebase.firestore();
    const [passarAtividade, setPassarAtividade] = useState(1);
    const [dropZoneQueVouUsar, setDropZoneQueVouUsar] = useState();

    useEffect(() => {
        firebase.firestore().collection('grupos').orderBy('data').get().then(async (resultado) => {
            await resultado.docs.forEach(doc => {
                listagrupos.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setGrupos(listagrupos)
        })
    }, [controle])

    function mudarFase(){
        setFaseBotao(1);
        setGrupoNome('')
    }
    
    function criarGrupo(){
        if(grupoNome != ''){
        db.collection('grupos').add({
            usuario: usuarioEmail,
            grupoNome: grupoNome,
            data: Date.now()
        }).then(()=> {
            setFaseBotao(0);
            setTimeout(() => {
                mudarControle()
            }, 500);
        }).catch(erro =>{
            setFaseBotao(0);
        })
    }else{
        setFaseBotao(0)
    }
    }
        
    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          criarGrupo()
          mudarControle()
          setTimeout(() => {
              mudarControleAtividade()
          }, 500);
          
        }
      };

     const mudarControle = function(){
        if (controle === 0){
            setControle(1)
        }else{
            setControle(0)
        }
    }

    const mudarControleAtividade = function(){
        if (passarAtividade === 0){
            setPassarAtividade(1)
        }else{
            setPassarAtividade(0)
        }
    }
    
    
    function mudarFase0(){
        setFaseBotao(0);
        setGrupoNome('')
    }
   
    
    
    return(
        <>
            
            
            <div className="tela-home">
            <Navbar/>
                <div className="col-12">
                    <div className='row'> 
                        {grupos.map(item => <Card dropZoneQueVouUsar={dropZoneQueVouUsar} setDropZoneQueVouUsar={setDropZoneQueVouUsar} id={item.id} grupoNome={item.grupoNome} atualizarGrupo={mudarControle} controle={controle} controleAtividade={passarAtividade}/>)}
                        <div className="col-md-3 col-sm-4 col-xs-12">
                            <div className="card-body">
                            {
                                faseBotao > 0 ?
                            <>
                                
                                <input onBlur={mudarFase0} id='grupo' onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setGrupoNome(e.target.value)} className="py-2 col-12" type="text" placeholder="Nome do Grupo" autoFocus/>   
                            
                            </>
                            :
                            <>
                                <button  onClick={mudarFase} className="btn btn-lg btn-block btn-grupo py-3" type="button">Novo grupo <i className="fas fa-plus"></i></button>
                                
                            </>
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;