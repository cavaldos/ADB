import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";
import { Provider } from "react-redux";
import store from "./store";

const ProviderGlobal = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
export default ProviderGlobal;
