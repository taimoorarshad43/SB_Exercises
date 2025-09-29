import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Box from "./Box";

it("renders without crashing", function() {
  render(<Box />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<Box />);
  expect(asFragment()).toMatchSnapshot();
});

it("renders with custom props", function() {
  const { asFragment } = render(
    <Box 
      width={10} 
      height={15} 
      backgroundColor="red" 
      id="test-id" 
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("calls handleRemove when X button is clicked", function() {
  const removeMock = jest.fn();
  const { getByText } = render(
    <Box 
      id="test-id" 
      handleRemove={removeMock} 
    />
  );
  const removeButton = getByText("X");
  fireEvent.click(removeButton);
  expect(removeMock).toHaveBeenCalledWith("test-id");
});
