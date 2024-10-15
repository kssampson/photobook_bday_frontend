import { CloseIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";

type Props = {
  photos: { url1: string; url2: string | null };
  deletePhoto: (photo: string) => void
};

const SavedPhotos = ({ photos, deletePhoto }: Props) => {
  console.log('photos: ', photos);

  return (
    <Box
      textAlign="center"
      margin="auto"
      w="100%"
      justifyContent="start"
      cursor="pointer"
    >
      <Box mt="16px" display="flex" justifyContent="left" flexWrap="wrap" cursor={"default"}>
        {photos.url1 && (
          <Box position="relative" m="4px">
          <Box
            as="img"
            src={photos.url1}
            width="80px"
            height="80px"
            objectFit="cover"
            borderRadius="md"
            cursor="default"
            alt="Saved Photo 1"
          />
          <IconButton
              aria-label="Remove file"
              icon={<CloseIcon />}
              position="absolute"
              bottom="1"
              right="1"
              size="xs"
              colorScheme="red"
              // onClick={() => removeFile(file)}
            />
          </Box>
        )}
        {photos.url2 && (
          <Box position="relative" m="4px">
          <Box
            as="img"
            src={photos.url2}
            width="80px"
            height="80px"
            objectFit="cover"
            borderRadius="md"
            cursor="default"
            alt="Saved Photo 2"
          />
          <IconButton
              aria-label="Remove file"
              icon={<CloseIcon />}
              position="absolute"
              bottom="1"
              right="1"
              size="xs"
              colorScheme="red"
              // onClick={() => removeFile(file)}
            />
          </Box>
        )}


      </Box>
    </Box>
  );
};

export default SavedPhotos;
