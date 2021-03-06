import React,{useContext} from 'react';
import { SpotifyContext } from '../../context/spotify';
import {Navigate} from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const {token} = useContext(SpotifyContext);

    console.log(token)

    return ( 

        !token ?(
            <Navigate to='/'/>
        ) : (
            children
        ) 

     );
    
}

export default PrivateRoute;