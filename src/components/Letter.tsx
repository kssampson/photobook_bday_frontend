import { useRef, useState } from 'react';
import Editor from './Editor';
import Quill from 'quill';
import { Box, Button, FormControl, Checkbox } from '@chakra-ui/react';
const Delta = Quill.import('delta');

const Letter = () => {
  const [range, setRange] = useState<any>();
  const [lastChange, setLastChange] = useState<any>();
  const [readOnly, setReadOnly] = useState(false);
  const [letterContent, setLetterContent] = useState<string>('');
  const [deltaContent, setDeltaContent] = useState<any>(null);
  const [error, setError] = useState<string>(''); // Store validation error message
  const quillRef = useRef<Quill | null>(null);

  const handleEditorChange = (delta: any, oldDelta: any, source: string) => {
    if (quillRef.current) {
      const plainText = quillRef.current.getText();
      setLetterContent(plainText);
      setDeltaContent(delta);
    }
  };

  const handleSave = () => {
    if (!letterContent.trim()) {
      setError('Letter content is required');
      return;
    }
    setError('');

    console.log('letterContent: ', letterContent);
    console.log('deltaContent: ', deltaContent);
  }

  return (
    <Box>
      <div id="toolbar">
        <Button className="ql-bold">Bold</Button>
        <Button className="ql-italic">Italic</Button>
        <Button className="ql-underline">Underline</Button>
        <Button className="ql-header" value="1">H1</Button>
        <Button className="ql-header" value="2">H2</Button>
        <Button className="ql-list" value="ordered">Ordered List</Button>
        <Button className="ql-list" value="bullet">Bullet List</Button>
      </div>

      <FormControl>
        <Editor
          ref={quillRef}
          readOnly={readOnly}
          defaultValue={new Delta()
            .insert('Hello')
            .insert('\n', { header: 1 })
            .insert('Some ')
            .insert('initial', { bold: true })
            .insert(' ')
            .insert('content', { underline: true })
            .insert('\n')}
          onSelectionChange={setRange}
          onTextChange={handleEditorChange}
        />
      </FormControl>

      {/* Controls */}
      <Box className="controls" mt={4}>
        <Checkbox
          isChecked={readOnly}
          onChange={(e) => setReadOnly(e.target.checked)}
        >
          Read Only
        </Checkbox>
        <Button
          ml={4}
          onClick={() => {
            alert(quillRef.current?.getLength());
          }}
        >
          Get Content Length
        </Button>
        <Button
          ml={4}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>

      {/* Display editor state */}
      <Box className="state" mt={4}>
        <Box className="state-title">Current Range:</Box>
        {range ? JSON.stringify(range) : 'Empty'}
      </Box>
      <Box className="state" mt={2}>
        <Box className="state-title">Last Change:</Box>
        {lastChange ? JSON.stringify(lastChange.ops) : 'Empty'}
      </Box>
    </Box>
  );
};

export default Letter;
