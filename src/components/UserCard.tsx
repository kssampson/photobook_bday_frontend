import { Box, Card, CardBody, VStack, Image, Stack, Heading, Divider, Button } from "@chakra-ui/react";
import { useState } from "react";
import ReadOnlyEditor from "./ReadOnlyEditor";
import Delta from 'quill-delta';

interface UserCardProps {
  username: string;
  photoUrl: string | null;
  letterContent: any;
}

const UserCard = ({ username, photoUrl, letterContent }: UserCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <Card maxW="xl">
      <CardBody>
        {photoUrl && (
          <Image
            src={photoUrl}
            alt={`${username}'s photo`}
            borderRadius="lg"
          />
        )}
        <Stack mt="6" spacing="3">
          <Heading size="md">From {username}</Heading>

          <Box maxH={isExpanded ? "auto" : "100px"} overflow="hidden">
            <ReadOnlyEditor letterContent={letterContent} />
          </Box>

          <Button onClick={toggleExpanded} size="sm" variant="link" colorScheme="blue" mt={2}>
            {isExpanded ? "Read less" : "Read more"}
          </Button>
        </Stack>
      </CardBody>
      <Divider />
    </Card>
  );
};

export default UserCard;
