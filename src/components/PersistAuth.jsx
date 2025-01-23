// Mantener sesion persistida
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Center, Flex, Heading, Spinner, Text } from "@chakra-ui/react";

const PersistAuth = () => {
  const location = useLocation();
  const { auth, setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(auth.name ? false : true);
  // console.log('inicio sesion',auth.name)
  // Obtener el usuario cada vez que cambia la url o se refresca la pagina para mantener la sesion persistida
  useEffect(() => {
    const handleUser = async () => {
      try {
        const { data } = await axios.get('/api/refres');
        setAuth(data);
        console.log(data.name);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setAuth({});
      }
    };
    handleUser();

  }, [setAuth]);

  //CUANDO CARGARDO EL USUARIO
  if (isLoading) {
    return <Center margin="5rem" flexDirection="column"> <Card padding="2rem 5rem" background="gray.500" > <Heading> Cargando</Heading><Flex justify="center" mt="1rem"><Text> Aguarde unos  Minutos !</Text><Spinner size='md' color="red.600"/></Flex> </Card></Center>;
 
  }

  //cuando estoy en home
  if (location.pathname === '/') {
    if (auth?.name) {
      return <Navigate to='/dashboard' state={{ from: location }} replace />;
    } else {
      return <Outlet />;
    }
  }

  //cuando estoy en cualquier ruta privada
  if (auth?.name) {
    return <Outlet />;
  } else {
    return <Navigate to='/' state={{ from: location }} replace />;
  }


};

export default PersistAuth;
