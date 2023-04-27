import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import Header from "../../components/Header/Header";

function Login(props) {
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const userLoginRef = useRef();
    const passwordLoginRef = useRef();

    const { onLogin } = props;

    const login = async (event) => {
        event.preventDefault();

        const userLogin = userLoginRef.current.value;
        const passwordLogin = passwordLoginRef.current.value;

        try {
            const result = await fetch("http://localhost:4545/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    user: userLogin,
                    password: passwordLogin,
                }),
            });

            if (result.ok) {
                console.log("login erfolgreich, mit User: " + userLogin);
                onLogin(userLogin);
                window.localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(userLogin)
                );
                navigate("/dashboard");
            } else {
                setError(true);
                console.log("Error:", result.statusText);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <section id="login">
            <Header />
            <article>
                <h2>Login to your Account</h2>
                <form onSubmit={login}>
                    <div>
                        <label htmlFor="userLogin">Email</label>
                        <input
                            ref={userLoginRef}
                            type="text"
                            name="userLogin"
                            id="userLogin"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="passwordLogin">Password</label>
                        <input
                            ref={passwordLoginRef}
                            type="password"
                            name="passwordLogin"
                            id="passwordLogin"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                    <span>
                        <p>Don't have an account ? </p>
                        <Link to="/register">Register </Link>
                    </span>
                </form>
            </article>
        </section>
    );
}

export default Login;
