import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { validateInputs } from "../utils/validateInputs";
import processOtp from "../utils/ProcessOtp";

type Props = {
  visitorId: string | null;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const OtpModal = ( { visitorId, username, setUsername, password, setPassword, isOpen, onOpen, onClose, setIsLoggedIn }: Props ) => {

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const toast = useToast();

  const [otp, setOtp] = useState<string>("");
  const [otpSubmitted, setOtpSubmitted] = useState<boolean>(false);
  const isErrorOtp = !validateInputs.isValidOtp(otp) && otpSubmitted;

  const onChangeOtp = (e: any) => {
    setOtpSubmitted(false);
    setOtp(e.target.value);
  }

  const onCancel = () => {
    setOtp('');
    setUsername('');
    setPassword('');
    setOtpSubmitted(false);
    toast({
      title: `Error`,
      position: "top-right",
      description: `Please try again.`,
      status: 'error',
      duration: 7000,
      isClosable: true,
    });
    onClose();
  }

  const handleSubmit = async () => {
    try {
      setOtpSubmitted(true);
      const response = await processOtp(username, password, visitorId, otp);
      if (response.success) {
        toast({
          title: `Success:`,
          position: "top-right",
          description: `${response.message}`,
          status: 'success',
          duration: 7000,
          isClosable: true,
        });
        setIsLoggedIn(true);
        setOtp('');
        setOtpSubmitted(false);
        setUsername('');
        setPassword('');
        onClose();
      } else {
        toast({
          title: `Error:`,
          position: "top-right",
          description: `${response.message}`,
          status: 'error',
          duration: 7000,
          isClosable: true,
        });
        setOtp('');
        setOtpSubmitted(false);
        setUsername('');
        setPassword('');
        onClose();
      }
    } catch (error) {
      toast({
        title: `Error: ${error}`,
        position: "top-right",
        description: `Please try again.`,
        status: 'error',
        duration: 7000,
        isClosable: true,
      });
      setOtp('');
      setOtpSubmitted(false);
      setUsername('');
      setPassword('');
      onClose();
    }
  }

  return (
    <>
    <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Check Email for One Time Password</ModalHeader>
          <ModalCloseButton onClick={onCancel}/>
          <ModalBody pb={6}>
            <FormControl>
              <HStack>
              <FormControl isInvalid={isErrorOtp} isRequired>
                <FormLabel>One Time Password:</FormLabel>
                <Input type='Otp' value={otp} onChange={onChangeOtp} />
                {!isErrorOtp ? null : (
                  <FormErrorMessage>Must be 6 characters</FormErrorMessage>
                )}
              </FormControl>
              </HStack>
            </FormControl>
          </ModalBody>
        {!otpSubmitted && (
          <>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Send
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    </>
  )
};

export default OtpModal;