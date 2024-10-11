import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, HStack, Heading, ListItem, OrderedList, Stack, Text, UnorderedList, VStack } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

const Home = () => {

  const navigate = useNavigate();
  return (
    <Box position="relative" width="100vw" height={"100%"} overflow="hidden">
      <Box pb={["44px", "44px", "40px"]}>
          <Nav />
        </Box>
        <Box zIndex={1} height="100%" className='booger'>
          <Outlet />
        </Box>
      </Box>
  );
}

export default Home;