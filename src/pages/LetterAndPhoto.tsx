import React from 'react';
import Letter from '../components/Letter';
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const LetterAndPhoto = () => {

  const navigate = useNavigate();
  return (
    <Box
        display="flex"
        justifyContent="center"
        alignItems={"center"}
        height={"100%"}
        padding={{base: 4, md: 8}}
      >
    <Card maxW="xl" >
      <CardBody>
        <Stack mt="6" spacing="3">
          <Heading size="md">Please Write Your Letter</Heading>
          <Letter />
        </Stack>
      </CardBody>
      <CardFooter>
        Card Footer
      </CardFooter>
    </Card>
    </Box>
  )
};

export default LetterAndPhoto;