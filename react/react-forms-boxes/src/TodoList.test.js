import React from "react";
import { render, fireEvent, queryAllByText } from "@testing-library/react";
import TodoList from "./TodoList";

it("renders without crashing", function() {
  render(<TodoList />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<TodoList />);
  expect(asFragment()).toMatchSnapshot();
});

it("adds a new todo when form is submitted", function() {
  const { getByLabelText, getByText, queryByText } = render(<TodoList />);
  
  const taskInput = getByLabelText("Task:");
  const submitButton = getByText("Add a todo!");
  
  fireEvent.change(taskInput, { target: { value: "Test task" } });
  fireEvent.click(submitButton);
  
  // Check that a todo with "X" button was added
  const removeButtons = queryByText("X");
  expect(removeButtons).toBeInTheDocument();
  expect(getByText("Test task")).toBeInTheDocument();
});

it("removes a todo when X button is clicked", function() {
  const { getByLabelText, getByText, queryByText } = render(<TodoList />);
  
  // Add a todo first
  const taskInput = getByLabelText("Task:");
  const submitButton = getByText("Add a todo!");
  
  fireEvent.change(taskInput, { target: { value: "Test task" } });
  fireEvent.click(submitButton);
  
  // Verify todo was added
  let removeButtons = queryByText("X");
  expect(removeButtons).toBeInTheDocument();
  expect(getByText("Test task")).toBeInTheDocument();
  
  // Remove the todo
  fireEvent.click(removeButtons);
  
  // Verify todo was removed
  removeButtons = queryByText("X");
  expect(removeButtons).not.toBeInTheDocument();
  expect(queryByText("Test task")).not.toBeInTheDocument();
});

it("can add and remove todos", function() {
  const { getByLabelText, getByText, queryByText, container } = render(<TodoList />);
  
  // Add multiple todos
  const taskInput = getByLabelText("Task:");
  const submitButton = getByText("Add a todo!");
  
  fireEvent.change(taskInput, { target: { value: "First task" } });
  fireEvent.click(submitButton);
  
  fireEvent.change(taskInput, { target: { value: "Second task" } });
  fireEvent.click(submitButton);
  
  // Verify both todos were added
  expect(getByText("First task")).toBeInTheDocument();
  expect(getByText("Second task")).toBeInTheDocument();
  
  // Remove first todo
  const removeButtons = queryAllByText(container, "X");
  fireEvent.click(removeButtons[0]);
  
  // Verify first todo was removed
  expect(queryByText("First task")).not.toBeInTheDocument();
  expect(getByText("Second task")).toBeInTheDocument();
});
