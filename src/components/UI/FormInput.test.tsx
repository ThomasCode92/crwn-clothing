import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FormInput from "./FormInput";

test("should render with the correct label", () => {
  render(<FormInput label="Username" />);
  const labelElement = screen.getByLabelText("Username");
  expect(labelElement).toBeInTheDocument();
});

test("should apply shrink classes when input has value", () => {
  render(<FormInput label="Username" value="test" onChange={vi.fn()} />);
  const labelElement = screen.getByText("Username");
  expect(labelElement).toHaveClass("-top-5 text-xs text-black");
});

test("should apply default classes when input is empty", () => {
  render(<FormInput label="Username" />);
  const labelElement = screen.getByText("Username");
  expect(labelElement).toHaveClass("top-3 text-gray-600");
});

test("should apply password classes when input type is password", () => {
  render(<FormInput label="Password" type="password" />);
  const inputElement = screen.getByLabelText("Password");
  expect(inputElement).toHaveClass("tracking-wider");
});

test("should focus input when label is clicked", async () => {
  render(<FormInput label="Username" />);
  const labelElement = screen.getByText("Username");
  const inputElement = screen.getByLabelText("Username");
  await userEvent.click(labelElement);
  expect(inputElement).toHaveFocus();
});

test("should pass other props to the input element", () => {
  render(<FormInput label="Username" disabled />);
  const inputElement = screen.getByLabelText("Username");
  expect(inputElement).toBeDisabled();
});
