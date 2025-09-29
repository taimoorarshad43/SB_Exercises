import React, { useState } from "react";

function Todo({ task = "default todo", id = "1", remove, update }) {
  const [editTask, setEditTask] = useState(task);
  const [isEditing, setIsEditing] = useState(false);

  // Update editTask when task prop changes
  React.useEffect(() => {
    setEditTask(task);
  }, [task]);

  const toggleEdit = () => {
    setIsEditing(edit => !edit);
  };

  const handleChange = evt => {
    setEditTask(evt.target.value);
  };

  const handleDelete = () => remove(id);

  const handleUpdate = evt => {
    evt.preventDefault();
    update(id, editTask);
    setIsEditing(false);
  };

  // default todo view
  let jsx = (
    <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <li style={{ flex: 1, margin: 0, listStyle: 'none' }}>{task}</li>
      <button onClick={toggleEdit} style={{ margin: '0 5px', padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Edit</button>
      <button onClick={handleDelete} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>X</button>
    </div>
  );

  // todo view when editing
  if (isEditing) {
    jsx = (
      <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <form onSubmit={handleUpdate} style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
          <input 
            type="text" 
            value={editTask} 
            onChange={handleChange} 
            style={{ flex: 1, padding: '5px', marginRight: '10px' }}
          />
          <button type="submit" style={{ padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Update!</button>
        </form>
      </div>
    );
  }

  return jsx;
}

export default Todo;
