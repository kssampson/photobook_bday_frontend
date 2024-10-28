import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { validateInputs } from "../utils/validateInputs";
import processOtp from "../utils/ProcessOtp";
import { useNavigate } from "react-router-dom";

type Props = {
  visitorId: string | null;
  username: string;
  password: string;
  isOpen: boolean;
  onClose: () => void;
};

const OtpModal = ({ visitorId, username, password, isOpen, onClose }: Props) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string>("");
  const [otpSubmitted, setOtpSubmitted] = useState<boolean>(false);
  const isErrorOtp = !validateInputs.isValidOtp(otp) && otpSubmitted;

  const onChangeOtp = (e: any) => {
    setOtp(e.target.value);
    setOtpSubmitted(false);
  };

  const onCancel = () => {
    setOtp("");
    onClose();
    toast({
      title: "OTP Verification Canceled",
      position: "top-right",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleSubmit = async () => {
    setOtpSubmitted(true);

    if (!validateInputs.isValidOtp(otp)) return;

    try {
      const response = await processOtp(username, password, visitorId, otp);
      if (response.success) {
        toast({
          title: "OTP Verified Successfully",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setOtp("");
        onClose();
        navigate("/home")
      } else {
        toast({
          title: "OTP Verification Failed",
          position: "top-right",
          description: response.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setOtp("");
      }
    } catch (error) {
      toast({
        title: "Error",
        position: "top-right",
        description: `An error occurred while verifying OTP.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setOtp("");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Check Your Email</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={isErrorOtp} isRequired>
            <FormLabel>One-Time Password from email:</FormLabel>
            <Input type="text" value={otp} onChange={onChangeOtp} />
            {isErrorOtp && <FormErrorMessage>OTP must be 6 characters</FormErrorMessage>}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit} isDisabled={!otp || otpSubmitted}>
            Submit
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OtpModal;
