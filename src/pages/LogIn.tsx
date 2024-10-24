import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, VStack, useToast, Stack, useDisclosure, CardBody, Card } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import login from "../utils/login";
import OtpModal from "../components/OtpModal";
import { validateInputs } from "../utils/validateInputs";
import { useLoaderData, useNavigate } from "react-router-dom";

const LogIn = () => {

  const navigate = useNavigate();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [visitorId, setVisitorId] = useState<string | null>(null);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [usernameSubmitted, setUsernameSubmitted] = useState<boolean>(false);
  const [passwordSubmitted, setPasswordSubmitted] = useState<boolean>(false);

  const isErrorUsername = !validateInputs.isValidUsername(username) && usernameSubmitted;
  const isErrorPassword = !validateInputs.isValidPassword(password) && passwordSubmitted;

  const onChangeName = (e: any) => {
    setUsername(e.target.value);
    setUsernameSubmitted(false);
  };

  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
    setPasswordSubmitted(false);
  };

  const resetFormStates = () => {
    setUsername("");
    setPassword("");
    setUsernameSubmitted(false);
    setPasswordSubmitted(false);
  };

  const onSubmit = async () => {
    setUsernameSubmitted(true);
    setPasswordSubmitted(true);

    if (!validateInputs.isValidUsername(username) || !validateInputs.isValidPassword(password)) {
      return;
    }

    try {
      const response = await login(username, password, visitorId);
      if (response.success) {
        localStorage.setItem("token", response.token);
        toast({
          title: "Login Successful",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        resetFormStates();
        navigate('/home');
      } else if (response.needs2Fa) {
        onOpen();
      } else {
        toast({
          title: "Error",
          position: "top-right",
          description: response.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        resetFormStates();
      }
    } catch (error) {
      toast({
        title: "Error Logging In",
        position: "top-right",
        description: "Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      resetFormStates();
    }
  };

  useEffect(() => {
    const fetchVisitorId = async () => {
      const fp = await FingerprintJS.load();
      const { visitorId } = await fp.get();
      setVisitorId(visitorId);
    };
    fetchVisitorId();
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
      <VStack>
        <Card>
          <CardBody>
            <Heading textAlign={"center"} mb={6}>Log-In</Heading>
            <Box maxWidth={"100%"} width={"100%"}>
              <Stack spacing={3}>
                <FormControl isInvalid={isErrorUsername} isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input value={username} onChange={onChangeName} />
                  {isErrorUsername && <FormErrorMessage>Username is invalid</FormErrorMessage>}
                </FormControl>

                <FormControl isInvalid={isErrorPassword} isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" value={password} onChange={onChangePassword} />
                  {isErrorPassword && <FormErrorMessage>Password is required</FormErrorMessage>}
                </FormControl>

                <Button colorScheme="blue" onClick={onSubmit}>
                  Submit
                </Button>
                <Button onClick={() => navigate("/landing/signup")}>
                  Back to sign-up
                </Button>
              </Stack>
            </Box>

          </CardBody>
        </Card>
      </VStack>

      {/* OTP Modal */}
      <OtpModal
        visitorId={visitorId}
        username={username}
        password={password}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default LogIn;
