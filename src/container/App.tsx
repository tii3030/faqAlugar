import React from 'react';
import Routes from '../routes/Routes';
import { ModalProvider } from '../context/ModalContext';

function App() {
  return (
    <ModalProvider>
      <div className="App">
        <Routes />
      </div>
    </ModalProvider>
  );
}

export default App;
