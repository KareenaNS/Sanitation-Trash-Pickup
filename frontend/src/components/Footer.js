import React from "react";
import { useTheme } from "@chakra-ui/react"; 
import { Flex, Text, Icon, Box, Divider } from "@chakra-ui/react";
import { MdCopyright } from "react-icons/md";


/**
 * Footer Component
 * Contains all of the code for the footer at the bottom of the page 
 *      including the logo, links to "About", "Terms and conditions", and "Privacy Policy", copyright message, and a divider.
 */
const Footer = () => {
 
    const theme = useTheme();
    const { colors } = theme;

  return (
    <>
    <Box w={'100%'} position={'fixed'} bottom={'0'} p={'0.5rem 5rem'} bg={colors.white}>
        
        {/* Divider at top of footer */}
        <Divider borderColor={colors.body} border={"0.5px solid"} />

        {/* Main footer container */}
        <Flex pt={'0.5rem'} w={'100%'} bg={colors.white} align={'baseline'}>

            <Flex justify={'left'} w={'50%'} align={'center'} gap={10}>  
                {/* Logo */}
                <Text fontSize={'lg'} fontWeight={'900'}>Google QualPat</Text> 

                {/* Link to About page */}
                <a href="#" target="_blank" rel={'noreferrer'}>
                    <Flex gap="0.5rem">
                    <Text fontSize={'sm'}>About</Text>
                    </Flex>
                </a>

                {/* Link to Terms and conditions page */}
                <a href="#" target="_blank" rel={'noreferrer'}>
                    <Flex gap="0.5rem">
                    <Text fontSize={'sm'}>Terms and conditions</Text>
                    </Flex>
                </a>

                {/* Link to Privacy Policy page */}
                <a href="#" target="_blank" rel={'noreferrer'}>
                    <Flex gap="0.5rem">
                    <Text fontSize={'sm'}>Privacy Policy</Text>
                    </Flex>
                </a>
            </Flex>

            {/* Copyright message on the right */}
            <Flex w={'50%'} justify={'end'} gap={1} align={'center'}>
                <Icon as={MdCopyright} boxSize={3}/>
                <Text fontSize={"xs"}>2024 All Right Reserved</Text>
            </Flex>
        </Flex>
    </Box>
    </>
  );
}

export default Footer;