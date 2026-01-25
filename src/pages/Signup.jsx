import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await api.post("/user", {
                name,
                email,
                password,
            });

            // after successful signup → go to login
            navigate("/login");
        } catch (err) {
            setError("Signup failed. Email may already exist.");
        }
    };

    return (
        <div className="flex items-center justify-center h-full">
            <form
                onSubmit={handleSignup}
                className="bg-white p-8 rounded-xl shadow-md w-96"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Create Account
                </h1>

                {error && (
                    <p className="text-red-500 text-sm mb-3 text-center">
                        {error}
                    </p>
                )}

                <input
                    className="w-full border p-2 mb-3"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    className="w-full border p-2 mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    required
                />

                <input
                    type="password"
                    className="w-full border p-2 mb-4"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}
