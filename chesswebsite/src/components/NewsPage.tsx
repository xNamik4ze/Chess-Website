import React from "react";
import "../styles/NewsPage.css";
import Sidebar from "./Sidebar";

const NewsPage: React.FC = () => {
  return (
    <div className="news-page">
      {/* Sidebar */}
      <Sidebar />

      {/* Header */}
      <div className="main-thumbnail">
        <div className="frame">
          <h1 style={{ color: "#1d1d1d" }}>NEWS</h1>
        </div>
      </div>

      {/* Main content */}
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
      <div className="news-grid">
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
        <div className="main-thumbnail more-news">
          <div className="frame">
            <a href="https://www.chess.com/news" target="_blank" rel="noopener noreferrer" className="title">
              More news
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
