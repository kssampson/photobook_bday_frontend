import { useState } from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import LandingInfoCard from "../components/LandingInfoCard";
import { Outlet } from "react-router-dom";

const Landing = () => {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [danielleImage, setDanielleImage] = useState<string>('');

  return (
    <Box zIndex={1} height="100%" className='booger'>
          <Outlet />
      <Box
        display="flex"
        justifyContent="center"
        alignItems={"center"}
        height={"100vh"}
        padding={{base: 4, md: 8}}
        className="booger-inner"
      >
        <LandingInfoCard danielleImage={danielleImage} setDanielleImage={setDanielleImage}/>
      </Box>
      </Box>
  );
}

export default Landing;
