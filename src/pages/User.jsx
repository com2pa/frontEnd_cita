import { useEffect, useState } from 'react'
import SidebarWithHeader from '../pagesPrivate/LayoutPrivate/SidebarWithHeader'
import { Button, Heading, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'

const User = () => {
    const[user,setUser]=useState([])
    // obtener lista de usuarios conectados
     const { auth } = useAuth();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/users');
                // const data = response.filter(user => user.isOnline);               
                setUser(response.data);
                
                console.log(response);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData();
    }, []);
    // ELIMINANDO USER
    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`/api/users/${id}`);
            const updatedUsers = user.filter((user) => user.id!== id);
            setUser(updatedUsers);
        } catch (error) {
            console.log(error);
        }
    }
   
  return (
    <SidebarWithHeader>
        <Heading
            display="flex"
            justifyContent={{base:'center'}}
            alignItems="center"
            mb="1rem"
            fontSize="xl"
            fontWeight="bold"
        > Usuarios conectados</Heading>
        {/* Listado de usuarios conectados */}
        {/* <TableContainer>
            <Table size="sm" colorScheme="red">
                <Thead>
                    <Tr>
                        <Th>Nombre</Th>
                        <Th>Correo</Th>
                        <Td>Telefono</Td>
                        <Td>Rol</Td>
                        <Td>Permiso</Td>
                        <Td>Ultima Conexión</Td>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                     
                        {user.map(item => (
                            <Tr key={item.id}>
                                <Th>{item.name}</Th>
                                <Th>{item.email}</Th>
                                <Td>{item.phone}</Td>
                                <Td>{item.role}</Td>
                               
                            </Tr>
                        )
                    )}
                    </Tr>
                </Tbody>
            </Table>

        </TableContainer> */}
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
                    <Th>Nombre</Th>
                    <Th>correo</Th>
                    <Th isNumeric>Telefono</Th>
                    <Th>Rol</Th>
                    <Th>Permiso</Th>
                </Tr>
                </Thead>
                <Tbody
                  
                >
                    {user.map(item => (
                    <Tr key={item.id}>
                        <Td>{item.name}</Td>
                        <Td>{item.email}</Td>
                        <Td>{item.phone}</Td>
                        <Td>{item.role}</Td>
                        {auth.role === 'admin' && (
                            <Td><Button
                            variant="outline"
                            size="sm"
                            colorScheme="red"
                            onClick={() => handleDeleteUser(item.id)}        
                                >ELIMINAR</Button>
                            </Td>
                        )}


                        </Tr>
                        ))}
                
                
                </Tbody>    
            </Table>
        </TableContainer>
       
      
    </SidebarWithHeader>
  )
}

export default User
