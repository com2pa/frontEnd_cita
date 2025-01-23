// import {Norsing} from '../assets/Enfermera.jpg'
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { Box, Button, Card,  Flex,  Heading,    Image,    Text,  } from "@chakra-ui/react";
// import Corte from '../assets/Enfermera.jpg';
import Menu from "../layout/Menu";
import Footer from "../layout/Footer";
import Calendary  from "./Calendary";
import { useNavigate } from "react-router-dom";
import Slider from './Slider'
import '../App.css'

export const Home = () => {
  const navigate = useNavigate();
  const navToPage=(url)=>{
    navigate(url);
  };
  
  return (
    
    
    <>
      <Flex flexDir="column" gap={8} p={8} maxW="90rem" mx="auto">
        <Menu />
        {/* seccion 1 */}
        <Flex gap={4} flexDir={{ base: 'column', md: 'row', }}>
          <Card variant="outline" w="100%" textAlign="justify" justifyContent="center" className="slider">
            <Flex flexDir="column" alignContent="center"p={4}  gap="3rem">
            
              <Slider/>
            </Flex>
          </Card>
          {/* <Card variant="outline" width="100%" height="30rem" display={{base: 'none', md: 'block'}}>
            <Image src={Enfermera} alt="cerrar-equipo-listo-trabajar" height="100%" objectFit="cover" w="100%"  />
          </Card> */}
        </Flex>
        {/* seccion 2 */}
        <Box >
          <Flex gap="1rem" flexDir={{base: 'column', md: 'row'}}  >
            <Flex flexDir={{ base: "column", md: 'row'}}  w="100%" gap={4} align="center">
              <Card p={4} display="flex" variant="outline" w="100%" height="100%" flexDir="column" gap={4} justifyContent="center">
                <Heading>Nuestras citas activas</Heading>
                <Button 
                  bg="red.600" 
                  color="white"
                  size={{ base: 'md', md: 'lg' }}
                  boxShadow='dark-lg'
                  href="/contact" 
                  target="_blank"
                  onClick={()=>navToPage('/Contact')}
                > Pide tu cita!</Button>
              </Card>
              <Card 
                display="flex"
                 variant="outline" 
                 p={4}                   
                 w="100%" 
                 justifyContent="-moz-initial"
                h={{ base: '50vh', md: '70vh', lg: '80vh' }} 
                >
                <Calendary/>
              </Card>
            </Flex>
          </Flex>
        </Box>
        <Footer />
      </Flex>
    </>
    
    
  );
};

export default Home;