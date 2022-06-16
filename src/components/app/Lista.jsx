import React from 'react'
import { useContext } from 'react'
import { SpotifyContext } from '../../context/spotify'

const Lista = () => {

    const {data} = useContext(SpotifyContext);

    if(!data.length) return <p>Loading...</p>;

    return ( 
        <ul class="list-group list-group-flush container mx-auto">
            {data.map((item,index) => (
                <li class="lista-item">
                    <div className='d-flex align-items-center'> 
                        <span className='text-muted'>#{index+1}</span>
                        <img src={item.image} className='lista-imagen'/>
                    </div>
                    <div className=''>
                        <a href={item.url} target='__blank' className='lista-artista'>{item.name}</a>
                        <p className='text-muted'>{item.genres}</p>
                    </div>
                    
                </li>
            ))}
        </ul>
     );
}
 
export default Lista;