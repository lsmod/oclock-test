import React from "react";
import TextField from "@material-ui/core/TextField";
import SyncAlt from "@material-ui/icons/SyncAlt";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import "./CurrencyConverter.css";

function CurrencyConverter() {
  const [device, setDevice] = React.useState("DOLLAR"); // devise vers laquelle convertir nos euros
  const [userValue, setUserValue] = React.useState(1); // valeur à convertir
  const [convertedValue, setConvertedValue] = React.useState(0.9); // valeur une fois convertie
  const [convertionRate, setConvertionRate] = React.useState(0.78); // taux de change/convertion
  const [isLoading, setIsLoading] = React.useState(true);

  const convertDevice = value => {
    setConvertedValue(value * convertionRate);
  };

  const handleDeviceChange = event => {
    const newConvertionRate = convertionRate * 1.5; // en attendant d'utiliser les vraix taux de change on le fait varier à chaque fois
    setConvertionRate(newConvertionRate);
    setDevice(event.target.value);
    convertDevice(userValue);
  };

  const handleUserValueChange = event => {
    setUserValue(event.target.value);
    convertDevice(event.target.value);
  };

  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="currency-converter_wrapper">
      <TextField
        id="user-value"
        label="Euro"
        type="number"
        InputLabelProps={{
          shrink: true
        }}
        variant="outlined"
        value={userValue}
        onChange={handleUserValueChange}
      />
      <SyncAlt fontSize="large" />
      <TextField
        id="converted-value"
        label={device}
        type="number"
        InputLabelProps={{
          shrink: true
        }}
        disabled
        variant="outlined"
        value={convertedValue}
      />
      VERS
      <InputLabel id="device-input-label">Devise</InputLabel>
      <Select
        labelId="device-select-label"
        id="device-select-label"
        value={device}
        onChange={handleDeviceChange}
      >
        <MenuItem value="EURO">Euro</MenuItem>
        <MenuItem value="DOLLAR">Dollar</MenuItem>
        <MenuItem value="YUAN">Yuan</MenuItem>
      </Select>
    </div>
  );
}

export default CurrencyConverter;
