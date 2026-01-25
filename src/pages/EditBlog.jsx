import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function EditBlog() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        api.get(`/blog/${id}`)
            .then(res => {
                setTitle(res.data.title);
                setBody(res.data.body);
            })
            .catch(() => {
                setError("Failed to load blog");
            });
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/blog/${id}`, {
                title,
                body
            });
            navigate("/");
        } catch {
            setError("Update failed");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>

            {error && <p className="text-red-500 mb-3">{error}</p>}

            <form onSubmit={handleUpdate} className="space-y-4">
                <input
                    className="w-full border p-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    className="w-full border p-2"
                    rows="6"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />

                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    Update
                </button>
            </form>
        </div>
    );
}
