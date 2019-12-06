import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("affichage la page avec le titre", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Convertiseur de devices/i);
  expect(linkElement).toBeInTheDocument();
});
