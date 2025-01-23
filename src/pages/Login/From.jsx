import { Flex, useColorModeValue } from "@chakra-ui/react";

const FormContainer = ({children}) => {
  return (
    <Flex
    as="form"
    direction="column"
    bgColor={useColorModeValue('gray.100', 'gray.700')}
    p="1rem"
    rounded="lg"
    // w={{ base: '100%', }}
    m="10%"
    align="center"
    justify="center"
    
  >
    {children}
  </Flex>
  );
}

export default FormContainer;