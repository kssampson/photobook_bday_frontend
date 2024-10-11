import { Box, Text, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import Dropzone, { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { CloseIcon } from "@chakra-ui/icons"; // Importing the close icon from Chakra UI

type Props = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
}

const UploadFile = ( { files, setFiles }: Props ) => {

  const handleUpload = (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
    setFiles(prevFiles => {
      const newFiles = [...prevFiles, ...acceptedFiles];
      return newFiles.slice(0, 2);
    })
  };

  const removeFile = (fileToRemove: File) => {
    setFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
  };

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxFiles: 2,
    onDrop: handleUpload,
  });

  const borderColor = isDragAccept ? "#107c10" : isDragReject ? "#d83b01" : "#eeeeee";

  return (
    <Box
      textAlign="center"
      margin="auto"
      w="100%"
      // h="2%"
      justifyContent="start"
      // shadow="outline"
      cursor="pointer"
    >
      <Box
        {...getRootProps()}
        textAlign="center"
        p="10px"
        border="3px dashed"
        borderColor={borderColor}
        bgColor="#fafafa"
        color="#bdbdbd"
        mb="20px"
      >
        <input {...getInputProps()}/>
        <Text color="grey">Drag 'n' drop photos, or click to select files</Text>
        <Text color="grey">(Max 2 photos, .jpg or .png only)</Text>
      </Box>
      {files.length > 0 && (
        <>
          <Box mt="10px" display="flex" justifyContent="center" flexWrap="wrap" cursor={"default"}>
            {files.map((file, index) => (
              <Box key={index} position="relative" m="4px">
                <Box
                  as="img"
                  src={URL.createObjectURL(file)}
                  width="80px"
                  height="80px"
                  objectFit="cover"
                  borderRadius="md"
                  cursor={"default"}
                />
                <IconButton
                  aria-label="Remove file"
                  icon={<CloseIcon />}
                  position="absolute"
                  bottom="1"
                  right="1"
                  size="xs"
                  colorScheme="red"
                  onClick={() => removeFile(file)}
                />
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default UploadFile;
