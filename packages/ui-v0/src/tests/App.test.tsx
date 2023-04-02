import React from "react";
import { render, screen } from "@testing-library/react";
import App from "App";
import { Contract } from "containers";

test("renders learn react link", () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Create an Organization/i);
  expect(welcomeElement).toBeInTheDocument();
});

test("renders learn react link", () => {
  render(<Contract />);
  // const organizationName = screen.getByText(/Organization name/i);
  // expect(organizationName).toBeInTheDocument();
  // const organizationAddress = screen.getByText(/Organization Address/i);
  // expect(organizationAddress).toBeInTheDocument();
  // const organizationBalance = screen.getByText(/Organization Balance/i);
  // expect(organizationBalance).toBeInTheDocument();
});
