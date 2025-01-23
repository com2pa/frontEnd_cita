'use client';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Link,
  useToast,
  Heading,
} from '@chakra-ui/react';
import {
  FiHome,  
  FiMenu,
  FiChevronDown,
  
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import { IoIosNotificationsOutline, IoIosPersonAdd } from 'react-icons/io';
import { FcFile } from 'react-icons/fc';
import { MdMedicalServices } from 'react-icons/md';
import { useEffect, useMemo, useState } from 'react';
import { FaUser } from 'react-icons/fa';
// import Socket from './socket';
// menu lateral
const LinkItems = [
  { name: 'Home', icon: FiHome,to:'/dashboard' },
  { name: 'Servicio', icon: MdMedicalServices  ,to:'/servicio'},
  { name: 'Mis Servicios', icon: IoIosPersonAdd, to: '/add'},
  { name: 'Citas', icon: FcFile, to:'/cita' },
  { name:'User',icon: FaUser , to:'/user'}
  
];

const SidebarContent = ({ onClose, ...rest }) => {
 
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        {/* <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo222
        </Text> */}
        <Heading 
          fontSize={{  base: 'flex', md: 'none' }} 
          color="red.600"  
          shadow="dark-lg "p='1' 
          rounded='sm' 
          bg='white'
        > CITA
        </Heading>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} name={link.name} to={link.to}/>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, name, to, ...rest }) => {
  return (
    <Link
      as={ReactRouterLink}
      to={to}

      style={{ textDecoration: 'none' }}

      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {name}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const {auth} = useAuth();
  const navegate = useNavigate();
  const toast = useToast();
  
  
  // cerrar sesion
  const handleLogout = async () => {
    try {
      const response = await axios.get('/api/logout');
      navegate('/');
     
      toast({
        title: 'sesion',
        description: response.data.message,
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

   




  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={
          <FiMenu 
            bg="yellow.100"
           
          />}
      />
      {/* logo telf */}
      <Heading 
        display={{ base: 'flex', md: 'none' }}
        fontSize="md" 
        color="red.600"  
        shadow="dark-lg "p='1' 
        rounded='sm' 
        bg='white'
      > CITA
      </Heading>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
            <Box>
              {/* <IoIosNotificationsOutline 
                size={'2rem'}              
                color={{
                  color: notificationCount.length > 0 ? 'yellow' : 'green.400',
                  transition: 'color 0.3s ease',}
                }
              /> */}
             
             
            </Box>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  {/* colocando usuario  */}
                  <Text fontSize="sm">{auth?.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {auth?.role}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown/>
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              // bg={useColorModeValue('white', 'gray.900')}
              // borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              {/* <MenuItem>Profile</MenuItem> */}
              {/* <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem> */}
              <MenuDivider />
              <MenuItem  
                bg={useColorModeValue('red', 'red.600')}
                borderColor={useColorModeValue('red', 'red.600')}
                onClick={handleLogout}
              >Cerrar sesion</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = ({  children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">

        {/* <Socket /> */}
        {children}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;