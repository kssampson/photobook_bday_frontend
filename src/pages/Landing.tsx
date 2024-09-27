import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import LandingInfoCard from "../components/LandingInfoCard";

const Landing = () => {
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [danielleImage, setDanielleImage] = useState<string>('');

  const goHome = () => {
    navigate('/pages/home');
  }

  useEffect(() => {
    const url = "https://pub-static.fotor.com/assets/bg/49048260-583c-4945-a120-1df8c88e28ed.jpg";
    setBackgroundImage(url);
  }, []);

  return (

      <Box
        display="flex"
        justifyContent="center"
        alignItems={"center"}
        height={"100%"}
        padding={{base: 4, md: 8}}
      >
        <LandingInfoCard danielleImage={danielleImage} setDanielleImage={setDanielleImage}/>
      </Box>

  );
}

export default Landing;
