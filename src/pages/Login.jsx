import { useState } from "react";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault(); // stop page refresh

        try {
            const formData = new FormData();
            formData.append("username", email);   // backend expects "username"
            formData.append("password", password);

            const res = await axios.post(
                "https://fastapi-blog-backend-production.up.railway.app/login",
                formData
            );

            const token = res.data.access_token;

            // Save token in browser
            localStorage.setItem("token", token);

            setMessage("Login successful!");
        } catch (err) {
            setMessage("Login failed");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <form onSubmit={handleLogin} className="p-6 border rounded w-80">
                <h1 className="text-2xl font-bold mb-4">Login</h1>

                <input
                    className="border p-2 w-full mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="border p-2 w-full mb-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="bg-black text-white w-full p-2">
                    Login
                </button>

                <p className="mt-3 text-center">{message}</p>
            </form>
        </div>
    );
}
