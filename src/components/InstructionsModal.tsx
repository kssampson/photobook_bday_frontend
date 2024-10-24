import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Text, Box, Heading, UnorderedList, ListItem, OrderedList, VStack, HStack } from "@chakra-ui/react";


const InstructionsModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Important:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6} align="left">
              <Text fontSize="md">
                Make to sure save your content before leaving or refreshing the page.
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
                    <ListItem>The photos you save will be the photos used</ListItem>
                  </UnorderedList>
                  <HStack>
                    <HStack w={"full"} justifyContent={"space-between"}>
                      <ListItem>Letter:</ListItem>
                    </HStack>
                  </HStack>
                  <UnorderedList pl={5}>
                  <ListItem>Make sure to save your letter so you can come back to it later if needed</ListItem>
                    <ListItem>Make sure to sign your name!</ListItem>
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
