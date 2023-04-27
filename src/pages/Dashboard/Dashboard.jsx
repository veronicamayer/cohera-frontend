import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import Header from "../../components/Header/Header";

function Dashboard() {
    const navigate = useNavigate();
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

    return (
        <section id="dashboard">
            <Header />
            <article>
                <h1>Dashboard</h1>
                <button onClick={logout}>Log out</button>
            </article>
        </section>
    );
}

export default Dashboard;
