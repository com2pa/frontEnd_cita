
import { Box, Button, ButtonGroup, Card, CardHeader, Flex, FormControl,  Input, List, useToast,} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import SidebarWithHeader from '../pagesPrivate/LayoutPrivate/SidebarWithHeader.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import ServiceCard from './ServiceCard.jsx';

const REGEX_NAME = /^(?=.*[A-Z])[A-Za-z0-9\s!@#$%^&*()_+=[\]{}|;':",.<>?]{1,100}$/;

export const CreateServicio = () => {

  const[NameService, setNameService] = useState('');
  const[newCategorias, setNewCategorias] = useState([]);
  const[nameValidation, setNameValidation]=useState(false);
  

  const { auth} = useAuth();
  
  const handleNameInput = ({target})=>{
    setNameService(target.value);
    // console.log(target.value);
  };
  
  useEffect(() => {
    const getCategories = async () => {
      const {data} = await axios.get(`/api/service`);
      setNewCategorias(data);
    };
    getCategories();
  }, [setNewCategorias]);

  

  const toast = useToast();

 
  const handleNewCategoria = async (e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post(`/api/service`,{NameService});
      
      toast({
        position:'top',
        title: 'Success',
        description: data.NameService,
        status:'success',
        duration: 4000,
        isClosable: true,
      });
      console.log('datos ',data);

      setNewCategorias(newCategorias.concat(data));
      setNameService(''); 


    } catch (error) {
      toast({
        position:'top',
        title: 'Error',
        status: 'error',
        description: error.response.data.error,
        duration: 9000,
        isClosable: true,
      });
      console.log(error);
    }
    
  };
  useEffect(()=>{
    setNameValidation(REGEX_NAME.test(NameService));
  },[NameService]);


  // console.log('muestra todo los servicio',newCategorias);

  //-- editar 
  const updateService = async (updateService)=>{
    console.log('servicio a editar', updateService);
    const id=updateService.id; 
    const up=updateService.NameService;
    console.log(id,up);
    
    try {
      const {data} = await axios.put(`/api/service/${updateService.id}`, {NameService: up});
      console.log('data Enviada',data);  
      toast({
        position:'top',
        title: 'Success',
        // description: 'editado',
        description:data.updateService,
        status:'success',
        duration: 4000,
        isClosable: true,
      });
     
    }catch(error){
      console.log(error);
      toast({
        position:'top',
        title: 'Error',
        status: 'error',
        description: error.response.data.error,
        duration: 9000,
        isClosable: true,
      });
      
    }
  };

  // eliminar
  const handleDelete = async (id)=>{
    try {
      console.log(2);
      
      const{data} = await axios.delete(`/api/service/${id}`);
      // console.log(data,'eliminando');

      const updatedCategorias = newCategorias.filter((cat) =>  cat.id !== id);
      setNewCategorias(updatedCategorias);
      // console.log(updatedCategorias);
      
      toast({
        position:'top',
        title: 'Success',
        description: data,
        status:'success',
        duration: 4000,
        isClosable: true,
      });
      // console.log(data);
    }catch(error){
      console.log(error);
      toast({
        position:'top',
        title: 'Error',
        status: 'error',
        description: error.response.data.error,
        // duration: 9000,
        isClosable: true,
      });
    }
  };


  return (
    <SidebarWithHeader>
      <Card>
        {auth.role === 'admin' && (
          <>
        
            <Flex 
              justifyContent="center" 
              onSubmit={handleNewCategoria}
            >
              <CardHeader >Ingrese el Servicio</CardHeader>
              {/* Agregar formulario */}

            </Flex>
        
            <Box>
              <Flex 
                 flexDirection={{base:'column',md:'row'}} 
                 m="2rem" 
                 gap={3}
                 
              >
                <FormControl isInvalid={!nameValidation}>
                  {/* Formulario */}
                  <Input 
                    type="text" 
                    placeholder="Nombre del Servicio" 
                    value={NameService}
                    onChange={handleNameInput}
                  />
                </FormControl>
                <ButtonGroup                  
                >
                  <Button 
                    type="submit" 
                    colorScheme='green' 
                    onClick={handleNewCategoria}
                    isDisabled={!nameValidation}
                    w={'100%'}
                  >  Agregar Servicio
                  </Button>
                </ButtonGroup>
              </Flex>
            </Box>
          </>
        )}
      </Card>
      {/* Listado de categorias */}
      <Card mt={5}>
        <Flex 
          justifyContent="center" 
        >
          <CardHeader >Servicio</CardHeader>
        </Flex>

      </Card>
      {/* añadiendo servicios */}
      <List>
        {/* {newCategorias.map((service) => (
         
          <ServiceCard
            key={service.id} 
            
            name={service.NameService} 
            updateService={updateService}
            handleDelete={handleDelete}
            service={service} 
          />
        ))} */}
        {newCategorias.map((cat) => (
          <ServiceCard 
            key={cat.id} 
            handleDelete={handleDelete} 
            service={cat} 
            updateService={updateService}
          />
        ))}
      </List>
    </SidebarWithHeader>

  );

};

export default CreateServicio;