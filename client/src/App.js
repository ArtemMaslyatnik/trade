import React from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRouter from './components/AppRouter';
import {observer} from "mobx-react-lite";
import NavAppBar from './components/NavAppBar';


const App = observer(() =>{
  
  

  return (
    <BrowserRouter>
      <NavAppBar />
      {/* <NavBar /> */}
      <AppRouter />
    </BrowserRouter>


  );
});

export default App;