import React from "react";

const deviceContext = React.createContext({
  selectedDevice: "EUR",
  changeDevice: device => {},
  fetchRate: (setApiDevicesRates, setApiDown, setIsLoading) => {} // fonction pour charger les device et taux de conversion
});

export default deviceContext;
