import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/Protected.Route";
import EditBlog from "./pages/EditBlog";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen bg-blue-50 flex flex-col">
    <Navbar />
        <div className="flex-1 overflow-y-auto">
      <Routes>
       

        <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        <Route path="/" element={
          <ProtectedRoute><Home /></ProtectedRoute>
        } />

        <Route path="/create" element={
          <ProtectedRoute><CreateBlog /></ProtectedRoute>
        } />
        <Route path="/edit/:id" element={
          <ProtectedRoute><EditBlog /></ProtectedRoute>
        } />
      </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
