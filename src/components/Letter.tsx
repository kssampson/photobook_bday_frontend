// Letter.tsx

import { useRef, useState } from 'react';
import Editor from './Editor';
import Quill from 'quill';
import { Box, Button, Checkbox, FormControl } from '@chakra-ui/react';

const Delta = Quill.import('delta');

type Props = {
  letterContent: string;
  setLetterContent: React.Dispatch<React.SetStateAction<string>>;
  deltaContent: any;
  setDeltaContent: React.Dispatch<any>;
}

const Letter = ( { letterContent, setLetterContent, deltaContent, setDeltaContent }: Props ) => {
  const [readOnly, setReadOnly] = useState(false);
  const [error, setError] = useState<string>('');
  const quillRef = useRef<Quill | null>(null);

  const handleEditorChange = (delta: any, oldDelta: any, source: string) => {
    if (quillRef.current) {
      const plainText = quillRef.current.getText();
      setLetterContent(plainText);
      setDeltaContent(delta);
    }
  };

  return (
    <Box height="50vh" display="flex" flexDirection="column">
      {/* Toolbar */}
      <Box id="toolbar" mb={4}>
        <Button className="ql-bold">Bold</Button>
        <Button className="ql-italic">Italic</Button>
        <Button className="ql-underline">Underline</Button>
        <Button className="ql-header" value="1">H1</Button>
        <Button className="ql-header" value="2">H2</Button>
        <Button className="ql-list" value="ordered">Ordered List</Button>
        <Button className="ql-list" value="bullet">Bullet List</Button>
      </Box>

      {/* Editor */}
      <FormControl flex="1" overflow="hidden">
        <Box
          border="1px solid #ccc"
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

      {/* Controls */}
      {/* <Box mt={4} display="flex" alignItems="center">
        <Checkbox
          isChecked={readOnly}
          onChange={(e) => setReadOnly(e.target.checked)}
        >
          Read Only
        </Checkbox>
        <Button ml={4} onClick={() => alert(quillRef.current?.getLength())}>
          Get Content Length
        </Button>
      </Box> */}
    </Box>
  );
};

export default Letter;
