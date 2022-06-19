import React,{ useContext , useEffect, Fragment, useState} from "react";
import { SpotifyContext } from "../../context/spotify";

import Lista from "./Lista";
import Tracks from '../tracks/Tracks';

const Home = () => {

    // const navigate = useNavigate();

    const {getUser, user, setTop, setTime, getData, setType,
        top,type,time
    } = useContext(SpotifyContext);

    const [desing, setDesing] = useState(true);


    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === 'top') {
            setTop(value);
        }else if (name == 'time') {
            setTime(value);
        }
        getData();
    }

    const handleType = (type)=>{
        setType(type);
        getData();
    }

    const init = async()=>{
        await getUser();
    }
    
    useEffect(() =>{
        init();
    },[top,time,type]);

    if(!user) return <p>Loading...</p>

    return (
        <Fragment>
            <div className='perfil'>
                <h1 className='nombre'>{user.display_name}</h1>
                <img src={user.image} className="imagen-perfil" alt="User Image"/>
            </div>
            
            <nav className="nav mt-2 mx-5 ">
                <div className='col-sm-6'>
                    <p 
                        onClick={()=>handleType('artists')}
                    className='tops text-center'>Top Artists</p>
                </div>

                <div className='col-sm-6'>
                    <p 
                        onClick={()=>handleType('tracks')}
                    className='tops text-center'>Top Tracks</p>
                </div>

            </nav>

            <div className="container">
                <div className="row">
                    <div className="col-md-4 mt-2">
                    <select
                    name='top'
                    onChange={handleChange}
                    class="form-select" aria-label="Default select example">
                        <option value="10">Top 10</option>
                        <option value="20">Top 20</option>
                        <option value="50">Top 50</option>
                    </select>
                    </div>
                <div className="col-md-4 mt-2">
                    <select
                    name='time'
                    onChange={handleChange}
                    class="form-select" aria-label="Default select example">
                        <option value="short_term">Last Month</option>
                        <option value="medium_term">Last 6 Months</option>
                        <option value="long_term">All of time</option>
                    </select>
                </div>

                <div className="col-md-4 mt-2">
                    <select
                    name='time'
                    onChange={()=>{
                        setDesing(!desing);
                    }}
                    class="form-select" aria-label="Default select example">
                        <option value="short_term">Flat</option>
                        <option value="medium_term">Spotify</option>
                    </select>
                </div>
            </div>
            </div>

            {desing ?
                <Lista />
                :
                <Tracks/>
            }


        </Fragment>
     );
}
 
export default Home;