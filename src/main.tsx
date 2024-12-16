import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router";
import {FilterProvider} from "./context/FilterContext.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <FilterProvider>
                <App/>
            </FilterProvider>
        </BrowserRouter>
    </StrictMode>,
)
