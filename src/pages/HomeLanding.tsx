import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, HStack, Heading, ListItem, OrderedList, Stack, Text, UnorderedList, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


const HomeLanding = () => {
  const navigate = useNavigate();
  return (
    <Box
        display="flex"
        justifyContent="center"
        alignItems={"center"}
        height={"100vh"}
        padding={{base: 4, md: 8}}
        className="booger-inner"
      >
      <Card maxW="xl">
        <CardBody>
        <VStack spacing={6} align="left">
        <Heading size="md">Welcome to Danielle's 40th Birthday Surprise!</Heading>
        <Text fontSize="md">
            Thank you for creating an account! Below are details about this special gift to Danielle!
          </Text>
          <Box>
            <OrderedList spacing={3}>
              <HStack>
                <HStack w={"full"} justifyContent={"space-between"}>
                  <ListItem>What We're Making:</ListItem>
                </HStack>
              </HStack>
              <UnorderedList pl={5}>
                <ListItem>A physical and digital memory book, made up of your contributions!</ListItem>
              </UnorderedList>
              <HStack>
                <HStack w={"full"} justifyContent={"space-between"}>
                  <ListItem>Timeline:</ListItem>
                </HStack>
              </HStack>
              <UnorderedList pl={5}>
                <ListItem>Users have until Nov 10th (day before Danielle's b-day) to submit contributions</ListItem>
                <ListItem>On Nov 11th the digital version will be viewable by Danielle and all who contributed via this site!</ListItem>
                <ListItem>The physical book is set to be ordered during her birthday week to allow for as many contributions as possible</ListItem>
              </UnorderedList>

            </OrderedList>
          </Box>
        </VStack>
        </CardBody>
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue" onClick={() => navigate("/home/submit")}>
              Go to Letter/Photo
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      </Box>
  )
}

export default HomeLanding;