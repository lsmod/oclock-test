import React from "react";
import { render, cleanup } from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

describe("Test composant <App />", () => {
  it("le titre est bien 'Convertisseur de devices'", () => {
    const { getByText, asFragment } = render(<App />);
    const linkElement = getByText("Convertiseur de devises");
    expect(linkElement).toBeInTheDocument();
  });

  it("le titre est un <h1>", () => {
    const { getByText, asFragment } = render(<App />);
    const titleH1 = document.querySelector("h1");
    expect(titleH1).toBeInTheDocument();
  });

  it("le titre est imbriqué dans un <header>", () => {
    const { getByText, asFragment } = render(<App />);
    const header = document.querySelector("header");
    const titleH1 = document.querySelector("h1");
    expect(header).toContainElement(titleH1);
  });

  it("le header a bien la classe css 'App-header'", () => {
    const { getByText, asFragment } = render(<App />);
    const header = document.querySelector("header.App-header");
    expect(header).toBeInTheDocument(header);
  });

  it("les snapshot", () => {
    const { asFragment } = render(<App />);
    // à chaque fois que les tests sont lancés une "snapshot" du dom est prise (sauvegarde du code html produit)
    // cette snapshot est sauvegardée dans un fichier .snap et comparé au prochain test pour véfifier que le html est toujours le même
    expect(asFragment()).toMatchSnapshot();
  });
});
