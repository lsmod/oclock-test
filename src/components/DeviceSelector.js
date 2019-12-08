import React from "react";
import { useContext } from "react";
import DeviceContext from "../contexts/DeviceContext";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// selecteur de devises:
// permet à l'utilisateur de sélectionner la devise vers laquelle il souhaite convertir ses euros
function DeviceSelector(props) {
  const deviceContext = useContext(DeviceContext);

  return (
    <Select
      labelId="device-select-label"
      id="device-select-label"
      value={deviceContext.selectedDevice}
      onChange={deviceContext.changeDevice}
    >
      {Object.keys(props.devicesRates).map(deviceName => (
        <MenuItem key={deviceName} value={deviceName}>
          {deviceName}
        </MenuItem>
      ))}
    </Select>
  );
}

export default DeviceSelector;
