import React, { useState } from "react";
import "../Home.css";
import "./Admin.css";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleEpisodeSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch("http://localhost:5000/api/episodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, youtubeUrl }),
      });
      if (response.ok) {
        setMessage("Episode submitted!");
        setTitle("");
        setYoutubeUrl("");
      } else {
        setMessage("Failed to submit episode.");
      }
    } catch (err) {
      setMessage("Error connecting to backend.");
    }
  };

  return (
    <div className="admin-background">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li><Link to="/admin/episodes" style={{ color: "#17cb57", textDecoration: "none" }}>
                Episodes
                </Link></li>
            <li>Users</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>
      <main className="admin-main">
        <h1>Welcome, Admin!</h1>
        <div className="admin-upload-episode" style={{
          marginTop: "40px",
          background: "#181818",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          maxWidth: "600px",
          width: "100%"
        }}>
          <h2 style={{ color: "#17cb57" }}>Upload New Episode</h2>
          <form onSubmit={handleEpisodeSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <label style={{ color: "#fff" }}>
              Episode Title:
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "6px",
                  borderRadius: "6px",
                  border: "1px solid #333",
                  background: "#222",
                  color: "#fff"
                }}
              />
            </label>
            <label style={{ color: "#fff" }}>
              YouTube Video URL:
              <input
                type="url"
                value={youtubeUrl}
                onChange={e => setYoutubeUrl(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "6px",
                  borderRadius: "6px",
                  border: "1px solid #333",
                  background: "#222",
                  color: "#fff"
                }}
              />
            </label>
            <button
              type="submit"
              style={{
                background: "#17cb57",
                color: "#000",
                border: "none",
                borderRadius: "8px",
                padding: "12px 0",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              Upload Episode
            </button>
            {message && <div style={{ color: "#17cb57", marginTop: "10px" }}>{message}</div>}
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;