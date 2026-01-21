import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/blog", { title, body });
            setMessage("Blog created!");
            setTimeout(() => navigate("/"), 800);
        } catch (err) {
            setMessage("Failed to create blog");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100">
            <form onSubmit={handleSubmit} className="bg-white p-7 rounded shadow w-96">
                <h1 className="text-2xl font-bold mb-4">Create Blog</h1>

                <input
                    className="border p-25 w-full mb-15"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    className="border p-30 w-full mb-7 h-72"
                    placeholder="Body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />

                <button className="bg-black text-white w-full p-6 rounded">
                    Publish
                </button>

                <p className="mt-3 text-center">{message}</p>
            </form>
        </div>
    );
}
