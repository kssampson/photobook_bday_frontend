import { Box} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Landing = () => {

  return (
    <Box zIndex={1} height="100%" className='booger'>
          <Outlet />
      </Box>
  );
}

export default Landing;
