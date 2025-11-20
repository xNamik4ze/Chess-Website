import React from "react";
import { Link } from "react-router-dom";

interface Video {
  title: string;
  img: string;
  link: string;
  alt: string;
}

const videos: Video[] = [
  {
    title: "Introduction to Chess",
    img: "/images/video1.jpg",
    link: "https://youtu.be/6Pqd7UFWr7M?si=0uzZGDWOr7H1J7Vw",
    alt: "Introduction to Chess",
  },
  {
    title: "Opening Strategies",
    img: "/images/video2.png",
    link: "https://youtu.be/Ib8XaRKCAfo?si=DSIZXajEeauXpI5D",
    alt: "Opening Strategies",
  },
  {
    title: "Pawn Structures",
    img: "/images/video3.jpg",
    link: "https://youtu.be/yAnNQY2Ac6w?si=aGKLp4pYdp03lh-t",
    alt: "Pawn Structures",
  },
  {
    title: "10 Ways To Use Your Knights Effectively",
    img: "/images/video4.jpg",
    link: "https://youtu.be/ilWQpdevLvI?si=43IMa7H-8xr4-hCN",
    alt: "10 Ways To Use Your Knights Effectively",
  },
  {
    title: "Bishop Pair Advantage",
    img: "/images/video5.jpg",
    link: "https://youtu.be/1jf69INEj0c?si=1y39zBLKaVn8oz3s",
    alt: "Bishop Pair Advantage",
  },
  {
    title: "Rook Endgames",
    img: "/images/video6.jpg",
    link: "https://youtu.be/7lgb7lcD5TE?si=cx1ft4gEQxuBzyMX",
    alt: "Rook Endgames",
  },
  {
    title: "Queen Maneuvers",
    img: "/images/video7.jpg",
    link: "https://youtu.be/cY9zitJFglc?si=RUFVJvghdf4oriHN",
    alt: "Queen Maneuvers",
  },
  {
    title: "King Safety",
    img: "/images/video8.jpg",
    link: "https://youtu.be/FyvJMCDeeT4?si=q_2ZLUTN2huxa5f_",
    alt: "King Safety",
  },
  {
    title: "6 Checkmate Patterns YOU MUST KNOW",
    img: "/images/video9.jpg",
    link: "https://youtu.be/iBZLU1FXhcI?si=sy8wCS8nml9RyVzr",
    alt: "6 Checkmate Patterns YOU MUST KNOW",
  },
  {
    title: "3 Tips to Avoid STALEMATE in Chess",
    img: "/images/video10.jpg",
    link: "https://youtu.be/kbC3T3lNG0s?si=BteNzvT8xkCDgSXL",
    alt: "3 Tips to Avoid STALEMATE in Chess",
  },
];

const WatchPage: React.FC = () => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: 0,
        padding: "20px 20px 20px 70px",
        backgroundColor: "#3f3e3c",
        color: "#333",
        backgroundImage: "url('/images/chess-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 style={{ color: "aliceblue", textAlign: "center", fontSize: "5ch" }}>
        <strong>Some tips to get better at chess</strong>
      </h1>

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

      <div className="container">
        {/* Main Thumbnail */}
        {videos.slice(0, 1).map((video) => (
          <div className="main-thumbnail" key={video.title}>
            <a href={video.link} target="_blank" rel="noopener noreferrer">
              <div className="frame">
                <img src={video.img} alt={video.alt} />
                <span className="title">{video.title}</span>
              </div>
            </a>
          </div>
        ))}

        {/* Video Grid */}
        <div className="thumbnail-grid">
          {videos.slice(1).map((video) => (
            <div className="thumbnail" key={video.title}>
              <a href={video.link} target="_blank" rel="noopener noreferrer">
                <div className="frame">
                  <img src={video.img} alt={video.alt} />
                  <span className="title">{video.title}</span>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* More tips link */}
        <div style={{ paddingTop: "3ch" }} className="main-thumbnail">
          <div className="frame">
            <a
              href="https://www.chess.com/watch"
              className="title"
              style={{ fontSize: "3ch" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Click here for more tips :&gt;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
