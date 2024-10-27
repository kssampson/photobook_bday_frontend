import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Text, Box, Heading, UnorderedList, ListItem, OrderedList, VStack, HStack } from "@chakra-ui/react";


const InstructionsModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Helpful Tips</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6} align="left">
              <Text fontSize="md">
                Please save your content before leaving or refreshing the page.
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
                    <ListItem>Click the grey box and choose file</ListItem>
                  </UnorderedList>
                  <HStack>
                    <HStack w={"full"} justifyContent={"space-between"}>
                      <ListItem>Letter:</ListItem>
                    </HStack>
                  </HStack>
                  <UnorderedList pl={5}>
                    <ListItem>Please share a heartfelt about Danielle's presence in your life</ListItem>
                  <ListItem>Save your letter if you want to come back to it later</ListItem>
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
