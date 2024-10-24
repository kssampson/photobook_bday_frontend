import { Box } from "@chakra-ui/react";
import LandingInfoCard from "../components/LandingInfoCard";
import { useState } from "react";

const LandingInfo = () => {

  const [danielleImage, setDanielleImage] = useState<string>('');
  return (
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
  )
};

export default LandingInfo;