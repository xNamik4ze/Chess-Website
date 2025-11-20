    import React from "react";
    import { Link } from "react-router-dom";

    const NewsPage: React.FC = () => {
    return (
        <>
        {/* Nhúng CSS trực tiếp vào TSX */}
        <style>{`
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px 20px 20px 70px;
                background-color: #d9d7d2;
                color: #333;
                background-image: url('images/chess-bg.jpg');
                background-size: cover;
                background-position: center;
            }
            .container {
                max-width: 1200px;
                margin: 0 auto;
            }
            h1 {
                color: aliceblue;
                text-align: center;
                font-size: 5ch;
                margin-bottom: 40px;
            }
            .main-thumbnail {
                margin-bottom: 40px;
                text-align: center;
            }
            .main-thumbnail .frame {
                border: 2px solid #ccc;
                border-radius: 8px;
                padding: 20px;
                background: white;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                max-width: 800px;
                margin: 0 auto;
            }
            .main-thumbnail img {
                width: 100%;
                max-width: 800px;
                height: auto;
                border-radius: 8px;
                object-fit: cover;
            }
            .main-thumbnail .title {
                font-size: 28px;
                margin: 0 0 10px;
                color: #2c3e50;
                text-decoration: none;
            }
            .main-thumbnail .title:hover {
                color: #007bff;
            }
            .main-thumbnail .author {
                font-size: 14px;
                color: #666;
                margin-bottom: 10px;
            }
            .main-thumbnail .summary {
                font-size: 16px;
                line-height: 1.5;
                color: #555;
            }
            .thumbnail-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
            }
            .thumbnail {
                text-align: center;
            }
            .thumbnail .frame {
                border: 2px solid #ccc;
                border-radius: 8px;
                padding: 15px;
                background: white;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                display: flex;
                flex-direction: column;
                align-items: center;
                transition: transform 0.2s;
            }
            .thumbnail .frame:hover {
                transform: translateY(-5px);
            }
            .thumbnail img {
                width: 100%;
                max-width: 300px;
                height: 169px;
                object-fit: cover;
                border-radius: 8px;
            }
            .thumbnail .title {
                font-size: 18px;
                margin: 10px 0;
                color: #2c3e50;
                text-decoration: none;
            }
            .thumbnail .title:hover {
                color: #007bff;
            }
            .thumbnail .author {
                font-size: 12px;
                color: #666;
                margin-bottom: 10px;
            }
            .thumbnail .summary {
                font-size: 14px;
                line-height: 1.5;
                color: #555;
            }
            .more-tips {
                text-align: center;
                margin-top: 40px;
            }
            .more-tips .frame {
                border: 2px solid #ccc;
                border-radius: 8px;
                padding: 20px;
                background: white;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                max-width: 800px;
                margin: 0 auto;
            }
            .more-tips .title {
                font-size: 28px;
                color: #2c3e50;
                text-decoration: none;
            }
            .more-tips .title:hover {
                color: #007bff;
            }
            .sidebar {
                position: fixed;
                top: 0;
                left: 0;
                width: 50px;
                height: 100vh;
                background-color: #32ef4bdf;
                color: #ffffff;
                display: flex;
                flex-direction: column;
                align-items: start;
                padding: 15px;
                box-shadow: 2px 0 10px rgba(0,0,0,0.3);
                border-radius: 0 10px 10px 0;
                transition: width 0.3s ease;
                overflow-x: hidden;
                z-index: 1000;
            }
            .sidebar:hover, .sidebar.active {
                width: 240px;
            }
            .logo {
                font-size: 0px;
                font-weight: bold;
                margin-bottom: 20px;
                white-space: nowrap;
                transition: font-size 0.3s ease, opacity 0.3s ease;
                opacity: 0;
            }
            .sidebar:hover .logo, .sidebar.active .logo {
                font-size: 36px;
                opacity: 1;
            }
            .nav-links {
                list-style: none;
                padding: 0;
                width: 100%;
            }
            .nav-links li {
                display: flex;
                align-items: center;
                margin-bottom: 15px;
                cursor: pointer;
                transition: 0.2s;
                font-size: 24px;
                padding: 10px 0;
                white-space: nowrap;
                overflow: hidden;
            }
            .nav-links li:hover {
                background: rgba(255,255,255,0.1);
                border-radius: 5px;
            }
            .nav-links .icon {
                font-size: 28px;
                margin-right: 10px;
            }
            .nav-links .text {
                opacity: 0;
                visibility: hidden;
                margin-left: 10px;
                transition: opacity 0.3s ease;
            }
            .sidebar:hover .nav-links .text, .sidebar.active .nav-links .text {
                opacity: 1;
                visibility: visible;
            }
            .nav-links a {
                text-decoration: none;
                color: inherit;
                display: flex;
                align-items: center;
                width: 100%;
                padding: 10px 0;
            }
            @media (max-width: 768px) {
                .thumbnail-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                .thumbnail img {
                    max-width: 100%;
                    height: 150px;
                }
                body {
                    padding-left: 60px;
                }
            }
            @media (max-width: 480px) {
                .thumbnail-grid {
                    grid-template-columns: 1fr;
                }
                .thumbnail img {
                    max-width: 100%;
                    height: 169px;
                }
            }
            a {
                text-decoration: none;
            }
        `}</style>

        <div>
            {/* Header */}
            <div className="main-thumbnail">
            <div className="frame">
                <h1>NEWS</h1>
            </div>
            </div>

            {/* Sidebar */}
            <nav className="sidebar">
            <Link to="/">
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
            {/* Main news */}
            <div className="main-thumbnail">
            <a
            href="https://www.chess.com/news/view/nihal-nakamura-win-titled-tuesday-july-8-2025"
            target="_blank"
            rel="noopener noreferrer"
            >
            <div className="frame">
            <img src="/images/news1.png" alt="News 1" />
            <span className="title">
              Nakamura Resets Own Rating Record With Big Tuesday
            </span>
            <div className="author">By Nathaniel Green</div>
            <p className="summary">
              GM Nihal Sarin and GM Hikaru Nakamura are your winners for the July 8 editions of Titled Tuesday.
              Nakamura also finished third in the early tournament, and after he started out 8/8 in the late event, his 3416 Chess.com Blitz rating had set a new...
            </p>
            </div>
            </a>
            </div>

            {/* Other news grid */}
            <div className="container">
              <div className="thumbnail">
                <a href="https://www.chess.com/news/view/international-chess-day-portals-celebration" target="_blank" rel="noopener noreferrer">
                  <div className="frame">
                    <img src="/images/news2.png" alt="News 2" />
                    <span className="title">Chess.com And Portals Connect 4 Countries In Event Celebrating...</span>
                    <div className="author">By CHESScom</div>
                    <p className="summary">Chess.com is excited to announce our newest ...</p>
                  </div>
                </a>
              </div>
            <div className="thumbnail">
                <a href="https://www.chess.com/news/view/praggnanandaa-joins-carlsen-caruana-team-liquid" target="_blank" rel="noopener noreferrer">
                  <div className="frame">
                    <img src="/images/news3.jpg" alt="News 3" />
                    <span className="title">Praggnanandhaa Joins Carlsen, Caruana As Team Liquid Builds Chess...</span>
                    <div className="author">By Alex Brown</div>
                    <p className="summary">Understand how pawn formations shape your strategy.</p>
                  </div>
                </a>
            </div>
            <div className="thumbnail">
                <a href="https://www.chess.com/news/view/2025-fide-womens-world-cup-round-1-tiebreaks" target="_blank" rel="noopener noreferrer">
                  <div className="frame">
                    <img src="/images/news4.png" alt="News 4" />
                    <span className="title">Dark Horse Priyanka Eliminates Hungary's No. 1</span>
                    <div className="author">By Emily White</div>
                    <p className="summary">Master knight tactics to control the board.</p>
                  </div>
                </a>
            </div>
            <div className="thumbnail">
                <a href="https://www.chess.com/news/view/le-wins-2025-leon-masters-anand-oro" target="_blank" rel="noopener noreferrer">
                  <div className="frame">
                    <img src="/images/news5.png" alt="News 5" />
                    <span className="title">Le Wins Leon Masters; Oro Impresses Vs. Anand</span>
                    <div className="author">By Michael Green</div>
                    <p className="summary">Learn the power of controlling two bishops.</p>
                  </div>
                </a>
            </div>
            <div className="thumbnail">
                <a href="https://www.chess.com/news/view/2025-fide-womens-world-cup-round-1-game-2" target="_blank" rel="noopener noreferrer">
                  <div className="frame">
                    <img src="/images/news6.png" alt="News 6" />
                    <span className="title">11 Matches Go To Tiebreaks</span>
                    <div className="author">By Sarah Black</div>
                    <p className="summary">Techniques for winning rook endgames.</p>
                </div>
                </a>
            </div>
            <div className="thumbnail">
                <a href="https://www.chess.com/news/view/announcing-kids-vs-stars-5" target="_blank" rel="noopener noreferrer">
                  <div className="frame">
                    <img src="/images/news7.png" alt="News 7" />
                    <span className="title">Star David Howell To Face Four Young Prodigies Simultaneously In Next Kids</span>
                    <div className="author">By David Lee</div>
                    <p className="summary">Maximize the queen's potential in your games.</p>
                  </div>
                </a>
            </div>
            <div className="thumbnail">
                <a href="https://www.chess.com/news/view/carlsen-wins-2025-superunited-croatia-rapid-blitz" target="_blank" rel="noopener noreferrer">
                  <div className="frame">
                    <img src="/images/news8.png" alt="News 8" />
                    <span className="title">'B-Game' Enough As Magnus Carlsen Wins Croatia Rapid & Blitz</span>
                    <div className="author">By Laura Blue</div>
                    <p className="summary">Protect your king with these essential tips.</p>
                  </div>
                </a>
            </div>
            <div className="thumbnail">
                <a href="https://www.chess.com/news/view/2025-fide-womens-world-cup-day-1" target="_blank" rel="noopener noreferrer">
                  <div className="frame">
                    <img src="/images/news9.png" alt="News 9" />
                    <span className="title">9-Year-Old Ashwath Kaushik Sensationally Scores First IM Norm In...</span>
                    <div className="author">By Tom Gray</div>
                    <p className="summary">Learn critical checkmate patterns to win games.</p>
                  </div>
                </a>
            </div>
            <div className="thumbnail">
                <a href="https://www.chess.com/news/view/9-year-old-ashwath-kaushik-scores-first-im-norm" target="_blank" rel="noopener noreferrer">
                  <div className="frame">
                    <img src="/images/news10.jpg" alt="News 10" />
                    <span className="title">Nakamura Defeats 38 GMs In Two-Hour Bullet Brawl Arena</span>
                    <div className="author">By Anna Red</div>
                    <p className="summary">Avoid stalemates with these practical strategies.</p>
                  </div>
                </a>
            </div>
        </div>

  {/* More news link */}
  <div className="main-thumbnail" style={{ paddingTop: "3ch" }}>
    <div className="frame">
      <a href="https://www.chess.com/news" target="_blank" rel="noopener noreferrer" className="title" style={{ fontSize: "3ch" }}>
        More news
      </a>
    </div>
  </div>
</div>

        </div>
        </>
    );
    };

    export default NewsPage;
