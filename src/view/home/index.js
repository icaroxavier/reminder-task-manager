import React, { useState, useEffect } from 'react';
import './home.css';
import Navbar from '../../components/navbar';
import firebase from '../../config/firebase';
import GrupoCard from '../../components/grupo-card';
import Card from '../../components/card';





function Home(){
    
    
    const [nomes, setNomes] = useState([]);
    let listanomes = [];

    useEffect(() => {
        firebase.firestore().collection('grupos').get().then(async (resultado) =>{
            await resultado.docs.forEach(doc =>{
                listanomes.push({
                    id: doc.id,
                    ...doc.data()
                })
            })

            setNomes(listanomes);
        })
    });
    
    

    
    return(
        <>
            <Navbar/>
            <div className="tela-home">
                <div className="row">
                {nomes.map(item => <Card id={item.id} key={item.id} nome={item.nome}/>)}
                <GrupoCard/>
                </div>
            </div>
        </>
    )
}

export default Home;