import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NewTodoForm from "./NewTodoForm";

it("renders without crashing", function() {
  render(<NewTodoForm />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<NewTodoForm />);
  expect(asFragment()).toMatchSnapshot();
});

it("updates task input when typing", function() {
  const { getByLabelText } = render(<NewTodoForm />);
  const taskInput = getByLabelText("Task:");
  
  fireEvent.change(taskInput, { target: { value: "Test task" } });
  expect(taskInput.value).toBe("Test task");
});

it("calls createTodo with task data on submit", function() {
  const createTodoMock = jest.fn();
  const { getByLabelText, getByText } = render(<NewTodoForm createTodo={createTodoMock} />);
  
  const taskInput = getByLabelText("Task:");
  const submitButton = getByText("Add a todo!");
  
  fireEvent.change(taskInput, { target: { value: "Test task" } });
  fireEvent.click(submitButton);
  
  expect(createTodoMock).toHaveBeenCalledWith({
    task: "Test task",
    id: expect.any(String)
  });
});

it("clears form after submission", function() {
  const createTodoMock = jest.fn();
  const { getByLabelText, getByText } = render(<NewTodoForm createTodo={createTodoMock} />);
  
  const taskInput = getByLabelText("Task:");
  const submitButton = getByText("Add a todo!");
  
  fireEvent.change(taskInput, { target: { value: "Test task" } });
  fireEvent.click(submitButton);
  
  expect(taskInput.value).toBe("");
});
