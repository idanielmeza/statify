import React from 'react'
import { useContext } from 'react'
import { SpotifyContext } from '../../context/spotify'

const Lista = () => {

    const {data, type, top} = useContext(SpotifyContext);

    if(!data.length) return <p>Loading...</p>;
    return ( 
        <>
        <div className='mx-auto text-center'>
                <p className=" mt-5 d-inline-flex py-2 px-5 fw-semibold text-success bg-success bg-opacity-10 border border-success border-opacity-10 rounded-2"> Top {top} {type}</p>
        </div>
        <ul class="list-group list-group-flush container mx-auto">
            {data.map((item,index) => (
                <li class="lista-item">
                    <div className='d-flex align-items-center'> 
                        <span className='text-muted'>#{index+1}</span>
                        <img src={item.image} className='lista-imagen'/>
                    </div>
                    <div className=''>
                        <a href={item.url} target='__blank' className='lista-artista'>{item.name}</a>
                        <p className='text-muted'>{item.artists}</p>
                    </div>
                    
                </li>
            ))}
        </ul>
        </>
     );

}
 
export default Lista;