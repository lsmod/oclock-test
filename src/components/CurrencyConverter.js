import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./CurrencyConverter.css";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import MenuItem from "@material-ui/core/MenuItem";
import SyncAlt from "@material-ui/icons/SyncAlt";
import BugReport from "@material-ui/icons/BugReport";

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
    // allons chercher les devises et taux de change via l'API fixer.io
    axios
      .get("http://data.fixer.io/api/latest", {
        params: {
          base: "EUR",
          access_key: "811513ec9211e6a63b6f694ceb5bafd6"
        }
      })
      .then(response => {
        if (!response.data || !response.data.success || !response.data.rates) {
          return Promise.reject(response);
        }
        setApiDevicesRates(response.data.rates);
      })
      .catch(err => {
        console.log("fetching api error:", err);
        setApiDown(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isApiDown) {
    return (
      <div>
        <BugReport />
        <br />
        Impossible de charger les derniers taux de change.
        <br />
        Veuillez ré-essayer plutard
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
        <br />
        Chargement des taux de change
      </div>
    );
  }

  // on n'est pas en train de charger? -> on affiche notre convertisseur
  return (
    <div className="currency-converter-wrapper">
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
        <Select
          labelId="device-select-label"
          id="device-select-label"
          value={deviceRate.device}
          onChange={handleDeviceChange}
        >
          {Object.keys(apiDevicesRates).map(deviceName => (
            <MenuItem key={deviceName} value={deviceName}>
              {deviceName}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </div>
  );
}

export default CurrencyConverter;
