"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleLogin(e) {
    e.preventDefault();

    if (username === "admin" && password === "123") {
      document.cookie = `token=abc123; path=/;`;
      router.push("/post");
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p>{error}</p>
      </form>
    </div>
  );
}
