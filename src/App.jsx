import "./App.scss";

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Protect } from "./components/Protect";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
    const [loggedInUser, setloggedInUser] = useState("");
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        setloggedInUser(
            JSON.parse(window.localStorage.getItem("loggedInUser"))
        );

        if (loggedInUser) {
            axios
                .get(`http://localhost:4545/users/${loggedInUser}/favorites`)
                .then(function (response) {
                    console.log("User favorites:" + response);
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem(
            "loggedInUser",
            JSON.stringify(loggedInUser)
        );
    }, [loggedInUser]);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Home loggedInUser={loggedInUser} />}
                    />
                    <Route
                        path="/details/:shopName/:index"
                        element={<Details />}
                    />
                    <Route
                        path="/login"
                        element={<Login onLogin={setloggedInUser} />}
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Login />} />
                    <Route element={<Protect />}>
                        <Route
                            path="/dashboard"
                            element={<Dashboard favorites={favorites} />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
