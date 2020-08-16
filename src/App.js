import React from 'react';
import { AppProvider } from "./context/app-context";
import RouterComponent from "./routes/router-component";
import "./index.css";

function App() {
  return (

      <AppProvider>
        <RouterComponent />
      </AppProvider>
  );
}

export default App;
