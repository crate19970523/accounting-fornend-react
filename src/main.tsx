import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {configureStore} from "@reduxjs/toolkit";
import allReducers from "./reducers";
import {Provider} from "react-redux";

const store = configureStore({reducer: allReducers});

createRoot(document.getElementById('root')!)
    .render(
        <StrictMode>
            <Provider store={store}>
                <App/>
            </Provider>
        </StrictMode>,
    )
