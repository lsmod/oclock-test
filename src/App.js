import React from "react";
import "./App.css";
import CurrencyConverter from "./components/CurrencyConverter";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Convertiseur de devises</h1>
        <CurrencyConverter />
      </header>
    </div>
  );
}

export default App;
