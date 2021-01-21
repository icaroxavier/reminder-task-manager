import React, { useState, useEffect } from 'react';
import './home.css';

import Navbar from '../../components/navbar';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebase'
import EventoCard from '../../components/evento-card';



function Home(){
    
    
    
    return(
        <>
            <Navbar/>
            <div className="tela-home">
        
            </div>

        </>
    )
}

export default Home;