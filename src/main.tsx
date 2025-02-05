import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {configureStore} from "@reduxjs/toolkit";
import allReducers from "./reducers";
import {Provider} from "react-redux";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

const store = configureStore({reducer: allReducers});

createRoot(document.getElementById('root')!)
    .render(
        <StrictMode>
            <Provider store={store}>
                <DevSupport ComponentPreviews={ComponentPreviews}
                            useInitialHook={useInitial}
                >
                    <App/>
                </DevSupport>
            </Provider>
        </StrictMode>,
    )
