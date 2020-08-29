import React from 'react';
import RouterComponent from "./routes/router-component";
import "./index.css";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from 'react-redux'
import rootReducer from './store/rootReducer';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

function App() {
  return (

      <Provider store={ store }>
        <RouterComponent />
      </Provider>
  );
}

export default App;
