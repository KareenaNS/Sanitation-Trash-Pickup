import React from "react";
import { useTheme } from "@chakra-ui/react"; 
import { Flex, Text, Box, HStack, Divider } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import { Menu, MenuButton, Avatar, MenuList, MenuItem } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

/**
 * NavBar Component
 * Contains all of the code for the navigation bar at the top of the page 
 *      including the logo, links to "Home" and "History" pages, and a divider.
 */
const NavBar = ({username, setUsername}) => {
    const navigate = useNavigate();

    // Access the custom theme from Chakra UI
    const theme = useTheme();
    const { colors } = theme;

//    const handleLogout = () => {
//         setUsername(""); //clear the username, logout
//         navigate("/"); //go back to login page after logout
//     }
    
    

    return (
        <Box w={'100%'} p={"1rem 5rem"}>
            <Flex justify={'space-between'} align={'baseline'}>
                
                {/* Logo section on the left */}
                <Flex>
                    <NavLink to={"/"} textDecoration="none">
                        <Text 
                            color={colors.body} 
                            fontSize={'2xl'} 
                            fontWeight={'900'}
                            _hover={{'color': colors.mauve}} // Change color on hover
                        >
                            Trash Pickup
                        </Text>
                    </NavLink>
                </Flex>

                {/* Navigation links section on the right */
                /*only show these when login */}
                {(
                    <Flex align={'center'} justify={'end'}>
                        <HStack spacing={'10'}>

                            {/* Link to Home page */}
                            <NavLink to={"/"} textDecoration="none">
                                <Text 
                                    color={colors.body} 
                                    fontSize={'xl'}
                                    _hover={{'color': colors.mauve}} // Change color on hover
                                >
                                    Home
                                </Text>
                            </NavLink>

                            {/* Link to Add Resident page */}
                            <NavLink to={"/components/add-resident"} textDecoration="none">
                                <Text 
                                    color={colors.body} 
                                    fontSize={'xl'}
                                    _hover={{'color': colors.mauve}} // Change color on hover
                                >
                                    Add Resident
                                </Text>
                            </NavLink>

                            {/*if the user is logged in, show the account menu */}
                            {/* {username && (
                                <Menu>
                                    <MenuButton>
                                        <Flex alignItems="center">
                                        <Avatar name={username} size="sm" mr={2} />
                                        {username}
                                        </Flex>
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </MenuList>
                                </Menu>
                            )} */}

                        </HStack>
                    </Flex>
                )}
                
            </Flex>
            
            {/* Divider below the navigation items */}
            <Divider borderColor={colors.body} border={"0.5px solid"} />
        </Box>
    );
};

export default NavBar;