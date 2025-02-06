import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Index from "./containers/index/Index.tsx";
import {useEffect} from "react";
import PrimarySearchAppBar from "./containers/appTitle/PrimarySearchAppBar.tsx";
import Category from "./containers/category/Category.tsx";
import Transaction from "./containers/transaction/Transaction.tsx";
import Box from "@mui/material/Box";
import Cookies from "universal-cookie";

const App = () => {
    const cookies = new Cookies();
    useEffect(() => {
        const token: string = cookies.get('token') || "";
        const tokenFromUrl: string = getTokenFromURL();
        const url = new URL(window.location.href);
        if (!token && tokenFromUrl) {
            cookies.set('token', tokenFromUrl, {path: '/'});
            window.history.replaceState({}, document.title, url.pathname);
        } else if (!token && !tokenFromUrl) {
            location.href = "https://account-test.crater2018.com/login?redirect_uri=" + location.href;
        } if (tokenFromUrl && token !== tokenFromUrl) {
            cookies.set('token', tokenFromUrl, {path: '/'});
            window.history.replaceState({}, document.title, url.pathname);
        }
    }, []);

    return (
        <Box sx={{height: '100vh', width: '100vw'}}>
            <Box component={"header"}>
                <PrimarySearchAppBar></PrimarySearchAppBar>
            </Box>
            <Box component={"main"} className="main">
                <Box component="div" className="content">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Index/>}/>
                            <Route path="/category" element={<Category/>}/>
                            <Route path="/transaction" element={<Transaction/>}/>
                        </Routes>
                    </BrowserRouter>
                </Box>
            </Box>
        </Box>
    )
        ;
}

const getTokenFromURL = (): string => {
    return new URLSearchParams(location.search).get('token') || "";
};

export default App;