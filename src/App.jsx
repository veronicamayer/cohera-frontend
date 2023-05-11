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
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        setloggedInUser(
            JSON.parse(window.localStorage.getItem("loggedInUser"))
        );

        axios
            .get("http://localhost:4545/api/allshops")
            .then(function (response) {
                setArticles(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                loggedInUser={loggedInUser}
                                articles={articles}
                            />
                        }
                    />
                    <Route
                        path="/details/:shopName/:id"
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
                            element={
                                <Dashboard
                                    setloggedInUser={setloggedInUser}
                                    loggedInUser={loggedInUser}
                                    articles={articles}
                                />
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
