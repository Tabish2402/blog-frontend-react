import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function EditBlog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        api.get(`/blog/${id}`).then(res => {
            setTitle(res.data.title);
            setBody(res.data.body);
        });
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        await api.put(`/blog/${id}`, { title, body });
        navigate("/");
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow w-96">
                <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
                <input value={title} onChange={e => setTitle(e.target.value)} className="border p-2 w-full mb-3" />
                <textarea value={body} onChange={e => setBody(e.target.value)} className="border p-2 w-full h-32 mb-3" />
                <button className="bg-black text-white w-full p-2">Update</button>
            </form>
        </div>
    );
}
