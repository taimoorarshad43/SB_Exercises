import React, { useState } from "react";
import { v4 as uuid } from 'uuid';

function NewBoxForm({ createBox }) {
  const [formData, setFormData] = useState({
    height: "",
    width: "",
    backgroundColor: ""
  });

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };

  const gatherInput = evt => {
    evt.preventDefault();
    createBox({ ...formData, id: uuid() });
    setFormData({ height: "", width: "", backgroundColor: "" });
  };

  return (
    <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h3>Add a New Box</h3>
      <form onSubmit={gatherInput}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="height">Height: </label>
          <input
            onChange={handleChange}
            type="text"
            name="height"
            value={formData.height}
            id="height"
            placeholder="e.g., 5"
            style={{ marginLeft: '5px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="width">Width: </label>
          <input
            onChange={handleChange}
            type="text"
            name="width"
            id="width"
            value={formData.width}
            placeholder="e.g., 5"
            style={{ marginLeft: '5px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="backgroundColor">Background Color: </label>
          <input
            onChange={handleChange}
            type="text"
            name="backgroundColor"
            value={formData.backgroundColor}
            id="backgroundColor"
            placeholder="e.g., red"
            style={{ marginLeft: '5px', padding: '5px' }}
          />
        </div>
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
          Add a new box!
        </button>
      </form>
    </div>
  );
}

export default NewBoxForm;
