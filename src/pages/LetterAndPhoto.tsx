import React, { useEffect, useRef, useState } from 'react';
import Letter from '../components/Letter';
import { Box, Button, Card, CardBody, CardFooter, Checkbox, FormControl, FormHelperText, Heading, Stack, Text, VStack, useToast } from '@chakra-ui/react';
import UploadFile from '../components/UploadFile';
import { useLoaderData } from 'react-router-dom';
// import InstructionsModal from '../components/InstructionsModal';
import saveLetter from '../utils/saveLetter';
import getLetter from '../utils/getLetter';
import Quill from 'quill';
import savePhoto from '../utils/savePhoto';
import getPhotos from '../utils/getPhotos';
import SavedPhotos from '../components/SavedPhotos';
import RelationRadio from '../components/RelationRadio';
import deletePhoto from '../utils/deletePhoto';

export type Data = {
  id: number;
  username: string;
  email: string;
}


const LetterAndPhoto = () => {
  const quillRef = useRef<Quill | null>(null);

  const toast = useToast();

  const userData = useLoaderData() as Data;

  // const [radioValue, setRadioValue] = useState("other");
  const [files, setFiles] = useState<File[]>([]);
  const [photos, setPhotos] = useState<any>(null);
  const [letterContent, setLetterContent] = useState<string>('');
  const [deltaContent, setDeltaContent] = useState<any>(null);
  const [readOnly, setReadOnly] = useState(false);
  const [error, setError] = useState<string>('');

  const handleLetterSave = async () => {
    if (letterContent.length === 0) {
      setError('Letter content is required');
      return;
    }
    setError('');
    const token = localStorage.getItem('token');
    try {
      const response = await saveLetter(userData.id, token, letterContent, deltaContent);
      setReadOnly(!readOnly)
      toast({
        title: "Succes",
        position: "top-right",
        status: "success",
        description: `${response.message}`,
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        position: "top-right",
        status: "error",
        description: `${error.message}`,
        duration: 3000,
        isClosable: true,
      });
    }
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
      const newPhoto = {url1: response.url1 };
      setPhotos(newPhoto);
      setFiles([]);
      toast({
        title: 'Success',
        position: "top-right",
        description: `${response.message}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      console.error('Error saving photo: ', error);
      toast({
        title: 'Error',
        position: "top-right",
        description: `${error.message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
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

  const retrieveExistingPhotos = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await getPhotos(token);
      if (response[0]) {
        const savedPhotos = { url1: response[0].url1 }
        setPhotos(savedPhotos);
      }
    }
  }

  const handleDeletePhoto = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await deletePhoto(token);
        if (response.success) {
          setPhotos(null);
          toast({
            title: 'Success',
            position: "top-right",
            description: 'Photo deleted successfully',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error: any) {
        console.error('Error deleting photo:', error);
        toast({
          title: 'Error',
          position: "top-right",
          description: `${error.message}`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }

    }
  }

  useEffect(() => {
    retrieveExistingLetter();
    retrieveExistingPhotos();
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
            <CardBody>
              <Stack>
                <Heading size="lg">Hi {userData.username}!</Heading>
                <Heading size="sm" pt={4}>{photos ? 'Your Saved Photo:' : 'Select a photo'}</Heading>
                {!photos && (
                <VStack>
                  <UploadFile
                    files={files}
                    setFiles={setFiles}
                  />
                  {files.length > 0 && (
                    <Box py={8}>
                      <Button variant="solid" colorScheme="blue" size={"md"} onClick={handlePhotoSave}>Save photo</Button>
                    </Box>
                  )}
                </VStack>
                )}
                {photos && (
                  <VStack>
                    <SavedPhotos photos={photos} handleDeletePhoto={handleDeletePhoto}/>
                  </VStack>
                )}
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
              </Stack>
            </CardBody>
              {!readOnly && (
            <CardFooter justifyContent={"center"}>
                <FormControl>
                  <FormHelperText>
                    <Text>Max chars: 2000</Text>
                    <Text>Current char count: {quillRef.current?.getLength()}</Text>
                  </FormHelperText>
                </FormControl>
                <Button ml={4} variant="solid" colorScheme="blue" onClick={handleLetterSave}>
                Save
                </Button>
            </CardFooter>
              )}
          </Card>
        </VStack>
        {/* <InstructionsModal /> */}
    </Box>
  )
};

export default LetterAndPhoto;