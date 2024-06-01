import React, { useState } from 'react';
import '../styles/dropArea.css';

function DropArea({ index, status, onDrop }) {
  const [drop, setDrop] = useState(false);

  const handleDrop = (e) => {
    setDrop(false);
    onDrop(e);
  };

  return (
    <div
      className={drop ? 'drop_area' : 'hideDrop'}
      data-index={index}
      data-status={status}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setDrop(true)}
      onDragLeave={() => setDrop(false)}
      onDrop={handleDrop}
    >
      Drop Here
    </div>
  );
}

export default DropArea;
