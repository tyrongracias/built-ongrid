'use client';

import { useEffect, useRef, useState } from 'react';

const services = [
  {
    id: '01',
    code: 'BRAND//',
    title: 'Make the business look like a business.',
    body: 'Identity, visual direction and the design language that makes your business recognizable.',
    tags: 'IDENTITY / POSITIONING / ART DIRECTION'
  },
  {
    id: '02',
    code: 'WEB//',
    title: 'Build the digital home.',
    body: 'Fast, responsive websites and digital experiences designed to make people trust you — and take action.',
    tags: 'UX/UI / DEVELOPMENT / CMS / BUSINESS WEBSITES'
  },
  {
    id: '03',
    code: 'SEARCH//',
    title: 'Make the business discoverable.',
    body: 'The foundations that help Google understand who you are, what you do and where you operate.',
    tags: 'LOCAL SEO / GOOGLE / CONTENT STRUCTURE / ANALYTICS'
  },
  {
    id: '04',
    code: 'SOCIAL//',
    title: 'Give the brand a presence.',
    body: 'A practical visual and content system that keeps your business recognizable wherever people find it.',
    tags: 'CONTENT DIRECTION / SOCIAL / CREATIVE SYSTEMS'
  },
  {
    id: '05',
    code: 'AI//',
    title: 'Add intelligence where it matters.',
    body: 'Business-specific assistants, lead capture and useful AI experiences without adding unnecessary complexity.',
    tags: 'AI ASSISTANTS / LEADS / KNOWLEDGE / CUSTOMER EXPERIENCE'
  },
  {
    id: '06',
    code: 'LAUNCH//',
    title: 'Connect everything and ship it.',
    body: 'We bring the pieces together, get the business live and leave you with a foundation you can grow.',
    tags: 'LAUNCH / ANALYTICS / HANDOVER / GROWTH'
  },
];

const projects = [
  {
    no: '001',
    title: 'DIVVYUP & GROW',
    type: 'PROPTECH / PRODUCT / WEB',
    note: 'A premium digital investment experience for fractional property ownership.',
    accent: 'lime'
  },
  {
    no: '002',
    title: 'PROJECT//COMING',
    type: 'SPEC BUILD / BRAND / WEB',
    note: 'A fictional Goa hospitality brand built to demonstrate the ONGRID system.',
    accent: 'white'
  },
  {
    no: '003',
    title: 'PROJECT//COMING',
    type: 'SPEC BUILD / BRAND / WEB',
    note: 'A fictional modern local business built from identity through launch.',
    accent: 'white'
  },
];

/* =========================================================
   EXISTING NETWORK
   Used by the later network and CTA sections.
   ========================================================= */

function Network({ active = false }) {
  const ref = useRef(null);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const onMove = (e) => {
      const el = ref.current;

      if (!el) return;

      const r = el.getBoundingClientRect();

      setPointer({
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100
      });
    };

    window.addEventListener('pointermove', onMove);

    return () => {
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  const nodes = [
    [12, 23],
    [28, 15],
    [47, 25],
    [70, 12],
    [88, 28],
    [20, 48],
    [42, 43],
    [63, 50],
    [82, 44],
    [10, 75],
    [30, 67],
    [52, 78],
    [72, 70],
    [92, 80],
  ];

  const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [0, 5],
    [1, 6],
    [2, 6],
    [2, 7],
    [3, 7],
    [4, 8],
    [5, 6],
    [6, 7],
    [7, 8],
    [5, 9],
    [5, 10],
    [6, 10],
    [6, 11],
    [7, 11],
    [7, 12],
    [8, 12],
    [8, 13],
    [9, 10],
    [10, 11],
    [11, 12],
    [12, 13],
  ];

  return (
    <div
      ref={ref}
      className={`network ${active ? 'network--active' : ''}`}
      style={{
        '--px': `${pointer.x}%`,
        '--py': `${pointer.y}%`
      }}
      aria-hidden="true"
    >
      <div className="network__wash" />

      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
          />
        ))}
      </svg>

      {nodes.map(([x, y], i) => (
        <span
          key={i}
          className={`node node--${i % 4 === 0 ? 'signal' : 'plain'}`}
          style={{
            left: `${x}%`,
            top: `${y}%`,
            animationDelay: `${i * 120}ms`
          }}
        />
      ))}
    </div>
  );
}

/* =========================================================
   NEW HERO GRID
   Subtle grid + orange mouse-following glow.
   ========================================================= */

function HeroGrid() {
  const ref = useRef(null);

  const pointer = useRef({
    x: -1000,
    y: -1000
  });

  const target = useRef({
    x: -1000,
    y: -1000
  });

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();

      const x = e.clientX - r.left;
      const y = e.clientY - r.top;

      const inside =
        x >= 0 &&
        x <= r.width &&
        y >= 0 &&
        y <= r.height;

      if (inside) {
        target.current.x = x;
        target.current.y = y;
      } else {
        target.current.x = -1000;
        target.current.y = -1000;
      }
    };

    window.addEventListener('pointermove', onMove);

    let frame;

    const draw = () => {
      const current = pointer.current;
      const next = target.current;

      current.x += (next.x - current.x) * 0.08;
      current.y += (next.y - current.y) * 0.08;

      el.style.setProperty(
        '--mouse-x',
        `${current.x}px`
      );

      el.style.setProperty(
        '--mouse-y',
        `${current.y}px`
      );

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener(
        'pointermove',
        onMove
      );

      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className="hero-grid"
      aria-hidden="true"
    >
      <div className="hero-grid__glow" />
      <div className="hero-grid__cursor" />
    </div>
  );
}

function Arrow() {
  return <span className="arrow">↗</span>;
}

export default function Home() {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const reveal = () => {
      document
        .querySelectorAll('.reveal:not(.is-visible)')
        .forEach((el) => {
          const r = el.getBoundingClientRect();

          if (r.top < window.innerHeight * 0.88) {
            el.classList.add('is-visible');
          }
        });
    };

    reveal();

    window.addEventListener('scroll', reveal, {
      passive: true
    });

    return () => {
      window.removeEventListener('scroll', reveal);
    };
  }, []);

  return (
    <main>

      {/* =====================================================
          NAVIGATION
          ===================================================== */}

      <header className="nav">

        <a
          href="#top"
          className="brand"
          aria-label="BUILT ONGRID home"
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
            href="#work"
            onClick={() => setMenu(false)}
          >
            WORK//
          </a>

          <a
            href="#services"
            onClick={() => setMenu(false)}
          >
            SERVICES//
          </a>

          <a
            href="#process"
            onClick={() => setMenu(false)}
          >
            PROCESS//
          </a>

          <a
            href="#about"
            onClick={() => setMenu(false)}
          >
            ABOUT//
          </a>

          <a
            className="nav-cta"
            href="#start"
            onClick={() => setMenu(false)}
          >
            START//
          </a>
        </nav>
      </header>


      {/* =====================================================
          HERO
          ===================================================== */}

      <section
        id="top"
        className="hero"
      >

        {/* NEW HERO BACKGROUND */}
        <HeroGrid />

        <div className="hero__meta">
          <span>CREATIVE DIGITAL STUDIO</span>
          <span>INDIA / GLOBAL</span>
          <span>BUILD//001</span>
        </div>

        <div className="hero__content">

          <p className="eyebrow">
            BRAND / WEB / SEARCH / SOCIAL / AI / LAUNCH
          </p>

          <h1>
            WE BUILD
            <br />

            <span>
              BUSINESSES.
            </span>

            <br />

            WE PUT THEM
            <br />

            <em>
              ONGRID.
            </em>
          </h1>

          <div className="hero__bottom">

            <p>
              We build the digital presence modern businesses
              need to get seen, trusted and connected.
            </p>

            <a
              className="button"
              href="#start"
            >
              START A PROJECT <Arrow />
            </a>

          </div>
        </div>

        <div className="scroll-mark">
          SCROLL TO CONNECT <span>↓</span>
        </div>

      </section>


      {/* =====================================================
          STATEMENT
          ===================================================== */}

      <section
        className="statement section-dark reveal"
      >

        <div className="section-index">
          01 / THE INTERNET CHANGED
        </div>

        <div className="statement__grid">

          <h2>
            HAVING A
            <br />
            BUSINESS
            <br />
            ISN'T ENOUGH
            <br />
            ANYMORE.
          </h2>

          <div className="statement__copy">

            <p>
              Your customers are already online.
              They're searching. Comparing. Scrolling.
              Asking AI. Checking reviews. Looking at
              your website.
            </p>

            <p>
              <strong>
                Your business needs to be there —
                and it needs to look like it belongs there.
              </strong>
            </p>

            <div className="signal-line">
              <span />
              THAT'S WHERE WE COME IN.
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          SERVICES
          ===================================================== */}

      <section
        id="services"
        className="services section-light reveal"
      >

        <div className="section-index">
          02 / THE BUILD
        </div>

        <div className="section-heading">

          <h2>
            FROM BUSINESS
            <br />

            <span>
              TO DIGITAL BUSINESS.
            </span>
          </h2>

          <p>
            One studio. The pieces your business
            needs to get connected.
          </p>

        </div>

        <div className="service-list">

          {services.map((s) => (
            <article
              className="service"
              key={s.id}
            >

              <div className="service__number">
                {s.id}
              </div>

              <div className="service__code">
                {s.code}
              </div>

              <h3>
                {s.title}
              </h3>

              <p>
                {s.body}
              </p>

              <small>
                {s.tags}
              </small>

              <span className="service__arrow">
                ↗
              </span>

            </article>
          ))}

        </div>
      </section>


      {/* =====================================================
          EVERYTHING CONNECTS
          ===================================================== */}

      <section
        className="network-section section-dark reveal"
      >

        <Network />

        <div className="section-index">
          03 / EVERYTHING CONNECTS
        </div>

        <div className="network-copy">

          <h2>
            YOUR BUSINESS
            <br />
            IS A <em>NETWORK.</em>
          </h2>

          <p>
            Your brand affects your website.
            Your website affects search.
            Social affects trust.
            Systems affect speed.
            Data tells you what works.
          </p>

          <p>
            <strong>
              None of it exists in isolation.
            </strong>
          </p>

          <div className="network-words">

            <span>BRAND//</span>
            <span>WEB//</span>
            <span>SEARCH//</span>
            <span>SOCIAL//</span>
            <span>AI//</span>
            <span>DATA//</span>

          </div>

        </div>

        <div className="network-final">
          GET CONNECTED <Arrow />
        </div>

      </section>


      {/* =====================================================
          WORK
          ===================================================== */}

      <section
        id="work"
        className="work section-light reveal"
      >

        <div className="section-index">
          04 / SELECTED BUILDS
        </div>

        <div className="section-heading">

          <h2>
            BUILT//
            <br />

            <span>
              IN THE REAL WORLD.
            </span>
          </h2>

          <p>
            A growing collection of client work
            and studio-built experiments.
          </p>

        </div>

        <div className="projects">

          {projects.map((p, i) => (

            <article
              className={`project ${
                p.accent === 'lime'
                  ? 'project--lime'
                  : ''
              }`}
              key={p.no}
            >

              <div className="project__visual">

                <div className="project__visual-grid" />

                <div className="project__visual-word">
                  {i === 0 ? 'D/G' : 'BUILD'}
                </div>

                <div className="project__visual-meta">
                  PROJECT//{p.no}
                  <br />
                  {p.type}
                </div>

              </div>

              <div className="project__info">

                <div>

                  <span>
                    PROJECT//{p.no}
                  </span>

                  <h3>
                    {p.title}
                  </h3>

                  <p>
                    {p.note}
                  </p>

                </div>

                <span className="project__link">
                  VIEW PROJECT <Arrow />
                </span>

              </div>

            </article>

          ))}

        </div>
      </section>


      {/* =====================================================
          PROCESS
          ===================================================== */}

      <section
        id="process"
        className="process section-dark reveal"
      >

        <div className="section-index">
          05 / HOW WE BUILD
        </div>

        <div className="section-heading">

          <h2>
            NO
            <br />

            <em>
              BLACK BOX.
            </em>
          </h2>

          <p>
            You know what we're doing, why we're
            doing it and what happens next.
          </p>

        </div>

        <div className="process-grid">

          {[
            'DISCOVER//',
            'DEFINE//',
            'DESIGN//',
            'BUILD//',
            'CONNECT//',
            'LAUNCH//'
          ].map((x, i) => (

            <div
              className="process-step"
              key={x}
            >

              <span>
                0{i + 1}
              </span>

              <h3>
                {x}
              </h3>

              <p>
                {[
                  'Understand the business, audience and problem.',
                  'Positioning, structure, content and direction.',
                  'Identity, interfaces, interactions and systems.',
                  'Turn the design into something fast and real.',
                  'Search, social, analytics and useful digital tools.',
                  'Ship it. Measure it. Improve it.'
                ][i]}
              </p>

            </div>

          ))}

        </div>
      </section>


      {/* =====================================================
          MANIFESTO
          ===================================================== */}

      <section
        id="about"
        className="manifesto section-light reveal"
      >

        <div className="section-index">
          06 / THE MANIFESTO
        </div>

        <div className="manifesto__headline">
          WE DON'T BUILD
          <br />
          WEBSITES FOR
          <br />
          WEBSITES' SAKE.
        </div>

        <div className="manifesto__body">

          <p>
            We build digital businesses.
          </p>

          <p>
            No templates pretending to be strategy.
            No websites that look impressive and do nothing.
            No brands that disappear into the feed.
          </p>

          <p>
            <strong>
              Just good ideas, built properly.
            </strong>
          </p>

        </div>

      </section>


      {/* =====================================================
          ABOUT
          ===================================================== */}

      <section
        className="about section-dark reveal"
      >

        <div className="section-index">
          07 / WHO WE ARE
        </div>

        <div className="about__grid">

          <h2>
            SMALL STUDIO.
            <br />

            <em>
              BIG DIGITAL ENERGY.
            </em>
          </h2>

          <div>

            <p>
              BUILT// ONGRID is an independent creative
              digital studio building brands, websites
              and connected digital experiences for
              modern businesses.
            </p>

            <p>
              We sit somewhere between design, technology
              and business — because that's where the
              interesting problems are.
            </p>

            <p>
              <strong>
                We work with businesses that want more
                than a website. They want to be taken
                seriously online.
              </strong>
            </p>

            <div className="about__tags">
              INDEPENDENT / DESIGN-LED / TECHNOLOGY-DRIVEN
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          START
          ===================================================== */}

      <section
        id="start"
        className="start reveal"
      >

        <div className="start__network">
          <Network active />
        </div>

        <div className="section-index">
          08 / START SOMETHING
        </div>

        <div className="start__content">

          <h2>
            WHAT ARE
            <br />
            YOU <em>BUILDING?</em>
          </h2>

          <p>
            Tell us where you're starting.
            We'll figure out where to take it.
          </p>

          <a
            className="button button--light"
            href="mailto:builtongrid@gmail.com?subject=START//%20Project%20Enquiry"
          >
            START A PROJECT <Arrow />
          </a>

          <div className="contact">
            +91 8766071665
            <br />

            <span>
              builtongrid@gmail.com
            </span>
          </div>

        </div>
      </section>


      {/* =====================================================
          FOOTER
          ===================================================== */}

      <footer className="footer">

        <div className="footer-brand">

          <span className="brand__line">
            BUILT<span className="brand__slashes">//</span>
          </span>

          <span className="brand__line">
            ONGRID
          </span>

        </div>

        <p>
          Built for the networked world.
        </p>

        <div className="footer-links">

          <a href="#work">
            WORK//
          </a>

          <a href="#services">
            SERVICES//
          </a>

          <a href="#start">
            START//
          </a>

        </div>

        <div className="footer-bottom">

          <span>
            © 2026 BUILT// ONGRID
          </span>

          <span>
            INDIA / GLOBAL
          </span>

        </div>

      </footer>

    </main>
  );
}
