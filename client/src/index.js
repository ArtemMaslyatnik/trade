import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GoodsStore from "./store/GoodsStore"
import ContractStore from "./store/ContractStore"
import CompanyStore from "./store/CompanyStore"
import PartnerStore from "./store/PartnerStore"
import InvoceInStore from "./store/InvoceInStore"
import InvoceOutStore from "./store/InvoceOutStore"

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      goods: new GoodsStore(),
      contract: new ContractStore(),
      company: new CompanyStore(),
      partner: new PartnerStore(),
      invoceIn: new InvoceInStore(),
      invoceOut: new InvoceOutStore(),

    }}>
    <App />
    </Context.Provider>
  </React.StrictMode>
);


