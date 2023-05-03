import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard({ loggedInUser, favorites, articles }) {
    const navigate = useNavigate();
    const [favoriteArticles, setFavoriteArticles] = useState([]);

    const logout = async () => {
        try {
            const result = await fetch("http://localhost:4545/logout", {
                method: "GET",
                credentials: "include",
                headers: { "content-type": "application/json" },
            });
            window.localStorage.clear();
            navigate("/");
            console.log(result);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const filteredArticles = [...articles].filter((article) =>
            favorites.includes(article.id)
        );
        setFavoriteArticles(filteredArticles);
    }, [favorites, articles]);

    function handleHeartClick(article) {
        console.log(loggedInUser + ": " + article);
        fetch(`http://localhost:4545/users/${loggedInUser}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ favorite: article }),
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Document updated successfully");
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
                    {favoriteArticles.length > 0 ? (
                        favoriteArticles.map((article) => (
                            <article key={article.id}>
                                <i
                                    className={`fa-heart ${
                                        favorites.includes(article.id)
                                            ? "fa-solid"
                                            : "fa-regular"
                                    }`}
                                    onClick={() => handleHeartClick(article.id)}
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
