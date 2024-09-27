import { validateInputs } from "../utils/validateInputs";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, VStack, useToast, Spinner } from "@chakra-ui/react"
import login from "../utils/login";

type Props = {
  visitorId: string | null;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  usernameSubmitted: boolean;
  setUsernameSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  passwordSubmitted: boolean;
  setPasswordSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const Login = ( { visitorId, setIsLoggedIn, username, setUsername, password, setPassword, usernameSubmitted, setUsernameSubmitted, passwordSubmitted, setPasswordSubmitted, isOpen, onOpen}: Props ) => {

  const toast = useToast();

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
    </Box>
  )
}

export default Login