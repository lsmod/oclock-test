import React from "react";
import { useEffect, useState } from "react";

import DeviceContext from "../contexts/DeviceContext";
import apiFetcher from "../rates_api/ratesFetcher";

import "./CurrencyConverter.css";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SyncAlt from "@material-ui/icons/SyncAlt";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import DeviceSelector from "./DeviceSelector";

function CurrencyConverter() {
  const [deviceRate, setDeviceRate] = useState({ device: "EUR", rate: 1 }); // devises et taux sélectionner pour convertir nos euros
  const [apiDevicesRates, setApiDevicesRates] = useState({}); // liste des devises et des taux de change
  const [isLoading, setIsLoading] = useState(true); // utilisé pour afficher un loader pendant la récupération des taux depuis l'API web
  const [isApiDown, setApiDown] = useState(false); // dans le cas ou on n'arrive pas joindre l'API on affichera un message d'erreur
  const [userValue, setUserValue] = useState(1); // valeur à convertir
  const [convertedValue, setConvertedValue] = useState(0.9); // valeur une fois convertie

  // l'utilisateur a sélectionné une devise vers laquelle convertir ses euros
  const handleDeviceChange = event => {
    setDeviceRate({
      device: event.target.value,
      rate: apiDevicesRates[event.target.value]
    });
  };

  // l'utilisateur entre combien d'euro il veut convertir
  const handleUserValueChange = event => {
    setUserValue(event.target.value);
  };

  const fetchRates = () => {
    apiFetcher(setApiDevicesRates, setApiDown, setIsLoading);
  };

  // on surveille:
  // - la devise sélectionnée par l'utilisateur
  // - la valeur en euro entrée par l'utilisateur
  // en cas de changement on refait notre convertion avec le taux et la devise actuelle
  useEffect(() => {
    setConvertedValue(userValue * deviceRate.rate);
  }, [deviceRate, userValue]);

  // au chargement de notre composant :
  // - on récupère les taux de change depuis l'API fixer.io
  // - on actualise le state du composant (setDevicesRates, setApiDown, setIsLoading)
  useEffect(() => {
    fetchRates(); // allons chercher les devises et taux de change via l'API fixer.io
  }, []);

  if (isApiDown) {
    return <ErrorMessage />;
  }

  if (isLoading) {
    return <Loader />;
  }


  // on n'est pas en train de charger ? -> on affiche notre convertisseur
  return (
    <div className="currency-converter-wrapper">
      <DeviceContext.Provider
        value={{
          selectedDevice: deviceRate.device,
          changeDevice: handleDeviceChange,
          fetchRate: fetchRates
        }}
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <TextField
            id="user-value"
            label="EUR"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
            value={userValue}
            onChange={handleUserValueChange}
            className="converter-input"
          />
          <SyncAlt fontSize="large" className="converting-icon" />
          <TextField
            id="converted-value"
            label={deviceRate.device}
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            disabled
            variant="outlined"
            className="converter-input"
            value={convertedValue}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className="device-selector-grid"
        >
          <div className="user-device-div">Euro</div>
          <DeviceSelector devicesRates={apiDevicesRates} />
        </Grid>
      </DeviceContext.Provider>
    </div>
  );
}

export default CurrencyConverter;
