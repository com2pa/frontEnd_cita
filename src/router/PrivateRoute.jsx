
import { Route, Routes } from 'react-router-dom';

import Servicio from '../pages/CreateServicio';
import PersistAuth from '../components/PersistAuth';
import Index from '../pages/Index';
import Appointment from '../pages/Appointment';
import AddPrecioService from '../pages/AddPrecioService';
import Citas from '../pages/Citas'
import User from '../pages/User';


export const Root = () => {
  return (


    <>
    
      <Routes>
        <Route element={<PersistAuth />}>
          <Route path='/dashboard' element={<Index/>}/>
          <Route path='/servicio' element={<Servicio/>}/>
          <Route path='/add' element={<AddPrecioService/>}/>
          <Route path='/cita' element={<Citas/>}/>
          <Route path='/user' element={<User/>}/>
         
        </Route>
      </Routes>

    </>


  );

};

export default Root;