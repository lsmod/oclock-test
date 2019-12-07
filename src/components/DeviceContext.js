// TODO créer un context partagé par les différents composants
// context qui permettra de changer de device depuis un composant imbriqué et de prévenir le composant parent
// on pourrait bien sûr utiliser redux mais pour un si petite application ce n'est pas nécessaire
export const DeviceContext = React.createContext({
  currentDevice: "EUR",
  toggleDevice: device => {}
});
