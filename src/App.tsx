import React from 'react';
import logo from './logo.svg';
import './App.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";

import {Container, MantineProvider} from "@mantine/core";
import {HeaderSimple} from "./components/Header/HeaderMantine";
import {appTheme, styles} from "./appTheme";
import {HeaderLinks, ROUTES} from "./const/routes";
import MainPage from "./features/Admin/MainPage";
import Concert from "./components/Concert/Concert";
import Alert from "./components/Alert/Alert";
function App() {
  return (
      <MantineProvider withGlobalStyles withNormalizeCSS theme={appTheme}>
          <Alert/>
          <BrowserRouter>
              <Container sx={styles}>
                  <HeaderSimple links={HeaderLinks}/>
                  <Routes>
                      <Route path={'/'} element={<MainPage/>}/>
                      <Route path={`/concert/:id`} element={<Concert/>}/>
                      {/*<Route path={`/${ROUTES.ADMIN}`} element={}/>*/}
                  </Routes>
              </Container>
          </BrowserRouter>
      </MantineProvider>
  );
}

export default App;
