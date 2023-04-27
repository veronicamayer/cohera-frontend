import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.scss";

import Header from "../../components/Header/Header";
import BrandMenu from "../../components/BrandMenu/BrandMenu";
import Banner from "../../assets/img/Banner.png";

const Home = (loggedInUser) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:4545/api/allshops")
            .then(function (response) {
                setArticles(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, []);

    function handleHeartClick(article) {
        console.log(loggedInUser.loggedInUser + ": " + article);
        fetch(`http://localhost:4545/users/${loggedInUser.loggedInUser}`, {
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
        <main>
            <BrandMenu />
            <Header />
            <section id="categories">
                <a href="">T-Shirts</a>
                <a href="">Pullover</a>
                <a href="">Hosen</a>
                <a href="">Shorts</a>
                {/*                 <a href="">Waesche</a>
                <a href="">Badekleidung</a>
 */}{" "}
                <a href="">Schuhe</a>
                <a href="">Accessoires</a>
            </section>
            {/*             <img src={Banner} alt="" id="banner" />
             */}{" "}
            <li id="counter">{`all items (${articles.length})`}</li>
            <section id="allArticles">
                {articles.map((article, i) => (
                    <article key={i}>
                        <i
                            className={`fa-regular fa-heart ${
                                article.liked ? "liked" : ""
                            }`}
                            onClick={() => handleHeartClick(article.index)}
                        ></i>
                        <Link
                            to={`/details/${article.shopName}/${article.index}`}
                        >
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
