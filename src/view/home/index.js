import React, { useState, useEffect } from 'react';
import './home.css';
import Navbar from '../../components/navbar';
import firebase from '../../config/firebase';
import GrupoCard from '../../components/grupo-card';
import Card from '../../components/card';





function Home(){
    
    
   
    
    
    return(
        <>
            <Navbar/>
            <div className="tela-home">
                <div className="col-12">
                    <div className='row'>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <GrupoCard/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;