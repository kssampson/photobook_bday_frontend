import React, { useEffect, useRef, useState } from 'react';
import Letter from '../components/Letter';
import { Box, Button, Card, CardBody, CardFooter, Checkbox, FormControl, FormHelperText, Heading, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react';
import UploadFile from '../components/UploadFile';
import { useLoaderData } from 'react-router-dom';
import InstructionsModal from '../components/InstructionsModal';
import saveLetter from '../utils/saveLetter';
import getLetter from '../utils/getLetter';
import Quill from 'quill';
import savePhoto from '../utils/savePhoto';


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

  const handleLetterSave = async () => {
    if (letterContent.length === 0) {
      setError('Letter content is required');
      return;
    }
    setError('');
    const token = localStorage.getItem('token');
    const response = await saveLetter(userData.id, token, letterContent, deltaContent);
  };

  const handlePhotoSave = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();

    const userDataIdStr = userData.id.toString();

    //formData only accepts string, so append the id as a str for querying the db
    formData.append('id', userDataIdStr);

    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await savePhoto(formData, token);
      console.log('savePhoto response in LetterAndPhoto: ', response);
    } catch (error) {
      console.error('Error saving photo: ', error);
    }
  }

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
        minHeight={"100%"}
        // h={"100vh"}
        padding={{base: 4, md: 8}}
      >
        <VStack p={4}>
          <Card w={"full"}>
            <CardBody className='tooshie'>
              <Stack>
                <Heading size="md">Hi {userData.username}!</Heading>
                <Heading size="sm" pt={4}>{files.length >= 2 ? '' : 'Select up to 2 photos'}</Heading>
                <VStack>
                  <UploadFile
                    files={files}
                    setFiles={setFiles}
                  />
                  <Box py={8}>
                    <Button variant="solid" colorScheme="blue" size={"md"} onClick={handlePhotoSave}>Save photo(s)</Button>
                  </Box>
                </VStack>
              </Stack>
              <Stack mt="4">
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
              <Button ml={4} variant="solid" colorScheme="blue" onClick={handleLetterSave}>
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