
console.log("HOME COMPONENT LOADED");

import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Home() {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get("/")
            .then((res) => {
                setBlogs(res.data);
            })
            .catch((err) => {
                console.log(err);
                setError("Failed to load blogs");
            });
    }, []);

    return (
        <div className="p-6">

            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-4xl font-bold mb-6 text-center">All Blogs</h1>


            {error && <p className="text-red-500">{error}</p>}
                {blogs.length === 0 && !error && (
                    <p className="text-center text-gray-500 mt-10">
                        No blogs yet. Create your first one!
                    </p>
                )}

            <div className="grid gap-4">
                {blogs.map((b) => {
                    console.log("BLOG OBJECT:", b);   // debug line

                    return (
                        <div
                            key={b.id}
                            className="bg-white p-16 rounded-2xl shadow hover:shadow-lg transition"
                        >

                            <h2 className="text-2xl font-bold">{b.title}</h2>
                            <p>{b.body}</p>

                            
                            <p className="text-xl text-gray-500 italic">— {b.creator.name}</p>


                            <div className="flex gap-4 mt-4" >
                                <button
                                    onClick={() => {
                                        api.delete(`/blog/${b.id}`).then(() => {
                                            setBlogs(blogs.filter(x => x.id !== b.id));
                                        });
                                    }}
                                    className="text-lg px-3 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 transition"

                                >
                                    Delete
                                </button>

                                <button
                                    onClick={() => {
                                        window.location.href = `/edit/${b.id}`;
                                    }}
                                    className="text-lg px-3 py-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200 transition"

                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
        </div>
    );
}
