import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Flex, Link, IconButton, Menu, MenuButton, MenuList, MenuItem, Button, useTheme } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
// import Socials from "./Socials";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();  // Chakra UI theme hook for colors, fonts, etc.

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/login"); // Redirect to login page
  };

  const isAuthenticated = !!localStorage.getItem("token"); // Check if user is logged in

  const buttonStyles = {
    fontSize: "md",
    px: 3,
    py: 2,
    color: "gray.700",
    fontWeight: "medium",
    _hover: { color: "blue.500" },
    transition: "color 0.3s ease",
  };

  const buttons = (
    <>
      <Link as={RouterLink} to="/landing" {...buttonStyles} onClick={toggleMenu}>
        Home
      </Link>
      <Link as={RouterLink} to="/submit" {...buttonStyles} onClick={toggleMenu}>
        Submit
      </Link>
      {isAuthenticated ? (
        <Button variant="ghost" onClick={handleLogout} {...buttonStyles} color="red.600">
          Logout
        </Button>
      ) : (
        <>
          <Link as={RouterLink} to="/login" {...buttonStyles} onClick={toggleMenu}>
            Login
          </Link>
          <Link as={RouterLink} to="/signup" {...buttonStyles} onClick={toggleMenu}>
            Sign Up
          </Link>
        </>
      )}
    </>
  );

  return (
    <Box as="nav" bg="white" shadow="md" px={6} w="full" pos="fixed" top={0} left={0} zIndex={20}>
      <Flex alignItems="center" justifyContent="space-between" h={16}>
        {/* Desktop View */}
        <Flex display={{ base: "none", md: "flex" }} alignItems="center">
          {buttons}
        </Flex>

        {/* Mobile View */}
        <Flex display={{ base: "flex", md: "none" }} justifyContent="space-between" w="full" alignItems="center">
          {/* <Socials /> */}
          <Menu isOpen={isOpen}>
            <MenuButton
              as={IconButton}
              aria-label="Menu"
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              variant="outline"
              colorScheme="blue"
              onClick={toggleMenu}
            />
            <MenuList>
              <MenuItem onClick={toggleMenu} as={RouterLink} to="/landing">
                Home
              </MenuItem>
              <MenuItem onClick={toggleMenu} as={RouterLink} to="/submit">
                Submit
              </MenuItem>
              {isAuthenticated ? (
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              ) : (
                <>
                  <MenuItem onClick={toggleMenu} as={RouterLink} to="/login">
                    Login
                  </MenuItem>
                  <MenuItem onClick={toggleMenu} as={RouterLink} to="/signup">
                    Sign Up
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>
        </Flex>

        {/* Right Aligned Icons on Desktop */}
        {/* <Flex display={{ base: "none", md: "flex" }} alignItems="center" ml="auto">
          <Socials />
        </Flex> */}
      </Flex>
    </Box>
  );
};

export default Nav;
