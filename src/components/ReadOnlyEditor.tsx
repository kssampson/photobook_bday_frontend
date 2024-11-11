import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import Delta from 'quill-delta';

type Props = {
  letterContent: any;
};

const ReadOnlyEditor = ({ letterContent }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let parsedDelta: Delta = new Delta();;
    try {
      const jsonContent = JSON.parse(letterContent);
      parsedDelta = new Delta(jsonContent.ops)
    } catch (error) {
      console.error('Failed to parse letter Delta: ', error)
    }
    const quill = new Quill(container, {
      theme: 'snow',
      readOnly: true,
      modules: {
        toolbar: false,
      },
    });

    quill.setContents(parsedDelta);

    return () => {
      container.innerHTML = '';
    };
  }, [letterContent]);

  return <div ref={containerRef} />;
};

export default ReadOnlyEditor;


const it = {
  ops:[{insert: "Here is a letter from bigfinger!\\n" }]
}