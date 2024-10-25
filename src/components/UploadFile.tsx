import { Box, Text, IconButton, useToast } from "@chakra-ui/react";
import React from "react";
import { useDropzone, DropEvent, FileRejection } from "react-dropzone";
import { CloseIcon } from "@chakra-ui/icons";
import pica from "pica";
import heic2any from "heic2any";

type Props = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const UploadFile = ({ files, setFiles }: Props) => {
  const toast = useToast();

  const validateImageDimensions = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const isValid = img.width >= 1500 && img.height >= 1500;
        resolve(isValid);
      };
      img.onerror = () => {
        resolve(false);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const resizeImage = async (file: File): Promise<File | null> => {
    const img = new Image();
    return new Promise((resolve, reject) => {
      img.onload = async () => {
        const targetSize = 3000;
        let width = img.width;
        let height = img.height;

        // make new dimensions but maintain aspect ratio
        if (width > height) {
          height = Math.round((height / width) * targetSize);
          width = targetSize;
        } else {
          width = Math.round((width / height) * targetSize);
          height = targetSize;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const offScreenCanvas = document.createElement("canvas");
        offScreenCanvas.width = img.width;
        offScreenCanvas.height = img.height;

        const ctx = offScreenCanvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);

        try {
          const resizedCanvas = await pica().resize(offScreenCanvas, canvas);
          const resizedBlob = await pica().toBlob(resizedCanvas, "image/jpeg");
          const resizedFile = new File(
            [resizedBlob],
            file.name.replace(/\.(heic|heif|jpg|jpeg|png)$/, ".jpg"),
            { type: "image/jpeg" }
          );
          resolve(resizedFile);
        } catch (error) {
          reject(null);
        }
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleUpload = async (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
    const validFiles: File[] = [];

    for (const file of acceptedFiles) {
      let processedFile = file;

      if (file.type === "image/heic" || file.type === "image/heif") {
        try {
          const converted = await heic2any({ blob: file, toType: "image/jpeg" });
          processedFile = new File([converted as Blob], file.name.replace(/\.(heic|heif)$/, ".jpg"), { type: "image/jpeg" });
        } catch (error) {
          toast({
            title: "HEIC/HEIF conversion failed.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          continue;
        }
      }

      const isValidDimensions = await validateImageDimensions(processedFile);
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!isValidDimensions) {
        toast({
          title: "Invalid Image Dimensions",
          description: "Images must be at least 3000x3000 pixels for print quality.",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        continue;
      }

      if (processedFile.size > maxSize) {
        toast({
          title: "File Size Too Large",
          description: "File must be smaller than 5MB.",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        continue;
      }

      try {
        const resizedFile = await resizeImage(processedFile);
        if (resizedFile) {
          validFiles.push(resizedFile);
        }
      } catch (error) {
        toast({
          title: "Image resizing failed.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    }

    setFiles(() => {
      return validFiles.length > 0 ? [validFiles[0]] : [];
    });
  };

  const removeFile = (fileToRemove: File) => {
    setFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
  };

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/heic': ['.heic'],
      'image/heif': ['.heif'],
    },
    maxFiles: 1,
    onDrop: handleUpload,
  });

  const borderColor = isDragAccept ? "#107c10" : isDragReject ? "#d83b01" : "#eeeeee";

  return (
    <Box textAlign="center" margin="auto" w="100%" justifyContent="start" cursor="pointer">
      {files.length < 1 && (
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
          <input {...getInputProps()} />
          <Text color="grey">Drag 'n' drop a photo, or click to select a file</Text>
          <Text color="grey">(Max 1 photo, .jpg, .png, .heic, or .heif only)</Text>
        </Box>
      )}
      {files.length > 0 && (
        <Box mt="16px" display="flex" justifyContent="left" flexWrap="wrap" cursor={"default"}>
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
      )}
    </Box>
  );
};

export default UploadFile;
