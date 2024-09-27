import { Card, CardBody, Heading, Stack, Text, Image, Divider, ButtonGroup, CardFooter, Button } from "@chakra-ui/react";
import { useEffect } from "react";

type Props = {
  danielleImage: string;
  setDanielleImage: React.Dispatch<React.SetStateAction<string>>;
}

const LandingInfoCard = ( { danielleImage, setDanielleImage }: Props ) => {
  useEffect(() => {
    const dImage = "https://static.wixstatic.com/media/91342f_24f8d2cf3b4f42a0a0aeb0a4b6bbbece~mv2.jpg/v1/fit/w_2500,h_1330,al_c/91342f_24f8d2cf3b4f42a0a0aeb0a4b6bbbece~mv2.jpg"
    setDanielleImage(dImage);
  })
  return (
    <Card maxW='sm'>
  <CardBody>
    <Image
      src={danielleImage}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Danielle's Birthday Surprise</Heading>
      <Text>
        Danielle is turning 40! That's super special, so we're making her a special gift...
      </Text>
      <Text>
        ...but we need friends and family to contribute some material in order to make it.
      </Text>
      <Text color='blue.600' fontSize='2xl'>
        Danielle ? Click here
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        Let's do it!
      </Button>
      <Button variant='ghost' colorScheme='blue'>
        I need more info first
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
  )
}
export default LandingInfoCard;