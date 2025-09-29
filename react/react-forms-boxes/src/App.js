import React from "react";
import BoxList from "./BoxList";
import TodoList from "./TodoList";

function App() {
  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <h1>Color Box Maker</h1>
        <BoxList />
      </div>
      <hr style={{ margin: '40px 0' }} />
      <div>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
