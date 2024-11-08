import { Card, CardBody, Heading, Stack, Text, Image, Divider, ButtonGroup, CardFooter, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MoreInfoModal from "./MoreInfoModal";

type Props = {
  danielleImage: string;
  setDanielleImage: React.Dispatch<React.SetStateAction<string>>;
}

const LandingInfoCard = ({ danielleImage, setDanielleImage }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const dImage = "https://static.wixstatic.com/media/91342f_24f8d2cf3b4f42a0a0aeb0a4b6bbbece~mv2.jpg/v1/fit/w_2500,h_1330,al_c/91342f_24f8d2cf3b4f42a0a0aeb0a4b6bbbece~mv2.jpg";
    setDanielleImage(dImage);
  }, [setDanielleImage]);

  return (
    <Card maxW="xl">
      <CardBody>
        <Image
          src={danielleImage}
          alt="A cozy, green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">Danielle's Birthday</Heading>
          <Text>
            Join us in celebrating her milestone birthday in a meaningful way this year! We’re creating a special gift—a beautiful memory book filled with letters and photos from friends and family.
          </Text>
          <Text>
            This site is open to collect your heartfelt contributions throughout the year, so submit anytime! Join us in making this milestone truly memorable!
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue" onClick={() => navigate("/landing/signup")}>
            Let's do it!
          </Button>
          <MoreInfoModal />
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default LandingInfoCard;
