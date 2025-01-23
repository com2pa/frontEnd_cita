import { DeleteIcon } from "@chakra-ui/icons";
import { ButtonGroup, Card, Flex, IconButton, Input } from "@chakra-ui/react";
import { ImPencil2 } from "react-icons/im";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const ServiceCard= ({service, handleDelete, updateService}) => {
  // updateService = actualizacion del servicio al editar
  // service.NameService
  const [serviceName, setServiceName] = useState(service.NameService);
  // isInputActive = input para editar el servicio si esta activo o no!
  const [isInputActive, setIsInputActive]= useState(false);
  // autenticacion de usuario
  const { auth} = useAuth();

  const handleEdit = () => {
    
    if (!isInputActive) {
      setIsInputActive(true);
    } else {
      console.log('SERVICIO ANTES', service);
      const updatedService = {...service, NameService: serviceName};
     
      // actuaizar la lista 
      if(updateService !== service){
        console.log('SERVICIO DESPUES', updatedService);
        updateService(updatedService);
        

      }
      setIsInputActive(false); 
      
    }
  };
  return (
    // 
    <Card  key={service.id}  mt={5} padding={7}> 
      <Flex  alignItems="center" gap={5} justifyContent="space-between"> 
        <Input
          id="texto"
          value={serviceName}
          readOnly={isInputActive ? false : true}
          borderWidth={isInputActive ? '2px' : '0px'}
          onChange={({ target }) => setServiceName(target.value)}
        />
        <Flex flexDir="row" gap="0.5rem" justifyContent="flex-end" >
          {/* onClick={(e) => handleEdit(e, index, service)} */}
          {auth.role === 'admin' && (
            <ButtonGroup>
                    
              <IconButton onClick={handleEdit} color="white" bg="yellow.300" icon={<ImPencil2 /> }/>
              <IconButton onClick={() => handleDelete(service.id)} color="white" bg="red.600" icon={<DeleteIcon/> }/>
                    
            </ButtonGroup>           
          )}

        </Flex>
      </Flex>
    </Card>
  );
};

export default ServiceCard;