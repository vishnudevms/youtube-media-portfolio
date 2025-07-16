import React, { useEffect, useState } from "react";
import "../Home.css";
import "./Admin.css";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";

const EpisodesList = () => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    const res = await fetch("http://localhost:5000/api/episodes");
    const data = await res.json();
    setEpisodes(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/episodes/${id}`, { method: "DELETE" });
    fetchEpisodes();
  };

  return (
    <div className="admin-background">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li>
              <Link to="/admin" style={{ color: "#17cb57", textDecoration: "none" }}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/episodes" style={{ color: "#17cb57", textDecoration: "none" }}>
                Episodes
              </Link>
            </li>
            <li>Users</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>
      <main className="admin-main" style={{ padding: "48px", color: "#fff" }}>
        <h2 style={{ color: "#17cb57" }}>All Episodes</h2>
        <ul style={{ marginTop: "24px", fontSize: "1.1em", listStyle: "none", padding: 0 }}>
  {episodes.length === 0 && <li className="episode-li-box">No episodes yet.</li>}
  {episodes.map((ep, idx) => (
    <li
      key={ep._id}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "18px",
        marginBottom: "18px"
      }}
    >
      <div className="episode-li-box" style={{ flex: 1, margin: 0 }}>
        <strong>{ep.title}</strong>
        <br />
        <span style={{ color: "#aaa" }}>{ep.youtubeUrl}</span>
      </div>
      <a href="/admin/episodes" className="deletebtn"
        onClick={() => handleDelete(ep._id)}><MdDeleteForever />
      </a>
    </li>
  ))}
</ul>
      </main>
    </div>
  );
};

export default EpisodesList;