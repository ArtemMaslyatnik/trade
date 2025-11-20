import React, {useContext, useEffect} from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import {observer} from "mobx-react-lite";
import NavTabs from './components/NavTabs';
import NavAppBar from './components/NavAppBar';


const App = observer(() =>{
  
  

  return (
    <BrowserRouter>
      <NavAppBar />
      <NavBar />
      <AppRouter />
    </BrowserRouter>


  );
});

export default App;