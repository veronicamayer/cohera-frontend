import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.scss";

import Header from "../../components/Header/Header";
import BrandMenu from "../../components/BrandMenu/BrandMenu";
import Banner from "../../assets/img/Banner.png";

const Home = () => {
    const [articles, setArticles] = useState([]);

    function shuffle(array) {
        let currentIndex = array.length;
        let temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    useEffect(() => {
        const options = {
            method: "GET",
            url: "https://fashion-api1.p.rapidapi.com/allshops",
            headers: {
                "X-RapidAPI-Key":
                    "19b378c85fmshb943337f79f2f6cp1141e7jsnfa3ce943fc17",
                "X-RapidAPI-Host": "fashion-api1.p.rapidapi.com",
            },
        };

        axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                setArticles(shuffle(response.data)); // shuffle the response data and set the state
            })
            .catch(function (error) {
                console.error(error);
            });
    }, []);

    console.log(articles);

    return (
        <main>
            <BrandMenu />
            <Header />
            <section id="categories">
                <a href="">T-Shirts</a>
                <a href="">Pullover</a>
                <a href="">Hosen</a>
                <a href="">Shorts</a>
                <a href="">Waesche</a>
                <a href="">Badekleidung</a>
                <a href="">Schuhe</a>
                <a href="">Accessoires</a>
            </section>
            <img src={Banner} alt="" id="banner" />
            <li id="counter">{`all items (${articles.length})`}</li>
            <section id="allArticles">
                {articles.map((article) => (
                    <Link to={`/details/${article.shopName}/${article.index}`}>
                        <img src={article.imageUrl} alt="" />
                        <div>
                            <p>{article.title}</p>
                            <p>{article.price}</p>
                        </div>
                    </Link>
                ))}
            </section>
        </main>
    );
};

export default Home;
