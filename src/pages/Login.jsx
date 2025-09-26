import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pushDataLayer } from '../utils/datalayer';

function LoginPage({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    pushDataLayer({
      event: 'pageView',
      page: { name: 'Login', path: '/login' }
    });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Fake login logic
    const userData = {
      email,
      name: "Demo User",
    };

    // Save user to sessionStorage
    sessionStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    // 🔹 Push login event to dataLayer
    pushDataLayer({ event: 'login', page: { name: "Login" }, user: userData });

    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
