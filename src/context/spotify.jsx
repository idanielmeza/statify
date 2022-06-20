import React,{ createContext, useReducer } from "react";
import reducer from './reducer';

export const SpotifyContext = createContext();

const SpotifyProvider = ({ children }) => {

    const client_id = 'ba13ac5a9a6a4676b5708b322fa8cdce';
    const spotify_auth_url = 'https://accounts.spotify.com/authorize';
    const redirect_url = `${window.location.origin}/auth`;
    const scopes = ['user-read-private', 'user-read-email','user-top-read'];
    const scopes_url = scopes.join('%20');

    const initialState = {
        token: null,
        user: null,
        type: 'tracks',
        top: 10,
        time: 'short_term',
        data: []
    }

    const [state,dispatch] = useReducer(reducer, initialState);

    const setToken = (token)=>{
        console.log('Agregando token')
        dispatch({
            type: 'SET_TOKEN',
            payload: token
        })
        console.log('Se agrego token')
    }

    const setType = (type)=>{
        dispatch({
            type: 'SET_TYPE',
            payload: type
        })
    }

    const setUser = (user)=>{
        dispatch({
            type: 'SET_USER',
            payload: user
        })
    }

    const setTop = (top)=>{
        dispatch({
            type: 'SET_TOP',
            payload: top
        })
    }

    const setTime = (time)=>{
        dispatch({
            type: 'SET_TIME',
            payload: time
        })
    }

    const setData = (data)=>{
        dispatch({
            type: 'SET_DATA',
            payload: data
        })
    }

    const login = ()=>{
        window.location.href = `${spotify_auth_url}?client_id=${client_id}&redirect_uri=${redirect_url}&scope=${scopes_url}&response_type=token&show_dialog=true`;
    }

    const getUser = async()=>{
        try {
            if(!state.user){
                const resp = await fetch('https://api.spotify.com/v1/me',{
                headers: {
                    Authorization: `Bearer ${state.token}`,
                    'Content-Type': 'application/json'
                    }
                })

                const data = await resp.json();

                const {display_name} = data;

                console.log(data);

                let image;
                
                if(!data.images.length){
                    image = 'https://i.scdn.co/image/ab67616d00001e0299760923cfbfe739fb870817';
                }else{
                    image = data.images[0].url;
                }

                const respImage = await fetch(image);
                const imageData = await respImage.blob();
                const imageUrl = URL.createObjectURL(imageData);

                setUser({
                    display_name,
                    image: imageUrl
                })

                await getData();
            }else{
                await getData();
            }
            

        } catch (error) {
            console.log(error);   
        }
    }

    const getData = async()=>{
        try {

            const resp = await fetch(`https://api.spotify.com/v1/me/top/${state.type}?limit=${state.top}&time_range=${state.time}`,{
            headers: {
                Authorization: `Bearer ${state.token}`,
                'Content-Type': 'application/json'
            }
            })
            const data = await resp.json();

            console.log(state.top);

            console.log(data);
            
            let info = null;

            if(state.type === 'artists'){
                info = data.items.map(item=>(
                    {
                       name: item.name,
                       url: item.external_urls.spotify,
                       image: item.images[0].url,
                       artists: item.genres.join(', ')
                   }
               ));
            }else if (state.type === 'tracks'){
                info = data.items.map(item=>({
                    name: item.name,
                    url: item.external_urls.spotify,
                    image: item.album.images[0].url,
                    artists: item.artists.map(artist=>artist.name).join(', ')
                }))
            }

            const imagesAryy = info.map(item=>(item.image));

            const images = await Promise.all(
                imagesAryy.map(async image=>{
                    const resp = await fetch(image);
                    const data = await resp.blob();
                    return URL.createObjectURL(data);
                }
            ))

            info.forEach((item,index)=>{
                item.image = images[index];
            })

            setData(info);
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SpotifyContext.Provider
            value={{
                token: state.token,
                user: state.user,
                type: state.type,
                top: state.top,
                time: state.time,
                data: state.data,
                images: state.images,
                setToken,
                setType,
                setUser,
                setTop,
                setTime,
                setData,
                login,
                getUser,
                getData
            }}
        >
            {children}
        </SpotifyContext.Provider>
    );
}

export default SpotifyProvider;