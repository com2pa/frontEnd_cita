
import {  Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Services from '../pages/Services';
import Contact from '../pages/Contact';
import Index from '../pages/Login/Index';
import RegisterFrom from '../pages/Login/RegisterForm';
import LoginForm from '../pages/Login/LoginForm';
import Verify from '../pages/verify';
import PersistAuth from '../components/PersistAuth';
import Calendary from '../pages/Calendary';

export const Root = () => {
  return (
    <>
      <Routes>
        <Route element={<PersistAuth />}>
          <Route path='/' element={<Home />} />   
        </Route>        
        {/* <Route path='/services' element={<Services />} /> */}
        <Route path='/contact' element={<Contact />} />
        <Route path='/sesion' element={<Index />} />
        <Route path='/register' element={<RegisterFrom />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/verify/:id/:token' element={<Verify />} />
        <Route path='/calendary' element={<Calendary/>}/>        
      </Routes>

    </>
  );

};

export default Root;