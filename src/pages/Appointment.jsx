import React, { useEffect, useState } from "react";
import SidebarWithHeader from "../pagesPrivate/LayoutPrivate/SidebarWithHeader";
import axios from "axios";
import { 
  Button, 
  ButtonGroup, 
  Card, 
  Heading, 
  IconButton, 
  // Input, 
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay,   
  Table, 
  TableContainer, 
  Tbody, 
  Td, 
  
  
  Thead, 
  Tr, 
  useDisclosure, 
  useToast
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";
import { useAuth } from "../hooks/useAuth";


const Cita = () =>{
  const [patients, setPatients] = useState([]);  
  const {isOpen,onOpen,onClose} = useDisclosure();
  const [selectedPatient,setSelectedPatient]= useState(null);
  const {auth}=useAuth();


  const toast = useToast();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/patient/');
        setPatients(data);
        
        
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchData();
  }, [setPatients]);
    
  const handleDelete = async(id)=>{
    try {
      const { data } = await axios.delete(`/api/patient/${id}`);
      setPatients(patients.filter((patient)=>patient.id!==id));
      toast({
        title: 'Éxito',
        description: 'La cita ha sido eliminada exitosamente',data,
        status:'success',
        duration: 5000,
        isClosable: true,
      });
      
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar la cita',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const handleStatus = async(id, newStatus)=>{
    try{
      const {data}=  await axios.patch(`/api/patient/${id}`,{status:newStatus});
      const updatePatients = patients.map((patient)=>
        patient.id === id?{...patient, status:newStatus} : patient
      );
      console.log(data);
      console.log(updatePatients);
      setPatients(updatePatients);
      toast({
        title: 'Info',
        description: 'El estado de la cita ha sido actualizado',data,
        status: 'success',
        // duration: 5000,
        isClosable: true,
      });
    }catch(error){
      console.log(error);
      toast({
        title: 'Error',
        description:error.response.data.error,
        status: 'error',
        // duration: 5000,
        isClosable: true,
      });
    }
    
  };
 
  return (
    <>
      <SidebarWithHeader>
        <Heading mb={5}> Citas</Heading>
        <TableContainer>
          <Table 
            size='sm'  
            // variant='striped' 
            colorScheme='red'>

            <>
              <Thead>
                <Tr>
                  <th>Nombre y Apellido</th>
                  <th>Servicio </th>
                  <th>fecha</th>
                  <th>Hora</th>
                  <th>Status</th>
                   
                </Tr>
              </Thead>
              <Tbody>
              

                {patients.map((patient) => (
                  <Tr key={patient.id}>
                    <Td value={patient.id}>{patient.name}</Td>
                    <td>{patient.services.NameService}</td>
                    <Td>{patient.date[0].split('T')[0]}</Td>
                    <Td>{patient.time}</Td>
                    
                    <Td>
                      <ButtonGroup>
                        {auth.role ==='enfermero' && (
                          <>
                            <Button
                              onClick={() => handleStatus(patient.id, 'espera')}                              
                              disabled={patient.status === 'espera' }
                              bg={patient.status === 'espera' ? 'yellow.300' : 'white'}

                            >
                            espera
                            </Button>
                            <Button
                              onClick={() => handleStatus(patient.id, 'finalizado')}
                              disabled={patient.status === 'finalizado'}
                              bg={patient.status === 'finalizado' ? 'green.300' : 'white'}
                            >
                            Finalizado
                            </Button>
                            <Button bg="blue" onClick={() => {
                              onOpen();
                              setSelectedPatient(patient);
                            } }>
                            Ver Detalles
                            </Button>
                            
                        
                          </>
                        )}   
                     
                        {auth.role ==='admin' && (
                          <>
                            <Button
                              onClick={() => handleStatus(patient.id, 'espera')}                              
                              disabled={patient.status === 'espera' }
                              bg={patient.status === 'espera' ? 'yellow.300' : 'white'}

                            >
                            espera
                            </Button>
                            <Button
                              onClick={() => handleStatus(patient.id, 'finalizado')}
                              disabled={patient.status === 'finalizado'}
                              bg={patient.status === 'finalizado' ? 'green.300' : 'white'}
                            >
                            Finalizado
                            </Button>
                            <Button bg="blue" onClick={() => {
                              onOpen();
                              setSelectedPatient(patient);
                            } }>
                            Ver Detalles
                            </Button>
                           
                            
                        
                          </>
                        )}   
                        
                        {auth.role ==='admin' &&(
                          <>
                            <IconButton
                              onClick={() => handleDelete(patient.id)}
                              color="white" bg="red.600"
                              icon={<DeleteIcon />} />
                          </>
                        
                        )}
                      </ButtonGroup>


                    </Td>
                  </Tr>
                ))}
               

              </Tbody>
            </>
          </Table>
        </TableContainer>     
      </SidebarWithHeader>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalle de la cita</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>           
            {selectedPatient && (
              <Card p={5} borderLeft="2px" borderLeftColor="red.600">                
                <p>Status: <span>{selectedPatient.status}</span></p>
                <p>Dirección: <span>{selectedPatient.address}</span></p>
                <p>Teléfono: <span>{selectedPatient.phone}</span></p>
                <p>Edad: <span>{selectedPatient.age}</span></p>
                <p>Correo electrónico: <span>{selectedPatient.email}</span></p>
                <p>Síntoma: <span>{selectedPatient.description}</span></p>
              </Card>
            )}
          </ModalBody>
          <ModalFooter>            
            <Button onClick={onClose}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
     
    
     
  )   
    </>
  );
 
};

export default Cita;