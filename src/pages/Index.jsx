import React, { useEffect, useState } from 'react';
import SidebarWithHeader from '../pagesPrivate/LayoutPrivate/SidebarWithHeader';
import {  Card, Flex, Heading, List, ListIcon, ListItem,Text, useToast } from '@chakra-ui/react';
import { MdCheckCircle,} from 'react-icons/md';
import { BsFillStopwatchFill } from 'react-icons/bs';
import { GiFinishLine } from 'react-icons/gi';
import axios from 'axios';


export const Index = () => {
  const toast = useToast();
  // notificacion de registro de cita
  const [notificacion, setNotificacion] = useState(0);

  // notificacion de cita finalizado
  const [finalizadaCount, setFinalizadaCount] = useState(0);

  // notificacion de cita en espera
  const [esperaCount, setEsperaCount] = useState(0);

   // Estado para controlar si los datos ya fueron cargados
  const [datosCargados, setDatosCargados] = useState(false);
  
 useEffect(() => {
    // Solo ejecuta la lógica si los datos no han sido cargados
    if (!datosCargados) {
      const fetchClientes = async () => {
        try {
          const { data } = await axios.get('/api/customer');

          // Contar citas por estado
          const esperas = data.filter((item) => item.status === 'espera').length;
          const finalizadas = data.filter((item) => item.status === 'finalizado').length;

          setEsperaCount(esperas);
          setFinalizadaCount(finalizadas);
          setNotificacion(data.length);

          // toast({
          //   position: 'top',
          //   status: 'info',
          //   title: 'Actualizaciones de pacientes',
          //   description: `Hay ${data.length} cliente(s) registrados.`,
          //   duration: 5000,
          //   isClosable: true,
          // });

          setDatosCargados(true); // Marcar como cargados
        } catch (error) {
          // toast({
          //   position: 'top',
          //   status: 'error',
          //   title: 'Error al obtener las citas actuales',
          //   description: error.response?.data?.error || 'Ocurrió un error inesperado.',
          //   duration: 5000,
          //   isClosable: true,
          // });
        }
      };

      fetchClientes();
    }
  }, [datosCargados, ]);
  return (
    <SidebarWithHeader>
      <Card p={5}>
        <Flex justifyContent="center">
          <Heading color="red.600"> Bienvenido</Heading>
        </Flex>
        
      </Card>
      <Card mt={5} display="flex" alignItems="center" p={5}>
        {/* Agregar contenido */}
        <Text>Resumen de Status de citas </Text>
        <List spacing={3} mt={5}>
          {/* <ListItem>
            
            <ListIcon as={MdCheckCircle} color='green.500' />
              Total de citas Activas : {notificacion}
          </ListItem> */}
          <ListItem>
            <ListIcon as={BsFillStopwatchFill} color='yellow.500' />
              Total de citas Esperas : {esperaCount}
          </ListItem>
          <ListItem>           
            <ListIcon as={GiFinishLine} color='red.600' />
              Total de citas Finalizadas :{finalizadaCount}
          </ListItem>
        </List>
      </Card>



    </SidebarWithHeader>
  );
};

export default Index;