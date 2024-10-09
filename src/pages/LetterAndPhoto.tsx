import React, { useEffect, useRef, useState } from 'react';
import Letter from '../components/Letter';
import { Box, Button, Card, CardBody, CardFooter, Checkbox, FormControl, FormHelperText, Heading, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react';
import UploadFile from '../components/UploadFile';
import { useLoaderData } from 'react-router-dom';
import InstructionsModal from '../components/InstructionsModal';
import saveLetter from '../utils/saveLetter';
import getLetter from '../utils/getLetter';
import Quill from 'quill';

export type Data = {
  id: number;
  username: string;
  email: string;
}

const LetterAndPhoto = () => {
  const quillRef = useRef<Quill | null>(null);

  const userData = useLoaderData() as Data;

  const [files, setFiles] = useState<File[]>([]);
  const [letterContent, setLetterContent] = useState<string>('');
  const [deltaContent, setDeltaContent] = useState<any>(null);
  const [readOnly, setReadOnly] = useState(false);
  const [photoViewOnly, setPhotoViewOnly] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // const [takePhotoFiles, setTakePhotoFiles] = useState<File[]>([]);  state for taking a photo later

  const handleSave = async () => {
    if (letterContent.length === 0) {
      setError('Letter content is required');
      return;
    }
    setError('');
    const token = localStorage.getItem('token');
    const response = await saveLetter(userData.id, token, letterContent, deltaContent);

  };

  const retrieveExistingLetter = async () =>  {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await getLetter(token);
      if (response && response.deltaContent) {
        setLetterContent(response.letterContent);
        setDeltaContent(response.deltaContent)
        quillRef.current?.setContents(response.deltaContent);
        setReadOnly(true);
      }
    }
  }

  useEffect(() => {
    //if there's an existing letter, populate form with the data and set to readOnly
    retrieveExistingLetter();
  }, [])

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
                <Heading size="md">Hi {userData.username}! Upload your photos below</Heading>
                  <UploadFile
                    files={files}
                    setFiles={setFiles}
                  />
              </Stack>
              <Stack mt="4" spacing="3">
                <Heading size="md">{!readOnly ? 'Please Write Your Letter': 'Your Letter to Danielle:'}</Heading>
                <Checkbox
                  isChecked={readOnly}
                  onChange={(e) => setReadOnly(e.target.checked)}
                >
                  {readOnly ? 'Uncheck to edit' : 'Read Only'}
                </Checkbox>
                <Letter
                  setLetterContent={setLetterContent}
                  setDeltaContent={setDeltaContent}
                  readOnly={readOnly}
                  error={error}
                  quillRef={quillRef}
                />
                <FormControl>
                  <FormHelperText>
                    <Text>Max Length: 2000</Text>
                    <Text>Current Length: {quillRef.current?.getLength()}</Text>
                  </FormHelperText>
                </FormControl>
              </Stack>
            </CardBody>
            <CardFooter justifyContent={"center"}>
              <Button ml={4} variant="solid" colorScheme="blue" onClick={handleSave}>
              Save
              </Button>
              <Button onClick={retrieveExistingLetter}>
                Get Letter Temp
              </Button>
            </CardFooter>
          </Card>
        </VStack>
        <InstructionsModal />
    </Box>
  )
};

export default LetterAndPhoto;