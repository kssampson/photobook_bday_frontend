import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, VStack, useToast, Text, CardBody, Card, IconButton } from "@chakra-ui/react";
import { validateInputs } from "../utils/validateInputs";
import createUserSubmit from "../utils/createUserSubmit";
import { useEffect, useState } from "react";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';


const SignUp = () => {

  const [visitorId, setVisitorId] = useState<string | null>(null);

  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [secondPassword, setSecondPassword] = useState<string>("");

  const [usernameSubmitted, setUsernameSubmitted] = useState<boolean>(false);
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);
  const [passwordSubmitted, setPasswordSubmitted] = useState<boolean>(false);
  const [secondPasswordSubmitted, setSecondPasswordSubmitted] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showSecondPassword, setShowSecondPassword] = useState<boolean>(false);

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

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const toggleShowSecondPassword = () => {
    setShowSecondPassword(prev => !prev);
  };

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
        navigate("/landing/login");
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

  useEffect(() => {
    const setFp = async () => {
      const fp = await FingerprintJS.load();
      const { visitorId } = await fp.get();
      setVisitorId(visitorId);
    };

    setFp();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={"center"}
      minHeight={"100%"}
      h={"100vh"}
      padding={{base: 4, md: 8}}
    >
      <VStack >
        <Card>
          <CardBody>
            <Heading textAlign={"center"} mb={6}>Create Account</Heading>
            <Box as="form" onSubmit={(e: any) => { e.preventDefault(); onSubmit(); }} maxWidth={"100%"} width={"100%"}>
              <Stack spacing={3}>
                <Box>
                  <FormControl isInvalid={isErrorUsername} isRequired>
                    <FormLabel>Username:</FormLabel>
                    <Input type='text' placeholder="'Dolly', 'Willie', 'Patsy', etc." _placeholder={{ opacity: 0.6 }} value={username ? username : ""} onChange={onChangeusername} />
                    {!isErrorUsername ? null : (
                      <FormErrorMessage>Username is required.</FormErrorMessage>
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
                    <Stack direction="row" alignItems="center">
                      <Input type={showPassword ? 'text' : 'password'} placeholder="Minimum 8 characters" _placeholder={{ opacity: 0.6 }} value={password} onChange={onChangePassword} />
                      <IconButton
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={toggleShowPassword}
                      />
                    </Stack>
                    {!isErrorPassword ? null : (
                      <FormErrorMessage>{password.length < 8 && 'Must be at least 8 characters'}</FormErrorMessage>
                    )}
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isInvalid={isErrorSecondPassword} isRequired>
                    <FormLabel>Confirm Password:</FormLabel>
                    <Stack direction="row" alignItems="center">
                      <Input type={showSecondPassword ? 'text' : 'password'} value={secondPassword} onChange={onChangeSecondPassword} />
                      <IconButton
                        aria-label={showSecondPassword ? "Hide password" : "Show password"}
                        icon={showSecondPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={toggleShowSecondPassword}
                      />
                    </Stack>
                    {!isErrorSecondPassword ? null : (
                      <FormErrorMessage>Passwords Do Not Match.</FormErrorMessage>
                    )}
                  </FormControl>
                </Box>
                <Button
                colorScheme='blue'
                // onClick={onSubmit}
                type="submit"
                >Create Account
                </Button>
                <Box textAlign={"center"}>
                  <Text>or</Text>
                </Box>
                <Button onClick={() => navigate("/landing/login")}>
                log in
                </Button>
              </Stack>
            </Box>

          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default SignUp;