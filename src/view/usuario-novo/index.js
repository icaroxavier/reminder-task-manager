import React, { useState } from 'react';
import firebase from '../../config/firebase';
import 'firebase/auth';
import Navbar from '../../components/navbar';
import { Redirect } from 'react-router-dom';


import  './usuario-novo.css';

function NovoUsuario(){

const [email, setEmail] = useState();
const [senha, setSenha] = useState();
const [msgTipo, setMsgTipo] = useState();
const [msg, setMsg] = useState();
const [carregando, setCarregando] = useState();
const [redirecionar, setRedirecionar] = useState();

function cadastrar(){

    setCarregando(1);

    setMsgTipo(null);

    if(!email || !senha){
        setCarregando(0);
        setMsgTipo('erro')
        setMsg('Você precisa informar o email e senha para fazer o cadastro!')
        return;
    }


    firebase.auth().createUserWithEmailAndPassword(email, senha).then(resultado => {
        setCarregando(0);
        setMsgTipo('sucesso');
        setTimeout(() => {
            setRedirecionar(1)
        }, 2000);
        
      
    }).catch(erro =>{
        setCarregando(0);
        setMsgTipo('erro')
        switch(erro.message)
        {
            case 'Password should be at least 6 characters':
                setMsg('A senha deve ter pelo menos 6 caracteres!');
                break;
            case 'The email address is already in use by another account.':
                setMsg('Este email já está em uso!');
                break;
            case 'The email address is badly formatted.':
                setMsg('O formato do seu email é inválido!');
                break;
            default:
                setMsg('Não foi possível cadastrar. Tente novamente mais tarde!');
                break;
        }
    });
}

const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      cadastrar()
      
    }
  };



    return(
        <>
        <Navbar/>
        {redirecionar ? <Redirect to='/' /> : null}
        
        <div className="form-cadastro">
           <form className="text-center form-login mx-auto mt-5">
               <h1 className="h3 mb-3 text-white font-weight-bold">Cadastro</h1>
                <input onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Email"/>
                <input onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setSenha(e.target.value)} type="password" className="form-control my-2" placeholder="Senha"/>

                {
                    carregando ? <div class="spinner-border text-danger" role="status"><span class="sr-only">Loading...</span></div>
                    : <button onClick={cadastrar} class="btn btn-lg btn-block btn-login" type="button">Cadastrar</button>
                }


                <div className="msg-login text-white text-center my-5">
                    {msgTipo === 'sucesso' && <span><strong>WoW!</strong> Usuário cadastrado com sucesso! &#128526;</span>}
                    {msgTipo === 'erro' && <span><strong>Ops!</strong> {msg} &#128546;</span>}
                </div>
           </form>
        </div>
        </>
    );
}

export default NovoUsuario;