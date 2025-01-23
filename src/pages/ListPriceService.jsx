import React, { useState } from 'react'
import {ButtonGroup, Card, Flex, IconButton, Input, Text, VStack } from '@chakra-ui/react'
import { ImPencil2 } from 'react-icons/im';
import { useAuth } from '../hooks/useAuth';
import { DeleteIcon } from '@chakra-ui/icons';

const ListPriceService = ({priceItem,handleDeletePrecio,handleEditPrecio}) => {
    const [editedPrice, setEditedPrice] = useState(priceItem.precio);
    const [isInputActive, setIsInputActive]= useState(false);
    // const [isEditing , SetIsEditing] = useBoolean();

    const { auth} = useAuth();

    // console.log('111', priceItem)
    
   
  return (
    <Card key={priceItem.id}>
        <VStack spacing={4} p={4}>        
            <Flex>
                <Flex flexDir="row" gap="0.5rem" justifyContent="flex-end" >
                    <Text fontSize="lg" fontWeight="bold">{priceItem.service.NameService}</Text>   
                    <Input
                        value={editedPrice} 
                        type="number"
                        onChange={(e) => setEditedPrice(e.target.value)}
                        
                        // contentEditable='true'
                    />
                        {auth.role === 'admin' && (
                        <>              
                            <ButtonGroup>                      
                            <IconButton 
                            onClick={() => handleEditPrecio(priceItem.id, editedPrice, priceItem.service.id)} 
                                color="white" 
                                bg="yellow.300" 
                                icon={<ImPencil2 /> }
                            />
                            <IconButton 
                                onClick={() => handleDeletePrecio(priceItem.id)} 
                                color="white" bg="red.600" 
                                icon={<DeleteIcon/> }
                            />  
                            </ButtonGroup>
                        </>
                        )}
                        {auth.role === 'empleado' && (
                        <>              
                            <ButtonGroup>                      
                            <IconButton 
                            onClick={() => handleEditPrecio(priceItem.id, editedPrice, priceItem.service.id)} 
                                color="white" 
                                bg="yellow.300" 
                                icon={<ImPencil2 /> }
                            />
                            <IconButton 
                                onClick={() => handleDeletePrecio(priceItem.id)} 
                                color="white" bg="red.600" 
                                icon={<DeleteIcon/> }
                            />  
                            </ButtonGroup>
                        </>
                        )}
                </Flex>
            </Flex> 
        
        </VStack>
    </Card>
  )
}
export default ListPriceService
