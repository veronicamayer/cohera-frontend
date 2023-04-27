import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
import Header from "../../components/Header/Header";

function Register() {
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const userRef = useRef();
    const passwordRef = useRef();
    const envURL = "http://localhost:4545";
    const envPath = "/register";
    const url = envURL + envPath;

    const register = async () => {
        event.preventDefault();

        const user = userRef.current.value;
        const password = passwordRef.current.value;

        try {
            const result = await fetch(url, {
                method: "POST",
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ user, password }),
            });
            const data = await result.json();
            console.log(data);
            userRef.current.value = "";
            passwordRef.current.value = "";

            if (result.ok) {
                console.log("register erfolgreich");
                navigate("/");
            } else {
                setError(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section id="register">
            <Header />
            <article>
                <h2>Create a New Account</h2>
                <form onSubmit={register}>
                    <div>
                        <label htmlFor="user">Email</label>
                        <input
                            ref={userRef}
                            type="text"
                            placeholder="Email"
                            name="user"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            ref={passwordRef}
                            type="password"
                            placeholder="Password"
                            name="password"
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                    <span>
                        Already have an account ?<Link to="/login"> Login</Link>
                    </span>
                </form>
            </article>
        </section>
    );
}

export default Register;
