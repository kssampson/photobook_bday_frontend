import React, { useEffect, useState } from 'react';
import Letter from '../components/Letter';
import { Box, Button, Card, CardBody, CardFooter, Heading, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react';
import UploadFile from '../components/UploadFile';
import { useLoaderData } from 'react-router-dom';
import InstructionsModal from '../components/InstructionsModal';

export type Data = {
  id: number;
  username: string;
  email: string;
}

const LetterAndPhoto = () => {

  const userData = useLoaderData() as Data;
  console.log('userData on front end: ', userData)

  // const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  const [files, setFiles] = useState<File[]>([]);
  const [letterContent, setLetterContent] = useState<string>('');
  const [deltaContent, setDeltaContent] = useState<any>(null);
  // const [takePhotoFiles, setTakePhotoFiles] = useState<File[]>([]);  state for taking a photo later

  const handleSave = () => {
    console.log('files: ', files)
    // if (!letterContent.trim()) {
    //   setError('Letter content is required');
    //   return;
    // }
    // setError('');
    console.log('letterContent: ', letterContent);
    console.log('deltaContent: ', deltaContent);
  };

  return (
    <Box
        display="flex"
        justifyContent="center"
        alignItems={"center"}
        height={"100%"}
        padding={{base: 4, md: 8}}
        h={"100vh"}
        overflowY={"auto"}
      >
        <VStack>
          <Card w={"full"}>
            <CardBody>
              <Stack>
                <Heading size="md">Please Upload Your Photos</Heading>
                  <UploadFile
                    files={files}
                    setFiles={setFiles}
                  />
              </Stack>
              <Stack mt="6" spacing="3">
                <Heading size="md">Please Write Your Letter</Heading>
                <Letter
                  letterContent={letterContent}
                  setLetterContent={setLetterContent}
                  deltaContent={deltaContent}
                  setDeltaContent={setDeltaContent}
                />
              </Stack>
            </CardBody>
            <CardFooter justifyContent={"center"}>
              <Button ml={4} variant="solid" colorScheme="blue" onClick={handleSave}>
              Save
              </Button>
            </CardFooter>
          </Card>
        </VStack>
        <InstructionsModal />
    </Box>
  )
};

export default LetterAndPhoto;