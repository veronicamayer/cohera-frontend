import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/details/:shopName/:index"
                        element={<Details />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
