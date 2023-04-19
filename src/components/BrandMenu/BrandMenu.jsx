import "./BrandMenu.scss";

const BrandMenu = () => {
    return (
        <section id="brandMenu">
            <button
                onClick={() => {
                    document
                        .querySelector("#brandMenu")
                        .classList.remove("visible");
                    document.querySelector("#allArticles").style.marginLeft =
                        "5vw";
                }}
            >
                <i className="fa-solid fa-x"></i>
            </button>
            <a href="">Dariadeh</a>
            <a href="">Veja</a>
            <a href="">Salzwasser</a>
            <a href="">TwoThirds</a>
            <a href="">Patagonia</a>
            <a href="">Melawear</a>
        </section>
    );
};

export default BrandMenu;
