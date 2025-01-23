import { Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react'
// import RegisterForm from './RegisterForm';
export const Index = () => {
  return (
    <Flex 
    bgColor={useColorModeValue('white', 'black')}
    h="100vh"
    p="4"
    justify="center"
    align="center">
      {/* <RegisterForm/> */}
        
    </Flex>
  )


}

export default Index;
