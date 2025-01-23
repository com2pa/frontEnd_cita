import React, { useEffect, useState } from 'react'
import SidebarWithHeader from '../pagesPrivate/LayoutPrivate/SidebarWithHeader'
import { Box, Button, Card, CardHeader, Flex, FormControl, FormLabel, Input, List, ListItem, Select, useToast, } from '@chakra-ui/react'
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import ListPriceService from './ListPriceService';

const AddPrecioService = () => {
  const [services, setCategorias] = useState([]);
  const [selectedService,setServiceSelected] = useState('');
  const [price, setPrice] = useState('');
  const [precio , setPrecio] =useState([])
  

  const { auth} = useAuth();
  const toast=useToast()
   // obteniendo todos los servicios
   useEffect(() => {
    
   const getServices = async () => {
    try {
      const {data} = await axios.get('/api/service');
      // console.log(data)
     
      setCategorias(data);

    } catch (error) {
      console.error(error);
    }
  };
  getServices();
  }, [setCategorias]);

  // mostrando los precio con el servicio
  useEffect(() => {
    const getPrecio = async () => {
      try {
        const {data} = await axios.get('/api/price');
        // console.log(data,'...')
       // Filtra los precios según el usuario actual
      const userPrices = data.filter((price) => price.createdBy === auth.userId);
        setPrecio(userPrices);
      } catch (error) {
        console.error(error);
      }
    };
    getPrecio();
  }, [setPrecio,auth.userId]);

   
  // creando precio
  const handleNewPrecioService = async (e) => {
    e.preventDefault();
    
    // console.log(price,selectedService)
    try {
      
       const response = await axios.post('/api/price', {
         price,
         selectedService,
  
      });
      toast({
        title: 'Precio agregado',
        description: 'El precio del servicio ha sido agregado correctamente.',
        status:'success',
        duration: 5000,
        isClosable: true,
      });
      // limpiar formulario
        // Actualizar lista de precios sin recargar
      setPrecio((prev) => [...prev, { ...response.data, service: { NameService: selectedService } }]);
      setPrice('');
     setServiceSelected('');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Hubo un error al agregar el precio del servicio.',
        status:'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // editar el precio
  const handleEditPrecio = async (id, newPrice, selectedService) => {
  try {
    const response = await axios.put(`/api/price/${id}`, {
       precio: newPrice,
      selectedService,
    });
    toast({
      title: 'Precio editado',
      description: 'El precio del servicio ha sido editado correctamente.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    setPrecio((prev) => prev.map((price) => 
   price.id === id ? { ...price, precio: newPrice, service: { ...price.service, _id: selectedService } } : price
));
  } catch (error) {
    toast({
      title: 'Error',
      description: 'Hubo un error al editar el precio del servicio.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }
};

  // eliminar el precio
const handleDeletePrecio = async (id) => {
  
  try {
    await axios.delete(`/api/price/${id}`);
    toast({
      title: 'Precio eliminado',
      description: 'El precio del servicio ha sido eliminado correctamente.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    setPrecio((prev) => prev.filter((price) => price.id !== id));
  } catch (error) {
    toast({
      title: 'Error',
      description: 'Hubo un error al eliminar el precio del servicio.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }
};



  return (
    <SidebarWithHeader>
      <Card>

       {auth.role === 'admin' && 
          (   
          <>
            <Flex 
              justifyContent="center" 
              // onSubmit={handleNewCategoria}
              >
              <CardHeader >Ingrese el Servicio</CardHeader>           

            </Flex>
            <Box>
              <Flex flexDirection="row" m="2rem" gap={3}>
                <FormControl>
                  <FormLabel>Country</FormLabel>
                  <Select placeholder='Select country' onChange={(e)=>setServiceSelected(e.target.value)}>
                    { services.map((service) => (
                        <option  key={service.id} value={service.id}>{service.NameService}</option>
                      ))}
                  </Select>
                </FormControl>             
              </Flex>
              <Flex flexDirection="row" m="2rem" gap={3}>
                <FormControl>
                  <FormLabel>Precio</FormLabel>
                  <Input 
                    type='number' 
                    placeholder='Precio'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </FormControl>
              </Flex>
              
              <Flex justifyContent="center">
                
                <Button 
                  type='submit' 
                  variant='solid' 
                  colorScheme='teal'
                  onClick={handleNewPrecioService}
                  mb={4}
                >
                  Add
                </Button>
              </Flex>
            </Box>          

          </>
          )
        }
        {auth.role === 'empleado' && 
          (   
          <>
            <Flex 
              justifyContent="center" 
              // onSubmit={handleNewCategoria}
              >
              <CardHeader >Ingrese el Servicio</CardHeader>           

            </Flex>
            <Box>
              <Flex flexDirection="row" m="2rem" gap={3}>
                <FormControl>
                  <FormLabel>Country</FormLabel>
                  <Select placeholder='Select country' onChange={(e)=>setServiceSelected(e.target.value)}>
                    { services.map((service) => (
                        <option  key={service.id} value={service.id}>{service.NameService}</option>
                      ))}
                  </Select>
                </FormControl>             
              </Flex>
              <Flex flexDirection="row" m="2rem" gap={3}>
                <FormControl>
                  <FormLabel>Precio</FormLabel>
                  <Input 
                    type='number' 
                    placeholder='Precio'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </FormControl>
              </Flex>
              
              <Flex justifyContent="center">
                
                <Button 
                  type='submit' 
                  variant='solid' 
                  colorScheme='teal'
                  onClick={handleNewPrecioService}
                  mb={4}
                >
                  Add
                </Button>
              </Flex>
            </Box>          

          </>
          )
        }
      </Card>
      

       
       <Card mt={5}>
              <Flex 
                justifyContent="center" 
              >
                <CardHeader >Mis Precio</CardHeader>
              </Flex>

            </Card>
          {/* añadiendo precio */}
          <Card>
            <List>
              {precio.length > 0 ? (
                precio.map((priceItem) => (
                  <ListPriceService
                    key={priceItem._id}
                    priceItem={priceItem}
                    handleEditPrecio={handleEditPrecio}
                    handleDeletePrecio={handleDeletePrecio} 
                    
                  />
                ))
              ) :  (
                <ListItem>No hay precios disponibles.</ListItem>
              )}
            </List>
           
          </Card>
          

       

    </SidebarWithHeader>
  )
}

export default AddPrecioService
