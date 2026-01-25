import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="bg-black text-white px-8 py-10 flex justify-between">
            <Link to="/" className=" text-xxl font-bold text-lg font-serif">
                TwoCently
            </Link>
            <div className="text-lg flex gap-15 items-center font-semibold text-gray-300 font-serif ">
                <Link to="/create">Create</Link>
                <button onClick={logout} className=" text-lg text-red-400"  >
                    SignIn/SignOut
                </button>
            </div>
        </div>
    );
}
