import React, { useState } from "react";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";

function BoxList() {
  const [boxes, setBoxes] = useState([]);
  
  const add = boxObj => {
    setBoxes(boxes => [...boxes, boxObj]);
  };
  
  const remove = id => {
    setBoxes(boxes => boxes.filter(box => box.id !== id));
  };

  const boxComponents = boxes.map(box => (
    <Box
      key={box.id}
      id={box.id}
      width={box.width}
      height={box.height}
      handleRemove={remove}
      backgroundColor={box.backgroundColor}
    />
  ));

  return (
    <div>
      <NewBoxForm createBox={add} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
        {boxComponents}
      </div>
    </div>
  );
}

export default BoxList;
