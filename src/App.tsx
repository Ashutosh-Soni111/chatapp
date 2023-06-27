import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Home } from "./Components/Home";
import { Navbar } from "./Components/Navbar";
import { BottomNav } from "./Components/BottomNav";
import { CustomPage } from "./Components/CustomPage";
import i18n from "i18next";
import { I18nextProvider, useTranslation } from "react-i18next";
function App() {
    const { t } = useTranslation();
    return (
        <I18nextProvider i18n={i18n}>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="navbar" element={<Navbar />} />
                <Route path="bottomNav" element={<BottomNav />} />
                <Route path="CustomPage" element={<CustomPage />} />
            </Routes>
            <BottomNav />
        </I18nextProvider>
    );
}

export default App;
