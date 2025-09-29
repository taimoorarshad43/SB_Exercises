import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BoxList from "./BoxList";

it("renders without crashing", function() {
  render(<BoxList />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<BoxList />);
  expect(asFragment()).toMatchSnapshot();
});

it("adds a new box when form is submitted", function() {
  const { getByLabelText, getByText, queryByText } = render(<BoxList />);
  
  const heightInput = getByLabelText("Height:");
  const widthInput = getByLabelText("Width:");
  const colorInput = getByLabelText("Background Color:");
  const submitButton = getByText("Add a new box!");
  
  fireEvent.change(heightInput, { target: { value: "10" } });
  fireEvent.change(widthInput, { target: { value: "15" } });
  fireEvent.change(colorInput, { target: { value: "green" } });
  fireEvent.click(submitButton);
  
  // Check that a box with "X" button was added
  const removeButtons = queryByText("X");
  expect(removeButtons).toBeInTheDocument();
});

it("removes a box when X button is clicked", function() {
  const { getByLabelText, getByText, queryByText } = render(<BoxList />);
  
  // Add a box first
  const heightInput = getByLabelText("Height:");
  const widthInput = getByLabelText("Width:");
  const colorInput = getByLabelText("Background Color:");
  const submitButton = getByText("Add a new box!");
  
  fireEvent.change(heightInput, { target: { value: "10" } });
  fireEvent.change(widthInput, { target: { value: "15" } });
  fireEvent.change(colorInput, { target: { value: "green" } });
  fireEvent.click(submitButton);
  
  // Verify box was added
  let removeButtons = queryByText("X");
  expect(removeButtons).toBeInTheDocument();
  
  // Remove the box
  fireEvent.click(removeButtons);
  
  // Verify box was removed
  removeButtons = queryByText("X");
  expect(removeButtons).not.toBeInTheDocument();
});
