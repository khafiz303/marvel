import { createRoot } from "react-dom/client";
import App from "./components/app/App";
import "./style/style.scss";
import MarvelService from "./services/MarvelService";
import React from "react";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
 

 
);
