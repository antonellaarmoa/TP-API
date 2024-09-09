import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <div className="container-listas">
        <div className="inner-content">

          <ul className="nav-links">
            <li>
              <Link to="/watchlist">Watchlist</Link>
            </li>

            <li>
              <Link to="/watched">Watched</Link>
            </li>

            <li>
              <Link to="/favorites">Favorites</Link>
            </li>

           
          </ul>
        </div>
      </div>
    </header>
  );
};
