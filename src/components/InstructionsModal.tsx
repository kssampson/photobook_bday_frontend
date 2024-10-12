import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Text, Box, Heading, UnorderedList, ListItem, OrderedList, VStack, HStack } from "@chakra-ui/react";


const InstructionsModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thanks for getting this far!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6} align="left">
              <Text fontSize="md">
                It's best to be able to write it all in one go, but if you need to come back, maybe copy and paste into the letter field when you're ready!
              </Text>
              <Box>
                <OrderedList spacing={3}>
                  <HStack>
                    <HStack w={"full"} justifyContent={"space-between"}>
                      <ListItem>Photos:</ListItem>
                    </HStack>
                  </HStack>
                  <UnorderedList pl={5}>
                    <ListItem>Drag n' drop into the grey box, and/or</ListItem>
                    <ListItem>Click the grey box and choose file(s)</ListItem>
                  </UnorderedList>
                  <HStack>
                    <HStack w={"full"} justifyContent={"space-between"}>
                      <ListItem>Letter:</ListItem>
                    </HStack>
                  </HStack>
                  <UnorderedList pl={5}>
                  <ListItem>Make sure to click "save" -- come back and finish writing later!</ListItem>
                    <ListItem>Whatever (kind) words you have to share!</ListItem>
                    <ListItem>Don't be too bad!</ListItem>
                  </UnorderedList>

                </OrderedList>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose} mr={3}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InstructionsModal;
