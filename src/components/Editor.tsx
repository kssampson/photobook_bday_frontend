import Quill from 'quill';
import Delta from 'quill-delta';
import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';

type Props = {
  readOnly: boolean;
  defaultValue: Delta;
  onTextChange: (delta: Delta, oldDelta: Delta, source: string) => void;
  onSelectionChange: (range: any, oldRange: any) => void;
};

// Editor is an uncontrolled React component
const Editor = forwardRef<Quill | null, Props>(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null); // Make sure containerRef refers to a div element
    const defaultValueRef = useRef<Delta>(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    }, [onTextChange, onSelectionChange]);

    useEffect(() => {
      // Handle the case where `ref` is a function or a mutable object
      if (ref && typeof ref !== 'function') {
        ref.current?.enable(!readOnly);
      }
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;

      if (!container) return;

      // Create an editor container within the current div
      const editorContainer = document.createElement('div');
      container.appendChild(editorContainer);

      // Initialize Quill
      const quill = new Quill(editorContainer, {
        theme: 'snow',
        placeholder: 'Dear Danielle...',
        modules: {
          toolbar: '#toolbar',
        },
      });

      // Handle the `ref` being a function or an object
      if (ref) {
        if (typeof ref === 'function') {
          ref(quill); // Pass the quill instance to the function ref
        } else {
          ref.current = quill; // Assign the quill instance to the mutable object ref
        }
      }

      // Set the default content of the editor
      quill.setContents(defaultValueRef.current);

      // Add event listeners for text and selection changes
      quill.on(Quill.events.TEXT_CHANGE, (delta, oldDelta, source) => {
        onTextChangeRef.current(delta, oldDelta, source);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (range, oldRange) => {
        onSelectionChangeRef.current(range, oldRange);
      });

      return () => {
        if (ref && typeof ref !== 'function') {
          ref.current = null;
        }
        container.innerHTML = '';
      };
    }, [ref]);

    return <div ref={containerRef}/>;
  },
);

Editor.displayName = 'Editor';
export default Editor;
