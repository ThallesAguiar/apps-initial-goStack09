import React from 'react';

import { StatusBar } from 'expo-status-bar'; // configura os icones do status bar onde fica, bateria, wifi, hora ...


import Routes from './src/routes';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="black" style="light" />
      <Routes />
    </>);
}
