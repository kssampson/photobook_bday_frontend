import { validateInputs } from "../utils/validateInputs";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, VStack, useToast, Spinner, useDisclosure } from "@chakra-ui/react"
import login from "../utils/login";
import { redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useNavigate } from "react-router-dom";
import OtpModal from "../components/OtpModal";


const LogIn = () => {

  const toast = useToast();

  const [visitorId, setVisitorId] = useState<string | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [usernameSubmitted, setUsernameSubmitted] = useState<boolean>(false);
  const [passwordSubmitted, setPasswordSubmitted] = useState<boolean>(false);

  const isErrorUsername = !validateInputs.isValidUsername(username) && usernameSubmitted;
  const isErrorPassword = !validateInputs.isValidPassword(password) && passwordSubmitted;

  const onChangeName = (e: any) => {
    setUsernameSubmitted(false);
    setUsername(e.target.value);
  }

  const onChangePassword = (e: any) => {
    setPasswordSubmitted(false)
    setPassword(e.target.value);
  }

  const resetUsernamePasswordStates = () => {
    setUsername("");
    setPassword("");
    setUsernameSubmitted(false);
    setPasswordSubmitted(false);
    return null;
  }

  const onSubmit = async () => {
      try {
        setUsernameSubmitted(true);
        setPasswordSubmitted(true);
        const response = (await login(username, password, visitorId)).data;
        if (response.success) {
          const token = response.data.token;
          const id = response.data.id;
          localStorage.setItem("token", token);
          resetUsernamePasswordStates();
          setIsLoggedIn(true);
          toast({
            title: "Login successful.",
            position: "top-right",
            description: `${response.message}`,
            status: "success",
            duration: 7000,
            isClosable: true,
          });
          resetUsernamePasswordStates();
          redirect('/temp')
        } else if (!response.success) {
          //check for invalid email
          if (response.invalidUsername || response.invalidPassword || response.noVisitorRecord) {
            toast({
              title: "Error:",
              position: "top-right",
              description: `${response.message}`,
              status: "error",
              duration: 7000,
              isClosable: true,
            });
            resetUsernamePasswordStates();
          } else if (response.needs2Fa) {
            toast({
              title: "Notice: ",
              position: "top-right",
              description: `${response.message}`,
              status: "error",
              duration: 7000,
              isClosable: true,
            });
            onOpen();
          }
        }
        return;
      } catch (error) {
        toast({
          title: "Error logging in. Please try again.",
          position: "top-right",
          description: `${error}`,
          status: "error",
          duration: 7000,
          isClosable: true,
        });
        resetUsernamePasswordStates();
      }
  }

  useEffect(() => {
    const setFp = async () => {
      const fp = await FingerprintJS.load();
      const { visitorId } = await fp.get();
      setVisitorId(visitorId);
    };

    setFp();
  }, []);

  return (
    <Box>
      <VStack >
        <Heading mb={6}>Log-In</Heading>
        <Box maxWidth={"75%"} width={"100%"}>
          <Stack spacing={3}>
                <Box>
                  <FormControl isInvalid={isErrorUsername} isRequired>
                    <FormLabel>Username:</FormLabel>
                    <Input type='text' value={username ? username : ""} onChange={onChangeName} />
                    {!isErrorUsername ? null : (
                      <FormErrorMessage>Name is required.</FormErrorMessage>
                    )}
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isInvalid={isErrorPassword} isRequired>
                    <FormLabel>Password:</FormLabel>
                    <Input type='password' value={password} onChange={onChangePassword} />
                    {!isErrorPassword ? null : (
                      <FormErrorMessage>Password is required.</FormErrorMessage>
                    )}
                  </FormControl>
                </Box>
                <Button
                colorScheme='blue'
                onClick={onSubmit}
                >Submit
                </Button>
          </Stack>
        </Box>
      </VStack>
      <OtpModal
          visitorId={visitorId}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          setIsLoggedIn={setIsLoggedIn}
        />
    </Box>
  )
}

export default LogIn;