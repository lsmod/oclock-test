import React from "react";
import "./App.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CurrencyConverter from "./components/CurrencyConverter";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Card>
          <CardContent>
            <h2>Convertiseur de devises</h2>
            <CurrencyConverter />
          </CardContent>
        </Card>
      </header>
    </div>
  );
}

export default App;
