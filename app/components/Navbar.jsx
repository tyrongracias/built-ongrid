'use client';

import { useState } from 'react';

export default function Navbar() {
  const [menu, setMenu] = useState(false);

  return (
    <header className="nav">

      <a
        href="/"
        className="brand"
        aria-label="BUILT ONGRID home"
        onClick={() => setMenu(false)}
      >
        <span className="brand__line">
          BUILT<span className="brand__slashes">//</span>
        </span>

        <span className="brand__line">
          ONGRID
        </span>
      </a>

      <button
        className="menu-btn"
        onClick={() => setMenu(!menu)}
        aria-expanded={menu}
      >
        {menu ? 'CLOSE//' : 'MENU//'}
      </button>

      <nav
        className={`navlinks ${
          menu ? 'navlinks--open' : ''
        }`}
      >

        <a
          href="/#work"
          onClick={() => setMenu(false)}
        >
          WORK//
        </a>

        <a
          href="/#services"
          onClick={() => setMenu(false)}
        >
          SERVICES//
        </a>

        <a
          href="/#process"
          onClick={() => setMenu(false)}
        >
          PROCESS//
        </a>

        <a
          href="/#about"
          onClick={() => setMenu(false)}
        >
          ABOUT//
        </a>

        <a
          className="nav-cta"
          href="/#start"
          onClick={() => setMenu(false)}
        >
          START//
        </a>

      </nav>

    </header>
  );
}
