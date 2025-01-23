import {  Button, ButtonGroup, Flex, FormControl,  FormHelperText, FormLabel, Heading, useToast, Input, Card, } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../../layout/Menu';
import Footer from '../../layout/Footer';
import { useNavigate } from 'react-router-dom';


// regex
const REGEX_EMAIL=/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const REGEX_NAME = /^[A-Z][a-z]*[ ][A-Z][a-z]*$/;
const REGEX_NUMBER = /^[0](212|412|414|424|416|426)[0-9]{7}$/;
const REGEX_PASS =/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,15}$/;

export const RegisterForm = ({handleShow}) => {
  const[name,setName]=useState('');
  const[nameValidation, setNameValidation]=useState(false);

  const[email,setEmail]=useState('');
  const[emailValidation, setEmailValidation]=useState(false);

  const[password,setPassword]=useState('');
  const[passwordValidation, setPasswordValidation]=useState(false);
  

  const[phone,setPhone]=useState('');
  const[phoneValidation, setPhoneValidation]=useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const navToPage=(url)=>{
    navigate(url);
  };


  const handleNameInput = ({target})=>{
    setName(target.value);
    // console.log(target.value)
  };
  const handleEmailInput = ({target})=>{
    setEmail(target.value);
  };
  const handlePasswordInput = ({target})=>{
    setPassword(target.value);
  };
  const handlePhoneInput = ({target})=>{
    setPhone(target.value);
  };

  const handleNewUser = async ()=>{
    try {
      console.log(1);
      const{data} = await axios.post(`/api/users`,{name,email,phone,password});
      
      toast({
        position:'top',
        title: 'Success',
        description: data,       
        status:'success',
        duration: 4000,
        isClosable: true,
      }); 
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
    // limpiar input
    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
    
    

    
  };

  useEffect(()=>{
    setNameValidation(REGEX_NAME.test(name));
  },[name]);

  useEffect(()=>{
    setEmailValidation(REGEX_EMAIL.test(email));
  },[email]);

  useEffect(()=>{
    setPasswordValidation(REGEX_PASS.test(password));
  },[password]);

  useEffect(()=>{
    setPhoneValidation(REGEX_NUMBER.test(phone));
  },[phone]);


  return (
    <>
    
      <Flex flexDir="column" gap={10} p={8} maxW="69rem" mx="auto">
        <Menu/>     
        <Card 
          variant="outline" 
          w="100%" 
          textAlign="justify" 
          justifyContent="center"
          p={{base:3,lg:5}}
          bg="gray.50"
          borderRadius="lg"
          boxShadow="lg"
          border="1px solid"
          borderColor="gray.200" 
          
        >
          <Flex justifyContent={{base:"center",md:"center",lg:"center",xl:"center"}}>
            <Heading m={{base:"1rem",md:"1rem",lg:"1.2rem",xl:"1.5rem"}} >Register</Heading>
          </Flex>          
          <FormControl isRequired>
            <FormControl isInvalid={!nameValidation && name}>
              <Flex flexDir="column" marginBottom="1rem">
                <FormLabel  >Nombre</FormLabel>
                <Input onChange={handleNameInput} type="text" placeholder="Nombre Apellido" value={name} autoComplete="off" required />
              </Flex>

              {nameValidation ? ''

                : (
                  <FormHelperText color='red' border='0.5px solid red' margin='0.5rem' padding='1rem'>
                    <p> Debe comenzar con mayuscula tanto el nombre como apellido</p>
                    <p>1.- Primer caracter en Mayuscula del nombre seguido el resto del nombre en minuscula</p>
                    <p>2.- Primer caracter en Mayuscula deL apellido seguido el resto del nombre en minuscula
                    Merwil Vegas</p>
                  </FormHelperText>
                // <FormErrorMessage>
                //     Tu nombre no es valido
                // </FormErrorMessage>
                )}
            </FormControl>

            <FormControl isInvalid={!emailValidation && email}>
              <Flex flexDir="column" marginBottom="1rem">
                <FormLabel flexDir="column">Email</FormLabel>
                <Input onChange={handleEmailInput} type="email" placeholder="Correo" autoComplete="off" value={email} />
              </Flex>
              {emailValidation ? ''

                : (
                  <FormHelperText color='red' border='0.5px solid red' margin='0.5rem' padding='1rem'>
                  Debe ser un correo valido
                  </FormHelperText>
                // <FormErrorMessage>
                //   Tu correo no es valido
                // </FormErrorMessage>
                )
              }

            </FormControl>
            <FormControl isInvalid={!phoneValidation && phone}>
              <Flex flexDir="column" marginBottom="1rem">
                <FormLabel>Telefono</FormLabel>
                <Input onChange={handlePhoneInput} type="text" placeholder="Telefono" autoComplete="off" value={phone} />
              </Flex>
              {phoneValidation ? ''

                : (
                  <FormHelperText color='red' border='0.5px solid red' margin='0.5rem' padding='1rem'>
                  Debe ser un numero de telefono valido
                    <p>1-. Debe comenzar con 0</p>
                    <p>2.- seguido 212  o 412 o 414 o 416 424  o 426</p>
                  </FormHelperText>
                // <FormErrorMessage>
                //   Tu numero de telefono no es valido
                // </FormErrorMessage>
                )

              }

            </FormControl>
            <FormControl isInvalid={!passwordValidation && password}>
              <Flex flexDir="column" marginBottom="1rem">
                <FormLabel>Contraseña</FormLabel>
                <Input onChange={handlePasswordInput} type="password" placeholder="Contraseña" autoComplete="off" value={password} />
              </Flex>
              {passwordValidation ? ''



                : (
                  <FormHelperText color='red' border='0.5px solid red' margin='0.5rem' padding='1rem'>
                    <p>Debe contener al menos una mayuscula, una minuscula, un numero y un caracter especial </p>
                    <p>1.- Contiene al menos una letra mayúscula ([A-Z]). </p>
                    <p>2.- Contiene al menos una letra minúscula ([a-z]). </p>
                    <p>3.- Contiene al menos un dígito . </p>
                    <p>4.- No tiene espacios en blanco. </p>
                    <p>5.- Contiene al menos un carácter especial que no sea letra ni dígito . </p>
                    <p>6.- Tiene una longitud total entre 8 y 15 caracteres. </p>
                  </FormHelperText>             

                )
              }          

            </FormControl>

          </FormControl>
          <Flex justifyContent={{base:"center",md:"center",lg:"center",xl:"center"}}>
            <ButtonGroup m={{base:"1rem",md:"1rem",lg:"1.2rem",xl:"1.5rem"}}>
              <Button variant="ghost" onClick={()=>navToPage('/login')}>  Ingresar</Button>
              <Button 
                isDisabled={!phoneValidation || !nameValidation || !emailValidation || !passwordValidation} 
                colorScheme="green" 
                onClick={handleNewUser} >
                Register
              </Button>
              
            </ButtonGroup>

          </Flex>
          <Footer/>
        </Card>
      </Flex>

    </>
        
  );
 
};

export default RegisterForm;