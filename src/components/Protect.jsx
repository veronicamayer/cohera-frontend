import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Protect = () => {
    const [isAllowed, setIsAllowed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const result = await fetch(
                    "http://localhost:4545/userValidate",
                    {
                        credentials: "include",
                    }
                );
                if (result.ok) {
                    setIsAllowed(true);
                } else {
                    setIsAllowed(false);
                    console.log("User is not logged in");
                    navigate("/login");
                }
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };
        verifyToken();
    }, []);

    // add conditional rendering
    if (isLoading || !isAllowed) {
        return null;
    } else {
        return <Outlet />;
    }
};
