import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Flex, Link, IconButton, Menu, MenuButton, MenuList, MenuItem, Button, useTheme } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/landing");
  };

  const isAuthenticated = !!localStorage.getItem("token");

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
      <Link as={RouterLink} to="/home" {...buttonStyles} onClick={toggleMenu}>
        Home
      </Link>
      <Link as={RouterLink} to="/home/submit" {...buttonStyles} onClick={toggleMenu}>
        Letter/Photo
      </Link>
      {/* <Link as={RouterLink} to="/home/submissions" {...buttonStyles} onClick={toggleMenu}>
        View Submissions
      </Link> */}
      {isAuthenticated ? (
        <Button variant="ghost" onClick={handleLogout} {...buttonStyles} color="red.600">
          Logout
        </Button>
      ) : (
        <>
          <Link as={RouterLink} to="landing/login" {...buttonStyles} onClick={toggleMenu}>
            Login
          </Link>
          <Link as={RouterLink} to="landing/signup" {...buttonStyles} onClick={toggleMenu}>
            Sign Up
          </Link>
        </>
      )}
    </>
  );

  return (
    <Box as="nav" bg="white" shadow="md" px={6} w="full" pos="fixed" top={0} left={0} zIndex={20}>
      <Flex alignItems="center" justifyContent="space-between" h={16}>
        {/* Desktop */}
        <Flex display={{ base: "none", md: "flex" }} alignItems="center">
          {buttons}
        </Flex>

        {/* Mobile */}
        <Flex display={{ base: "flex", md: "none" }} justifyContent="space-between" w="full" alignItems="center">
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
              <MenuItem onClick={toggleMenu} as={RouterLink} to="/home">
                Home
              </MenuItem>
              <MenuItem onClick={toggleMenu} as={RouterLink} to="/home/submit">
                Letter/Photo
              </MenuItem>
              {/* <MenuItem onClick={toggleMenu} as={RouterLink} to="/home/submissions">
                View Submissions
              </MenuItem> */}
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
      </Flex>
    </Box>
  );
};

export default Nav;
