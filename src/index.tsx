import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import "./Translations/franch.json"
i18n.use(initReactI18next).init({
    // Supported languages
    lng: "english", // Initial language
    fallbackLng: "english", // Language to fall back to
    debug: true, // Enable debug mode

    // Load translation files
    resources: {
        english: {
            translation: require("./Translations/english.json"),
        },
        franch: {
            translation: require("./Translations/franch.json"),
        },
        // Add more languages here
    },
});

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
