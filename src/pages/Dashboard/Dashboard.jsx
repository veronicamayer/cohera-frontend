import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Dashboard({ setloggedInUser, loggedInUser, articles }) {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const response = await axios.get(
                `http://localhost:4545/favorites/${loggedInUser}`
            );
            setFavorites(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        try {
            const result = await fetch("http://localhost:4545/logout", {
                method: "GET",
                credentials: "include",
                headers: { "content-type": "application/json" },
            });
            window.localStorage.clear();
            setloggedInUser("");
            navigate("/");
            console.log(result);
        } catch (err) {
            console.log(err);
        }
    };

    function handleHeartClick(article) {
        fetch(`http://localhost:4545/favorites/${loggedInUser}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ favorite: article }),
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Document updated successfully");
                    fetchFavorites();
                } else {
                    console.log(
                        "Error updating document:",
                        response.statusText
                    );
                }
            })
            .catch((error) => {
                console.log("Error updating document:", error);
            });
    }

    return (
        <section id="dashboard">
            <Header />
            <article>
                <h1>Dashboard</h1>
                <button onClick={logout}>Log out</button>
                <div id="favorites">
                    {favorites.length > 0 ? (
                        favorites.map((article) => (
                            <article key={article.id}>
                                <i
                                    className={`fa-heart ${
                                        favorites.some(
                                            (favoriteArticle) =>
                                                article.id ===
                                                favoriteArticle.id
                                        )
                                            ? "fa-solid"
                                            : "fa-regular"
                                    }`}
                                    onClick={() => handleHeartClick(article)}
                                ></i>
                                <Link
                                    to={`/details/${article.shopName}/${article.id}`}
                                >
                                    <img src={article.imageUrl} alt="" />
                                    <div>
                                        <p>{article.title}</p>
                                        <p>{article.price}</p>
                                    </div>
                                </Link>
                            </article>
                        ))
                    ) : (
                        <p>No favorite articles yet.</p>
                    )}
                </div>
            </article>
        </section>
    );
}

export default Dashboard;
