import React,{ createContext, useState } from "react";


export const SpotifyContext = createContext();

const SpotifyProvider = ({ children }) => {

    const client_id = 'ba13ac5a9a6a4676b5708b322fa8cdce';
    const spotify_auth_url = 'https://accounts.spotify.com/authorize';
    const redirect_url = 'http://localhost:3000/auth';
    const scopes = ['user-read-private', 'user-read-email','user-top-read'];
    const scopes_url = scopes.join('%20');

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [type, setType] = useState('artists');
    const [top, setTop] = useState(10);
    const [time, setTime] = useState('short_term');
    const [data, setData] = useState([]);

    const login = ()=>{
        window.location.href = `${spotify_auth_url}?client_id=${client_id}&redirect_uri=${redirect_url}&scope=${scopes_url}&response_type=token&show_dialog=true`;

    }

    const getUser = async()=>{
        try {
            const resp = await fetch('https://api.spotify.com/v1/me',{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
                }
            })
            const data = await resp.json();

            const {display_name} = data;
            const image = data.images[0].url;
            
            setUser({
                display_name,
                image
            })

            await getData();

        } catch (error) {
            console.log(error);   
        }
    }

    const getData = async()=>{
        try {
            const resp = await fetch(`https://api.spotify.com/v1/me/top/${type}?limit=${top}&time_range=${time}`,{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            })
            const data = await resp.json();
            console.log(data);
            
            let info = null;

            if(type === 'artists'){
                info = data.items.map(item=>(
                    {
                       name: item.name,
                       url: item.external_urls.spotify,
                       image: item.images[0].url,
                       genres: item.genres.join(', ')
                   }
               ));
            }else if (type === 'tracks'){
                info = data.items.map(item=>({
                    name: item.name,
                    url: item.external_urls.spotify,
                    image: item.album.images[0].url,
                    artists: item.artists.map(artist=>artist.name).join(', ')
                }))
            }

            console.log(info);

            setData(info);
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SpotifyContext.Provider
            value={{
                login,
                token,
                setToken,
                getUser,
                user,
                setType,
                setTop,
                setTime,
                getData,
                data
            }}
        >
            {children}
        </SpotifyContext.Provider>
    );
}

export default SpotifyProvider;