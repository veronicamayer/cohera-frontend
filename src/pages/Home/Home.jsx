import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.scss";

import Header from "../../components/Header/Header";
import BrandMenu from "../../components/BrandMenu/BrandMenu";
import Banner from "../../assets/img/Banner.png";

const Home = ({ loggedInUser, articles }) => {
    const [favorites, setFavorites] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        !loggedInUser ? setFavorites([]) : fetchFavorites();
    }, [loggedInUser]);

    useEffect(() => {
        filterArticlesByCategory();
    }, [selectedCategory, articles]);

    const fetchFavorites = () => {
        fetch(`http://localhost:4545/favorites/${loggedInUser}`)
            .then((response) => response.json())
            .then((data) => {
                setFavorites(data);
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    function addFavorite(article) {
        fetch(`http://localhost:4545/favorites/${loggedInUser}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ favorite: article }),
        })
            .then((response) => {
                console.log(response.status);
                fetchFavorites();
            })
            .catch((error) => {
                console.log("Error updating document:", error);
            });
    }

    function deleteFavorite(article) {
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

    const filterArticlesByCategory = () => {
        if (selectedCategory === "") {
            setFilteredArticles(articles);
        } else {
            const includeKeywords = selectedCategory
                .toLowerCase()
                .split(" ")
                .filter((keyword) => !keyword.startsWith("-"));
            const excludeKeywords = selectedCategory
                .toLowerCase()
                .split(" ")
                .filter((keyword) => keyword.startsWith("-"))
                .map((keyword) => keyword.slice(1));

            const filtered = articles.filter((article) => {
                const title = article.title.toLowerCase();
                const includesInclusionKeywords = includeKeywords.some(
                    (keyword) => title.includes(keyword)
                );
                const includesExclusionKeywords = excludeKeywords.some(
                    (keyword) => title.includes(keyword)
                );
                return includesInclusionKeywords && !includesExclusionKeywords;
            });

            setFilteredArticles(filtered);
        }
    };

    return (
        <main>
            <BrandMenu />
            <Header />
            <section id="categories">
                <a onClick={() => setSelectedCategory("")}>Alles</a>
                <a
                    onClick={() =>
                        setSelectedCategory(
                            "t-shirt shirt top -longsleeve -sweatshirt"
                        )
                    }
                >
                    T-Shirts
                </a>
                <a
                    onClick={() =>
                        setSelectedCategory("pullover sweatshirt jumper")
                    }
                >
                    Pullover
                </a>
                <a onClick={() => setSelectedCategory("Hose")}>Hosen</a>
                <a onClick={() => setSelectedCategory("shorts")}>Shorts</a>
                <a onClick={() => setSelectedCategory("Waesche")}>Waesche</a>
                <a onClick={() => setSelectedCategory("Badekleidung")}>
                    Badekleidung
                </a>
                <a onClick={() => setSelectedCategory("sneaker")}>Schuhe</a>
                <a onClick={() => setSelectedCategory("Accessoires")}>
                    Accessoires
                </a>
            </section>
            <img src={Banner} alt="" id="banner" />

            <li id="counter">{`all items (${filteredArticles.length})`}</li>
            <section id="allArticles">
                {filteredArticles.map((article, i) => (
                    <article key={i}>
                        <i
                            className={`fa-heart ${
                                favorites &&
                                favorites.some(
                                    (favoriteArticle) =>
                                        article.id === favoriteArticle.id
                                )
                                    ? "fa-solid"
                                    : "fa-regular"
                            }`}
                            onClick={() =>
                                favorites &&
                                favorites.some(
                                    (favoriteArticle) =>
                                        article.id === favoriteArticle.id
                                )
                                    ? deleteFavorite(article)
                                    : addFavorite(article)
                            }
                        ></i>
                        <Link to={`/details/${article.shopName}/${article.id}`}>
                            <img src={article.imageUrl} alt="" />
                            <div>
                                <p>{article.title}</p>
                                <p>{article.price}</p>
                            </div>
                        </Link>
                    </article>
                ))}
            </section>
        </main>
    );
};

export default Home;
