import React from 'react'
import { useContext } from 'react'
import { SpotifyContext } from '../../context/spotify'

const Lista = () => {

    const {data} = useContext(SpotifyContext);

    if(!data.length) return <p>Loading...</p>;

    return ( 
        <ul class="list-group list-group-flush container">
            {data.map((item,index) => (
                <li class="list-group-item">
                    <span className='text-muted'>#{index+1}</span>
                    <img src={item.image} className='lista-imagen'/>
                    <a href={item.url} target='__blank' className='list-artista'>{item.name}</a>
                </li>
            ))}
        </ul>
     );
}
 
export default Lista;