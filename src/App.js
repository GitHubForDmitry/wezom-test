import React from 'react';
import { AppProvider } from "./context/app-context";
import RouterComponent from "./routes/router-component";
import "./index.css";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from 'react-redux'
import rootReducer from './store/rootReducer';
import ProductList from "./store/productList";

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

function App() {
  return (

      <Provider store={ store }>
        {/*<RouterComponent />*/}
          <ProductList />

      </Provider>
  );
}

export default App;
