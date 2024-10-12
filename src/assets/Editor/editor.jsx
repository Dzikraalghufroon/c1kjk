import React, { useRef, useState, useEffect } from 'react';
import Styles from './editor.module.css';

const TextEditor = () => {
  const editorRef = useRef(null);
  const [fontColor, setFontColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [activeCommands, setActiveCommands] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  const handleCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    updateActiveCommands();
  };

  const updateActiveCommands = () => {
    setActiveCommands({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleCommand('insertImage', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // Add listener to update active commands when the selection changes
    editorRef.current.addEventListener('keyup', updateActiveCommands);
    editorRef.current.addEventListener('mouseup', updateActiveCommands);

    return () => {
      // Cleanup listeners on unmount
      editorRef.current.removeEventListener('keyup', updateActiveCommands);
      editorRef.current.removeEventListener('mouseup', updateActiveCommands);
    };
  }, []);

  return (
    <div className={Styles.editorContainer}>
      {/* Toolbar */}
      <div className={Styles.toolbar}>
        <button
          onClick={() => handleCommand('bold')}
          className={activeCommands.bold ? Styles.activeButton : ''}
        >
          Bold
        </button>
        <button
          onClick={() => handleCommand('italic')}
          className={activeCommands.italic ? Styles.activeButton : ''}
        >
          Italic
        </button>
        <button
          onClick={() => handleCommand('underline')}
          className={activeCommands.underline ? Styles.activeButton : ''}
        >
          Underline
        </button>

        {/* Heading Buttons */}
        <button onClick={() => handleCommand('formatBlock', 'H1')}>H1</button>
        <button onClick={() => handleCommand('formatBlock', 'H2')}>H2</button>
        <button onClick={() => handleCommand('formatBlock', 'H3')}>H3</button>

        {/* Alignment Buttons */}
        <button onClick={() => handleCommand('justifyLeft')}>Left</button>
        <button onClick={() => handleCommand('justifyCenter')}>Center</button>
        <button onClick={() => handleCommand('justifyRight')}>Right</button>

        {/* Undo and Redo */}
        <button onClick={() => handleCommand('undo')}>Undo</button>
        <button onClick={() => handleCommand('redo')}>Redo</button>

        {/* Font Color */}
        <input
          type="color"
          value={fontColor}
          onChange={(e) => {
            setFontColor(e.target.value);
            handleCommand('foreColor', e.target.value);
          }}
        />
        <label>Font Color</label>

        {/* Background Color */}
        <input
          type="color"
          value={bgColor}
          onChange={(e) => {
            setBgColor(e.target.value);
            handleCommand('backColor', e.target.value);
          }}
        />
        <label>Background Color</label>

        {/* Image Upload */}
        <input type="file" onChange={handleFileUpload} />
        <label>Insert Image</label>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable={true}
        className={Styles.editor}
        style={{ color: fontColor, backgroundColor: bgColor }}
      >
        Start editing here...
      </div>
    </div>
  );
};

export default TextEditor;
