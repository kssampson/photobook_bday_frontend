import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, VStack } from "@chakra-ui/react"
import { validateInputs } from "../utils/validateInputs";
import createUserSubmit from "../utils/createUserSubmit";
import { useToast } from '@chakra-ui/react'

type Props = {
  visitorId: string | null;
  setAccountCreated: React.Dispatch<React.SetStateAction<boolean>>
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  secondPassword: string;
  setSecondPassword: React.Dispatch<React.SetStateAction<string>>;
  usernameSubmitted: boolean;
  setUsernameSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  emailSubmitted: boolean;
  setEmailSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  passwordSubmitted: boolean;
  setPasswordSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  secondPasswordSubmitted: boolean;
  setSecondPasswordSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpForm = ( { visitorId, setAccountCreated, username, setUsername, email, setEmail, password, setPassword, secondPassword, setSecondPassword, usernameSubmitted, setUsernameSubmitted, emailSubmitted, setEmailSubmitted, passwordSubmitted, setPasswordSubmitted, secondPasswordSubmitted, setSecondPasswordSubmitted}: Props ) => {

  const toast = useToast();

  const isErrorUsername = !validateInputs.isValidUsername(username) && usernameSubmitted;
  const isErrorEmail = !validateInputs.isValidEmail(email) && emailSubmitted;
  const isErrorPassword = !validateInputs.isValidPassword(password) && passwordSubmitted;
  const isErrorSecondPassword = !validateInputs.isValidSecondPassword(password, secondPassword) && secondPasswordSubmitted;

  const onChangeusername = (e: any) => {
    setUsernameSubmitted(false);
    setUsername(e.target.value);
  }

  const onChangeEmail = (e: any) => {
    setEmailSubmitted(false);
    setEmail(e.target.value);
  }

  const onChangePassword = (e: any) => {
    setPasswordSubmitted(false)
    setPassword(e.target.value);
  }

  const onChangeSecondPassword = (e: any) => {
    setSecondPasswordSubmitted(false);
    setSecondPassword(e.target.value);
  }

  const onSubmit = async () => {
    try {
      setUsernameSubmitted(true);
      setEmailSubmitted(true);
      setPasswordSubmitted(true);
      setSecondPasswordSubmitted(true);

      if (!validateInputs.isValidUsername(username) || !validateInputs.isValidEmail(email) || !validateInputs.isValidPassword(password) || !validateInputs.isValidSecondPassword(password, secondPassword)) {
        return;
      }

      const response = await createUserSubmit({
        username: username,
        email: email,
        password: password,
        visitorId: visitorId,
      });

      if (response.success === false) {
        toast({
          title: `Error:`,
          position: "top-right",
          description: `${response.message}`,
          status: 'error',
          duration: 7000,
          isClosable: true,
        });
      } else if (response.success === true) {
        toast({
          title: `Success!`,
          position: "top-right",
          description: `${response.message} Please Log-in.`,
          status: 'success',
          duration: 7000,
          isClosable: true,
        });
        setAccountCreated(true);
      }


      setUsername("");
      setEmail("");
      setPassword("");
      setSecondPassword("");

      setUsernameSubmitted(false);
      setEmailSubmitted(false);
      setPasswordSubmitted(false);
      setSecondPasswordSubmitted(false);
    } catch (error) {
      toast({
        title: `Error creating account. Error: ${error}`,
        position: "top-right",
        description: `Please try again`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });

      setUsername("");
      setEmail("");
      setPassword("");
      setSecondPassword("");

      setUsernameSubmitted(false);
      setEmailSubmitted(false);
      setPasswordSubmitted(false);
      setSecondPasswordSubmitted(false);

      console.error(error);
    }
  };

  return (
    <Box>
      <VStack >
        <Heading mb={6}>Create Account</Heading>
        <Box maxWidth={"75%"} width={"100%"}>
          <Stack spacing={3}>
            <Box>
              <FormControl isInvalid={isErrorUsername} isRequired>
                <FormLabel>Username:</FormLabel>
                <Input type='text' value={username ? username : ""} onChange={onChangeusername} />
                {!isErrorUsername ? null : (
                  <FormErrorMessage>username is required.</FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Box>
              <FormControl isInvalid={isErrorEmail} isRequired>
                <FormLabel>Email:</FormLabel>
                <Input type='email' value={email} onChange={onChangeEmail} />
                {!isErrorEmail ? null : (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
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
            <Box>
              <FormControl isInvalid={isErrorSecondPassword} isRequired>
                <FormLabel>Confirm Password:</FormLabel>
                <Input type='password' value={secondPassword} onChange={onChangeSecondPassword} />
                {!isErrorSecondPassword ? null : (
                  <FormErrorMessage>Passwords Do Not Match.</FormErrorMessage>
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
  );
};

export default SignUpForm;