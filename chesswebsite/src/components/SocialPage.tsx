import React from "react";
import { Link } from "react-router-dom";

const SocialPage: React.FC = () => {
  const socialProfiles = [
    {
      title: "Magnus Carlsen",
      author: "Facebook • YouTube • Instagram",
      img: "/images/magnus.jpg",
      link: "https://www.facebook.com/MagnusCarlsen/",
      summary: "Follow the 5-time World Champion and chess icon Magnus Carlsen across platforms.",
    },
    {
      title: "GothamChess (Levy Rozman)",
      author: "Instagram",
      img: "/images/gotham.jpg",
      link: "https://www.instagram.com/gothamchess/",
      summary: "Popular chess streamer and educator. 2M+ followers.",
    },
    {
      title: "Hikaru Nakamura",
      author: "Instagram",
      img: "/images/hikaru.jpg",
      link: "https://www.instagram.com/hikaru/",
      summary: "5-time U.S. Champion and top Twitch chess streamer.",
    },
    {
      title: "Alireza Firouzja",
      author: "Instagram",
      img: "/images/alireza.jpg",
      link: "https://www.instagram.com/alireza.chess/",
      summary: "Rising chess prodigy and World Championship contender.",
    },
    {
      title: "R. Praggnanandhaa",
      author: "Instagram",
      img: "/images/pragg.jpg",
      link: "https://www.instagram.com/pragg_chess/",
      summary: "Indian Grandmaster with a bright future.",
    },
    {
      title: "Andrea Botez",
      author: "Instagram",
      img: "/images/andrea.jpg",
      link: "https://www.instagram.com/andreachess/",
      summary: "Popular chess content creator from the Botez sisters duo.",
    },
    {
      title: "Alexandra Botez",
      author: "Instagram",
      img: "/images/alex.jpg",
      link: "https://www.instagram.com/botezlive/",
      summary: "Content creator, streamer, and chess influencer.",
    },
    {
      title: "Chess.com Official",
      author: "Instagram",
      img: "/images/chesscom.jpg",
      link: "https://www.instagram.com/chesscom/",
      summary: "Official page of the world's biggest chess platform.",
    },
    {
      title: "Anish Giri",
      author: "Instagram",
      img: "/images/giri.jpg",
      link: "https://www.instagram.com/anishgiri/",
      summary: "Grandmaster and witty chess commentator from the Netherlands.",
    },
    {
      title: "Chess24 Official",
      author: "YouTube",
      img: "/images/chess24.jpg",
      link: "https://www.youtube.com/@chess24/",
      summary: "Top-level chess tournaments and analysis.",
    },
  ];

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: 0,
        padding: "20px 20px 20px 70px",
        backgroundColor: "#d9d7d2",
        color: "#333",
        backgroundImage: "url('/images/chess-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <div style={{ paddingTop: "3ch" }} className="main-thumbnail">
        <div className="frame">
          <h1 style={{ color: "black" }}>SOCIAL</h1>
        </div>
      </div>

      {/* Sidebar */}
      <nav className="sidebar">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="logo">CHESSENA</div>
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/chess">
              <span className="icon">🎮</span>
              <span className="text">Play</span>
            </Link>
          </li>
          <li>
            <Link to="/puzzle">
              <span className="icon">🧩</span>
              <span className="text">Puzzles</span>
            </Link>
          </li>
          <li>
            <Link to="/learn">
              <span className="icon">📚</span>
              <span className="text">Learn</span>
            </Link>
          </li>
          <li>
            <Link to="/watch">
              <span className="icon">🎥</span>
              <span className="text">Watch</span>
            </Link>
          </li>
          <li>
            <Link to="/news">
              <span className="icon">📰</span>
              <span className="text">News</span>
            </Link>
          </li>
          <li>
            <Link to="/social">
              <span className="icon">👥</span>
              <span className="text">Social</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <div className="container">
        <div className="thumbnail-grid">
          {socialProfiles.map((profile, index) => (
            <div className="thumbnail" key={index}>
              <a href={profile.link} target="_blank" rel="noopener noreferrer">
                <div className="frame">
                  <img src={profile.img} alt={profile.title} />
                  <span className="title">{profile.title}</span>
                  <div className="author">{profile.author}</div>
                  <p className="summary">{profile.summary}</p>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* More */}
        <div style={{ paddingTop: "3ch" }} className="main-thumbnail">
          <div className="frame">
            <a
              href="https://www.instagram.com/explore/tags/chess/"
              className="title"
              style={{ fontSize: "3ch" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              More on Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialPage;
