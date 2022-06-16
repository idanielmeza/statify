import Login from './components/auth/login';
import Auth from './components/auth/auth';
import SpotifyProvider from './context/spotify';
import Home from './components/app/Home';
import React from 'react';

import {Routes, BrowserRouter, Route} from 'react-router-dom';
import PrivateRoute from './components/routes/privateRoute';

const App = () => {
  return ( 
    <SpotifyProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path='/app' element={
          <PrivateRoute>
            <Home/>
          </PrivateRoute>
        }/>
      </Routes>
    </BrowserRouter>
    </SpotifyProvider>
   );
}
 
export default App;