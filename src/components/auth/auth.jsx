import React,{ useContext , useEffect} from "react";
import { SpotifyContext } from "../../context/spotify";
import {useNavigate} from 'react-router-dom';

const Auth = () => {

    const {setToken} = useContext(SpotifyContext);

    const navigate = useNavigate();

    const getParamsFromSpotifyAuth = (hash) => {
        const stringAfterHash = hash.substring(1);
        const params = stringAfterHash.split('&');
        const paramObject = {};
        params.forEach(param => {
            const keyValue = param.split('=');
            paramObject[keyValue[0]] = keyValue[1];
        });
        return paramObject;
    }

    const params = getParamsFromSpotifyAuth(window.location.hash);
    const {access_token} = params;
    
    useEffect(() => {
        setToken(access_token);
        navigate('/app');
    } , []);

    return ( 
        <p>Login...</p>
     );
}
 
export default Auth;