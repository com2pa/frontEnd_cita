import React, { useEffect, useState } from 'react';
import SidebarWithHeader from '../pagesPrivate/LayoutPrivate/SidebarWithHeader';
import {
  Button,
  ButtonGroup,
  Heading,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import { DeleteIcon } from '@chakra-ui/icons';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';

const Citas = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth(); 
  const toast = useToast();

  const loadCitasFromLocalStorage = () => {
    const savedCitas = JSON.parse(localStorage.getItem(`citas-${auth.user}`)) || [];
    setCitas(savedCitas);
  };

  const saveCitasToLocalStorage = (citas) => {
    localStorage.setItem(`citas-${auth.user}`, JSON.stringify(citas));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener citas solo para el usuario autenticado (auth.user)
        const { data } = await axios.get(`/api/customer?userId=${auth.user}`);
        
        // // Si las citas están en el localStorage, las fusionamos con las de la API (solo para el usuario autenticado)
        // const savedCitas = JSON.parse(localStorage.getItem(`citas-${auth.user}`)) || [];

        // // Fusionar citas de API y localStorage, pero solo las que corresponden al usuario autenticado
        // const allCitas = [...savedCitas, ...data].reduce((acc, cita) => {
        //   if (!acc.some((item) => item.id === cita.id)) {
        //     acc.push(cita);
        //   }
        //   return acc;
        // }, []);

        // Filtrar las citas para que solo se muestren las del usuario autenticado
        // const citasUsuario = allCitas.filter((cita) => cita.userId === auth.user);
        const citasUsuario = data.filter((cita) => cita.userId === auth.user);

        setCitas(citasUsuario);
        localStorage.setItem(`citas-${auth.user}`, JSON.stringify(citasUsuario)); // Guardar solo las citas del usuario autenticado
        setLoading(false); // Dejar de mostrar el loading
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [auth.user]);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/customer/${id}`);
      const updatedCitas = citas.filter((cita) => cita.id !== id);
      setCitas(updatedCitas);
      saveCitasToLocalStorage(updatedCitas);

      toast({
        title: 'Éxito',
        description: 'La cita ha sido eliminada exitosamente.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar la cita.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleStatus = async (id, newStatus) => {
    try {
      await axios.patch(`/api/customer/${id}`, { status: newStatus });
      const updatedCitas = citas.map((cita) =>
        cita.id === id ? { ...cita, status: newStatus } : cita
      );
      setCitas(updatedCitas);
      saveCitasToLocalStorage(updatedCitas);

      toast({
        title: 'Actualización exitosa',
        description: 'El estado de la cita ha sido actualizado.',
        status: 'success',
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el estado de la cita.',
        status: 'error',
        isClosable: true,
      });
    }
  };

  return (
    <SidebarWithHeader>
      <Heading mb={5}>Citas</Heading>
      <TableContainer>
        <Table
          variant='striped' 
          colorScheme='blue'
              size="base"                
          fontSize={{base:'10',md:'15',lg:'20'}}
          borderCollapse="collapse"

         >
          <Thead>
            <Tr>
              <Td>Nombre </Td>
              <Td>Fecha</Td>
              <Td>Hora</Td>
              <Td
                textAlign={'center'}  
              >Status</Td>
              <Td>Acciones</Td>
            </Tr>
          </Thead>
          {citas.length === 0 && (
              <Tr>
                <Td colSpan={5}>No hay citas registradas.</Td>
              </Tr>
            )}
           
                 <Tbody>
            
            {citas.map((cita) => (
              <Tr
                key={cita.id}
                bg={cita.status === 'finalizado' ? 'gray.200' : 'white'}
              >
                <Td>{cita.name}</Td>
                <Td>
                  {cita.date.split('T')[0]}
                </Td>
                <Td>{cita.time}</Td>
                <Td
                textAlign={'center'}
                >
                  <ButtonGroup>
                    <Button
                      onClick={() => handleStatus(cita.id, 'espera')}
                      disabled={cita.status === 'espera'}
                      bg={cita.status === 'espera' ? 'yellow.300' : 'white'}
                      mx={'1rem'}
                      size={{base:'sm',md:'md'}}
                    >
                      Espera
                    </Button>
                    <Button
                      onClick={() => handleStatus(cita.id, 'finalizado')}
                      disabled={cita.status === 'finalizado'}
                      bg={cita.status === 'finalizado' ? 'green.300' : 'white'}
                        mx={'1rem'}
                        size={{base:'sm',md:'md'}}

                    >
                      Finalizado
                    </Button>
                  </ButtonGroup>
                </Td>
                <Td
                >
                  <IconButton
                    onClick={() => handleDelete(cita.id)}
                    color="white"
                    bg="red.600"
                    icon={<DeleteIcon />}
                    mx={'1rem'}
                    size={{base:'sm',md:'md'}}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>

         
        </Table>
      </TableContainer>
    </SidebarWithHeader>
  );
};

export default Citas;
