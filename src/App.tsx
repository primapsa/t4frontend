import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Container} from "@mantine/core";
import MainPage from "./features/Admin/Concerts/Concerts";
import Concert from "./components/Concert/Concert";
import Alert from "./components/Alert/Alert";
import Promocodes from "./features/Admin/Promocodes/Promocodes";
import Tickets from "./features/User/Tickets/Tickets";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import {NotFound} from "./components/404/NotFound";
import ProtectedRote from "./components/ProtectedRoute/ProtectedRote";
import CartPage from "./features/User/CartPage/CartPage";
import {Login} from "./components/Login/Login";
import Unavaliable from "./components/Unavaliable/Unavaliable";
import Auth from "./components/Auth/Auth";
import AppPreloader from "./components/Preloader/AppPreloader";



function App() {
    console.log('APP')
    return (
        <>
            <Auth/>
            <Unavaliable>
                <AppPreloader/>
                <Alert/>
                <BrowserRouter>
                    <Container w={'100%'} p={'0px'} maw={'100%'}>
                        <Routes>
                            <Route path={'/'} element={<PrivateRoute/>}>
                                <Route index element={<Tickets/>}/>
                                <Route path={`tickets`} element={<Tickets/>}/>
                                <Route path={`cart`} element={<CartPage/>}/>
                                <Route path={`concert/:id`} element={<Concert/>}/>
                            </Route>
                            <Route path={'admin'} element={<ProtectedRote/>}>
                                <Route index element={<MainPage/>}/>
                                <Route path={'concerts'} element={<MainPage/>}/>
                                <Route path={`concert/:id`} element={<Concert/>}/>
                                <Route path={`promocodes`} element={<Promocodes/>}/>
                            </Route>
                            <Route path={'login'} element={<Login/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </Container>
                </BrowserRouter>
            </Unavaliable>
        </>
    );
}

export default React.memo(App);
