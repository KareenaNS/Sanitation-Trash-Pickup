import React, { useContext } from "react";
import { Image, Flex, Text, useTheme, Box, HStack, Divider, Avatar, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext'; 
import { NavLink, useNavigate } from "react-router-dom"; 
import logo from '../images/logo.png'; 

const NavBar = () => {
    const { user, logout } = useContext(AuthContext); 
    const navigate = useNavigate();
    const theme = useTheme();
    const { colors } = theme;

    return (
        <Box w={'100%'} p={"1rem 5rem"}>
            <Flex justify={'space-between'} align={'baseline'}>
                
                {/* Logo section on the left */}
                <Flex align="center">
                    <NavLink to={"/"} textDecoration="none">
                        <Flex align="center"> {/* Added wrapping Flex */}
                            <Image 
                                src={logo} 
                                alt="WasteWise Logo"
                                boxSize="50px" 
                                mr={2} 
                                onError={(e) => {
                                    // Log error if the image fails to load
                                    console.error('Image failed to load:', e);
                                }}
                            />
                            {/* <Text 
                                color={colors.body} 
                                fontSize={'2xl'} 
                                fontWeight={'900'}
                                _hover={{'color': colors.mauve}} 
                            >
                                WasteWise
                            </Text> */}
                        </Flex>
                    </NavLink>
                </Flex>

                {/* Navigation links section on the right */}
                <Flex align={'center'} justify={'end'}>
                    <HStack spacing={'10'}>
                        <NavLink to={"/"} textDecoration="none">
                            <Text 
                                color={colors.body} 
                                fontSize={'xl'}
                                _hover={{'color': colors.mauve}} 
                            >
                                Home
                            </Text>
                        </NavLink>

                        <NavLink to={"/components/add-resident"} textDecoration="none">
                            <Text 
                                color={colors.body} 
                                fontSize={'xl'}
                                _hover={{'color': colors.mauve}} 
                            >
                                Add Resident
                            </Text>
                        </NavLink>
                        {user && (
                            <Menu>
                                <MenuButton>
                                    <Flex alignItems="center">
                                        <Avatar name={user.email} size="sm" mr={2} />
                                        {user.email}
                                    </Flex>
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={logout}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        )}
                    </HStack>
                </Flex>
            </Flex>
            
            <Divider borderColor={colors.body} border={"0.5px solid"} />
        </Box>
    );
};

export default NavBar;
