// Letter.tsx

import { useRef, useState } from 'react';
import Editor from './Editor';
import Quill from 'quill';
import { Box, Button, Checkbox, FormControl, FormHelperText, Text } from '@chakra-ui/react';

const Delta = Quill.import('delta');

type Props = {
  setLetterContent: React.Dispatch<React.SetStateAction<string>>;
  setDeltaContent: React.Dispatch<any>;
  readOnly: boolean;
  error: string;
  quillRef: React.MutableRefObject<Quill | null>
}

const Letter = ( { quillRef, setLetterContent, setDeltaContent, readOnly, error }: Props ) => {

  const handleEditorChange = (delta: any, oldDelta: any, source: string) => {
    if (quillRef.current) {
      const plainText = quillRef.current.getText();
      const deltaContent = quillRef.current?.getContents();
      setLetterContent(plainText);
      setDeltaContent(deltaContent);
    }
  };

  return (
    <Box height="50vh" display="flex" flexDirection="column">
      {/* Toolbar */}
      <Box id="toolbar" mb={4} style={{ display: readOnly ? 'none' : 'flex' }} >
        <Button className="ql-bold">Bold</Button>
        <Button className="ql-italic">Italic</Button>
        <Button className="ql-underline">Underline</Button>
        <Button className="ql-header" value="2">H2</Button>
        <Button className="ql-list" value="ordered">Ordered List</Button>
        <Button className="ql-list" value="bullet">Bullet List</Button>
      </Box>

      {/* Editor */}
      <FormControl flex="1" overflow="hidden">
        <Box
          borderRadius="8px"
          height="100%"
          overflow="hidden"
        >
          <Box
            height="100%"
            overflowY="auto"
          >
            <Editor
              ref={quillRef}
              readOnly={readOnly}
              defaultValue={new Delta()}
              onSelectionChange={() => {}}
              onTextChange={handleEditorChange}
            />
          </Box>
        </Box>
      </FormControl>
    </Box>
  );
};

export default Letter;
