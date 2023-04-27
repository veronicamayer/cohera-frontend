import "./Header.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/Logo.png";

const Header = () => {
    return (
        <header>
            {/*             <p>Being naked is the #1 most sustianable option. We're #2.</p>
             */}{" "}
            <button
                onClick={() => {
                    console.log("click");
                    document
                        .querySelector("#brandMenu")
                        .classList.add("visible");
                    document.querySelector("#allArticles").style.marginLeft =
                        "22vw";
                }}
            >
                <i className="fa-solid fa-bars"></i>
            </button>
            <Link to="/">
                <img src={Logo} alt="Cohera Logo" />
            </Link>
            <div>
                <i className="fa-solid fa-magnifying-glass"></i>
                <Link to="/dashboard">
                    <i className="fa-regular fa-heart"></i>
                </Link>
            </div>
        </header>
    );
};

export default Header;
