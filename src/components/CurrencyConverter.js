import React from "react";
import "./CurrencyConverter.css";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import SyncAlt from "@material-ui/icons/SyncAlt";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

function CurrencyConverter() {
  const [device, setDevice] = React.useState("DOLLAR"); // device vers laquelle convertir nos euros
  const [userValue, setUserValue] = React.useState(1); // valeur à convertir
  const [convertedValue, setConvertedValue] = React.useState(0.9); // valeur une fois convertie
  const [convertionRate, setConvertionRate] = React.useState(0.78); // taux de change/convertion
  const [isLoading, setIsLoading] = React.useState(true);

  const convertDevice = value => {
    setConvertedValue(value * convertionRate);
  };

  const handleDeviceChange = event => {
    const newConvertionRate = convertionRate * 1.5; // en attendant d'utiliser des vrai taux de change au le fais varier à chaque fois
    setConvertionRate(newConvertionRate);
    setDevice(event.target.value);
    convertDevice(userValue);
  };

  const handleUserValueChange = event => {
    setUserValue(event.target.value);
    convertDevice(event.target.value);
  };

  // on fait semblant de charger pendant 3 secondes
  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
        <br />
        Chargement des taux de change
      </div>
    );
  }

  // on n'est pas en train de charger -> on affiche notre convertisseur
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
          label={device}
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
          value={device}
          onChange={handleDeviceChange}
        >
          <MenuItem value="EUR">EUR</MenuItem>
          <MenuItem value="DOLLAR">Dollar</MenuItem>
          <MenuItem value="YUAN">Yuan</MenuItem>
        </Select>
      </Grid>
    </div>
  );
}

export default CurrencyConverter;
