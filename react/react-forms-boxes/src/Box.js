import React from "react";

function Box({
  id,
  handleRemove,
  width = 5,
  height = 5,
  backgroundColor = "blue"
}) {
  const remove = () => handleRemove(id);
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
      <div
        style={{
          height: `${height}em`,
          width: `${width}em`,
          backgroundColor,
          border: '1px solid #ccc',
          marginRight: '5px'
        }}
      />
      <button onClick={remove} style={{ padding: '2px 6px' }}>X</button>
    </div>
  );
}

export default Box;
