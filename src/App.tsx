import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Container } from '@mantine/core'

import './App.css'

import { NotFound } from './components/404/NotFound'
import Alert from './components/Alert/Alert'
import Auth from './components/Auth/Auth'
import Concert from './components/Concert/Concert'
import { Login } from './components/Login/Login'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import ProtectedRote from './components/ProtectedRoute/ProtectedRote'
import Unavaliable from './components/Unavaliable/Unavaliable'
import MainPage from './features/Admin/Concerts/Concerts'
import Promocodes from './features/Admin/Promocodes/Promocodes'
import CartPage from './features/User/CartPage/CartPage'
import Tickets from './features/User/Tickets/Tickets'

function App() {
  return (
    <Auth>
      <Unavaliable>
        <Alert />
        <BrowserRouter>
          <Container maw={'100%'} p={'0px'} w={'100%'}>
            <Routes>
              <Route element={<PrivateRoute />} path={'/'}>
                <Route element={<Tickets />} index />
                <Route element={<Tickets />} path={`tickets`} />
                <Route element={<CartPage />} path={`cart`} />
                <Route element={<Concert />} path={`concert/:id`} />
              </Route>
              <Route element={<ProtectedRote />} path={'admin'}>
                <Route element={<MainPage />} index />
                <Route element={<MainPage />} path={'concerts'} />
                <Route element={<Concert />} path={`concert/:id`} />
                <Route element={<Promocodes />} path={`promocodes`} />
              </Route>
              <Route element={<Login />} path={'login'} />
              <Route element={<NotFound />} path={'*'} />
            </Routes>
          </Container>
        </BrowserRouter>
      </Unavaliable>
    </Auth>
  )
}

export default React.memo(App)
