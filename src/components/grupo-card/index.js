import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import firebase from '../../config/firebase';

import './grupo-card.css';

function GrupoCard(){
    
    
    return(
        <div className="cold-md-2 col-sm-3">
            <div className="card-body">
                <button class="btn btn-lg btn-block btn-grupo py-3" type="button">Novo grupo <i class="fas fa-plus"></i></button>
                </div>
            </div>
    )
}

export default GrupoCard;
