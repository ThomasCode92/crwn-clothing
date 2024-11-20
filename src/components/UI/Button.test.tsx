import { render, screen } from "@testing-library/react";

import Button from "./Button";

test("should render with default styles", () => {
  render(<Button>Default Button</Button>);
  const buttonElement = screen.getByText("Default Button");
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveClass("bg-black text-white");
});

test("should render with google-sign-in styles", () => {
  render(<Button buttonType="google-sign-in">Google Sign In</Button>);
  const buttonElement = screen.getByText("Google Sign In");
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveClass("bg-google text-white");
});

test("should render with inverted styles", () => {
  render(<Button buttonType="inverted">Inverted Button</Button>);
  const buttonElement = screen.getByText("Inverted Button");
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveClass(
    "border-2 border-black bg-white text-black",
  );
});

test("should pass other props to the button element", () => {
  render(<Button disabled>Disabled Button</Button>);
  const buttonElement = screen.getByText("Disabled Button");
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toBeDisabled();
});
