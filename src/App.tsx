import { useEffect, useState } from 'react';
import './App.css';
import { Box, VStack, Heading, Button, useDisclosure } from '@chakra-ui/react';
import SignUpForm from './components/SignUpForm';
import Login from './components/Login';
import LoginSuccessful from './components/LoginSuccessful';
import OtpModal from './components/OtpModal';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

function App() {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [accountCreated, setAccountCreated] = useState<boolean>(false);
  const [toggleLogInSignUp, setToggleLogInSignUp] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [secondPassword, setSecondPassword] = useState<string>("");

  const [usernameSubmitted, setUsernameSubmitted] = useState<boolean>(false);
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);
  const [passwordSubmitted, setPasswordSubmitted] = useState<boolean>(false);
  const [secondPasswordSubmitted, setSecondPasswordSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const setFp = async () => {
      const fp = await FingerprintJS.load();
      const { visitorId } = await fp.get();
      setVisitorId(visitorId);
    };

    setFp();
  }, []);

  const handleToggleLogInSignUpClicked = () => {
    setToggleLogInSignUp(!toggleLogInSignUp);
    setUsername('');
    setEmail('');
    setPassword('');
    setSecondPassword('');
  };

  return (
    <VStack m={6}>
      <>
        {isLoggedIn ? (
          <LoginSuccessful />
        ) : (
          <>
            {!accountCreated ? (
              <>
                {!toggleLogInSignUp ? (
                  <>
                    <SignUpForm
                      visitorId={visitorId}
                      setAccountCreated={setAccountCreated}
                      username={username}
                      setUsername={setUsername}
                      email={email}
                      setEmail={setEmail}
                      password={password}
                      setPassword={setPassword}
                      secondPassword={secondPassword}
                      setSecondPassword={setSecondPassword}
                      usernameSubmitted={usernameSubmitted}
                      setUsernameSubmitted={setUsernameSubmitted}
                      emailSubmitted={emailSubmitted}
                      setEmailSubmitted={setEmailSubmitted}
                      passwordSubmitted={passwordSubmitted}
                      setPasswordSubmitted={setPasswordSubmitted}
                      secondPasswordSubmitted={secondPasswordSubmitted}
                      setSecondPasswordSubmitted={setSecondPasswordSubmitted}
                    />
                    <Box>
                      <VStack>
                        <Heading as='h5' size='md' m={8}>or</Heading>
                        <Button onClick={handleToggleLogInSignUpClicked}>Login</Button>
                      </VStack>
                    </Box>
                  </>
                ) : (
                  <>
                    <Login
                      visitorId={visitorId}
                      username={username}
                      setUsername={setUsername}
                      password={password}
                      setPassword={setPassword}
                      usernameSubmitted={usernameSubmitted}
                      passwordSubmitted={passwordSubmitted}
                      setPasswordSubmitted={setPasswordSubmitted}
                      setUsernameSubmitted={setUsernameSubmitted}
                      isOpen={isOpen}
                      onOpen={onOpen}
                      onClose={onClose}
                      setIsLoggedIn={setIsLoggedIn}
                    />
                    <Box>
                      <VStack>
                        <Heading as='h5' size='md' m={8}>or</Heading>
                        <Button onClick={handleToggleLogInSignUpClicked}>Create Account</Button>
                      </VStack>
                    </Box>
                  </>
                )}
              </>
            ) : (
              <Login
                visitorId={visitorId}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                usernameSubmitted={usernameSubmitted}
                passwordSubmitted={passwordSubmitted}
                setPasswordSubmitted={setPasswordSubmitted}
                setUsernameSubmitted={setUsernameSubmitted}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          </>
        )}
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
      </>
    </VStack>
  );
}

export default App;
