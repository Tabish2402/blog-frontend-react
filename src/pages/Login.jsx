import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const formData = new FormData();
            formData.append("username", email.trim());
            formData.append("password", password);

            const res = await api.post("/login", formData);

            const token = res.data.access_token;

            localStorage.setItem("token", token);

            setMessage("Login successful!");

            // redirect to home
            navigate("/");
        } catch (err) {
            setMessage("Login failed");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <form onSubmit={handleLogin} className="p-6 border rounded w-80 bg-white">
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

                <input
                    className="border p-2 w-full mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                />

                <input
                    type="password"
                    className="border p-2 w-full mb-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="bg-black text-white w-full p-2 rounded">
                    Login
                </button>

                {message && (
                    <p className="mt-3 text-center text-sm text-red-500">
                        {message}
                    </p>
                )}

                <p className="text-sm mt-4 text-center">
                    New here?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-blue-600 cursor-pointer underline"
                    >
                        Create an account
                    </span>
                </p>
            </form>
        </div>
    );
}
