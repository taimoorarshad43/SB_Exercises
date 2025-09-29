import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NewBoxForm from "./NewBoxForm";

it("renders without crashing", function() {
  render(<NewBoxForm />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<NewBoxForm />);
  expect(asFragment()).toMatchSnapshot();
});

it("updates form data when inputs change", function() {
  const { getByLabelText } = render(<NewBoxForm />);
  
  const heightInput = getByLabelText("Height:");
  const widthInput = getByLabelText("Width:");
  const colorInput = getByLabelText("Background Color:");
  
  fireEvent.change(heightInput, { target: { value: "10" } });
  fireEvent.change(widthInput, { target: { value: "15" } });
  fireEvent.change(colorInput, { target: { value: "green" } });
  
  expect(heightInput.value).toBe("10");
  expect(widthInput.value).toBe("15");
  expect(colorInput.value).toBe("green");
});

it("calls createBox with form data on submit", function() {
  const createBoxMock = jest.fn();
  const { getByLabelText, getByText } = render(<NewBoxForm createBox={createBoxMock} />);
  
  const heightInput = getByLabelText("Height:");
  const widthInput = getByLabelText("Width:");
  const colorInput = getByLabelText("Background Color:");
  const submitButton = getByText("Add a new box!");
  
  fireEvent.change(heightInput, { target: { value: "10" } });
  fireEvent.change(widthInput, { target: { value: "15" } });
  fireEvent.change(colorInput, { target: { value: "green" } });
  fireEvent.click(submitButton);
  
  expect(createBoxMock).toHaveBeenCalledWith({
    height: "10",
    width: "15",
    backgroundColor: "green",
    id: expect.any(String)
  });
});

it("clears form after submission", function() {
  const createBoxMock = jest.fn();
  const { getByLabelText, getByText } = render(<NewBoxForm createBox={createBoxMock} />);
  
  const heightInput = getByLabelText("Height:");
  const widthInput = getByLabelText("Width:");
  const colorInput = getByLabelText("Background Color:");
  const submitButton = getByText("Add a new box!");
  
  fireEvent.change(heightInput, { target: { value: "10" } });
  fireEvent.change(widthInput, { target: { value: "15" } });
  fireEvent.change(colorInput, { target: { value: "green" } });
  fireEvent.click(submitButton);
  
  expect(heightInput.value).toBe("");
  expect(widthInput.value).toBe("");
  expect(colorInput.value).toBe("");
});
