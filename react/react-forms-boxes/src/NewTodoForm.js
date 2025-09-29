import React, { useState } from "react";
import { v4 as uuid } from 'uuid';

function NewTodoForm({ createTodo }) {
  const [task, setTask] = useState("");

  const handleChange = evt => {
    setTask(evt.target.value);
  };

  const gatherInput = evt => {
    evt.preventDefault();
    createTodo({ task, id: uuid() });
    setTask("");
  };

  return (
    <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h3>Add a New Todo</h3>
      <form onSubmit={gatherInput}>
        <label htmlFor="task">Task: </label>
        <input
          id="task"
          name="task"
          type="text"
          onChange={handleChange}
          value={task}
          placeholder="Enter a new task..."
          style={{ marginLeft: '5px', padding: '8px', width: '300px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
          Add a todo!
        </button>
      </form>
    </div>
  );
}

export default NewTodoForm;
