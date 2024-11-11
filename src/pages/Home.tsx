import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const Home = () => {

  return (
    <Box position="relative" width={"100%"} minHeight={"100vh"} >
      <Box pb={["44px", "44px", "40px"]}>
        <Nav />
      </Box>
      <Box zIndex={1} height="100%">
        <Outlet />
      </Box>
    </Box>
  );
}

export default Home;