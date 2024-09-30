import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Text, Box, Heading, UnorderedList, ListItem, OrderedList, VStack, HStack } from "@chakra-ui/react";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { CgArrowLeft } from "react-icons/cg";
import { CheckIcon } from '@chakra-ui/icons';


const MoreInfoModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant="outline" colorScheme="blue" onClick={onOpen}>
        I need more info first
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Danielle's Birthday Book Surprise</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6} align="left">
              <Text fontSize="md">
                We’re creating a high-quality printed memory book for Danielle. Friends and family can upload letters and photos. As Danielle goes through the book, she’ll see the photos on the left and the heartfelt notes, letters, or messages on the right.
              </Text>
              <Text fontSize="md">
                Users who create and account to share with Danielle will be able to view the digital photobook available on this site on her birthday on November 11th!
              </Text>

              <Box>
                <Heading size="sm" mb={3}>
                  Ways to Participate:
                </Heading>
                <OrderedList spacing={3}>
                  <HStack>
                    <HStack w={"full"} justifyContent={"space-between"}>
                      <ListItem>Create a secure account:</ListItem>
                      <HStack>
                        <CheckIcon boxSize={"1em"} color={"green"}/>
                        <Text pr={"1"}>Easy</Text>
                        <CheckIcon boxSize={"1em"} color={"green"}/>
                        <Text>Preferred</Text>
                      </HStack>
                    </HStack>
                  </HStack>
                  <UnorderedList pl={5}>
                    <ListItem>Upload or take photo(s)</ListItem>
                    <ListItem>Write letter in editor or upload</ListItem>
                    <ListItem>Choice to make submission visible to others</ListItem>
                    <ListItem>See the digital photobook!</ListItem>
                  </UnorderedList>
                  <ListItem>Submit via social media groups:</ListItem>
                  <HStack fontSize={"xx-large"}>
                    <Box>
                      <FaFacebookSquare />
                    </Box>
                      <FaInstagram />
                    <Box className="arrow-icon" pt={2}>
                      <CgArrowLeft />
                    </Box>
                  </HStack>
                </OrderedList>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Let's do it!
            </Button>
            <Button variant="ghost" onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MoreInfoModal;
