import { Outlet } from 'react-router-dom'
import './App.css'
import { ChakraProvider, Box, Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react';

function App() {
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  useEffect(() => {
    const url = "https://pub-static.fotor.com/assets/bg/49048260-583c-4945-a120-1df8c88e28ed.jpg";
    setBackgroundImage(url);
  }, []);

  return (
    <>
    <ChakraProvider>
      <Box
        position="relative"
        width="100%"
        minHeight={"100%"}
        overflow="hidden"
      >
        <Image
          opacity={"0.8"}
          src={backgroundImage}
          alt="Background"
          position="absolute"
          width="100%"
          height="100%"
          objectFit="cover"
          zIndex={-1}
        />
        <Box zIndex={1} minHeight={"100vh"} overflowY={"auto"}>
          <Outlet />
        </Box>
        </Box>
    </ChakraProvider>
    </>
  )
}

export default App