import "./Header.scss";

import Logo from "../../assets/img/Logo.png";

const Header = () => {
    return (
        <header>
            <p>Being naked is the #1 most sustianable option. We're #2.</p>
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
            <img src={Logo} alt="Cohera Logo" />
            <div>
                <i className="fa-solid fa-magnifying-glass"></i>
                <i className="fa-regular fa-heart"></i>
            </div>
        </header>
    );
};

export default Header;
