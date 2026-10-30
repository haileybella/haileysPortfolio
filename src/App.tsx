import { useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { assets, projects, events, socials, stampImages, images } from "./data";
import Story from "./Story";
import Carousel from "./Carousel";
function Footer() {
  return (
    <footer className="container footer">
      <Link to="/">Hailey Muñiz</Link>
      <div>
        {socials.map(([n, u]) => (
          <a key={n} href={u} target="_blank" rel="noreferrer">
            {n}
          </a>
        ))}
      </div>
    </footer>
  );
}
const navigation = [
  ["HAILEY", "/"],
  ["ABOUT ME", "/about"],
  ["PROJECTS", "/projects"],
  ["RESEARCH", "/research"],
  ["EVENTS", "/events"],
  ["CONTACT", "/contact"],
];
function Nav() {
  const { pathname } = useLocation();
  const index = Math.max(
    0,
    navigation.findIndex(([, path]) =>
      path === "/"
        ? pathname === "/"
        : pathname === path || pathname.startsWith(path + "/")
    )
  );
  const widths = [125, 122, 124, 123, 106, 111, 108];
  const left =
    (widths.slice(0, index).reduce((sum, width) => sum + width, 0) / 819) * 100;
  return (
    <header className="nav-shell">
      <nav aria-label="Main navigation">
        <span
          className="nav-slider"
          aria-hidden="true"
          style={{ transform: `translateX(${left}%)` }}
        >
          <span
            className="nav-pill"
            style={{ width: `${(widths[index] / 819) * 100}%` }}
          />
        </span>
        {navigation.map(([label, to], i) => (
          <Link
            data-label={label}
            className={index === i ? "active" : ""}
            aria-current={index === i ? "page" : undefined}
            key={label}
            to={to}
          >
            <span>{label}</span>
          </Link>
        ))}
        <a
          href="/HaileysResume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          title="View my résumé (opens in a new tab)"
        >
          <span>RESUME</span>
        </a>
      </nav>
    </header>
  );
}
function Hero() {
  return (
    <section id="home" className="hero" aria-label="Hailey Muñiz’s portfolio">
      <h1 className="sr-only">
        Hailey Muñiz — designer, researcher, and computer science student
      </h1>
      <div className="hero-art">
        <Link
          className="object folder folder-main"
          to="/about"
          aria-label="Get to know Hailey"
        >
          <img src={assets.home.imgResearchFolder} alt="" />
        </Link>
        <Link className="object folder folder-research" to="/research">
          <img src={assets.home.imgResearchFolder} alt="" />
          <span>research</span>
        </Link>
        <Link className="object folder folder-projects" to="/projects">
          <img src={assets.home.imgResearchFolder} alt="" />
          <span>projects</span>
        </Link>
        <img
          className="hero-title"
          src={assets.home.imgImage13}
          alt="Hailey’s portfolio"
        />
        <a
          className="object figma-icon"
          href={socials[0][1]}
          target="_blank"
          rel="noreferrer"
          aria-label="Hailey on Figma"
        >
          <img src={assets.home.imgFigmaIcon} alt="" />
        </a>
        <div className="object laptop">
          <img src="/assets/home-macbook-cropped.png" alt="" draggable={false} />
        </div>
        <div className="object glasses">
          <img src="/assets/home-rayban-cropped.png" alt="" draggable={false} />
        </div>
        <div className="object headphones">
          <img src={assets.home.imgImage19} alt="" />
        </div>
        <Link
          className="object safari"
          to="/events"
          aria-label="Explore my event postcards"
        >
          <img src={assets.home.imgImage15} alt="" />
        </Link>
        <p className="hero-caption">Open a folder. Get to know me.</p>
      </div>
      <Link className="mobile-intro" to="/about">
        Get to know me
      </Link>
    </section>
  );
}
function About() {
  return (
    <section id="about" className="container about">
      <img
        className="portrait"
        src={Object.values(assets.about)[0]}
        alt="Hailey Muñiz"
        loading="lazy"
      />
      <div>
        <p className="eyebrow blue">HELLO, I’M HAILEY MUÑIZ</p>
        <h2>Always making something.</h2>
        <p>
          I’m a computer science student at UT San Antonio, a Terry Scholar, and
          an undergraduate researcher.
        </p>
        <p className="muted">
          I’ve loved making things ever since I was a little kid. I grew up with
          paper on walls to paint, building LEGOs and deconstructing them to
          make my own creations. Now I make designs and fun tech projects!
        </p>
        <p className="muted">
          My interest in tech comes from my best friend, my dad. We would spend
          our weekends at Apple Store events and strolling through the camera
          section at Best Buy in our free time. In high school, I became engaged
          in cyber competitions, then learned UX design and how to code.
        </p>
        <Link className="blue" to="/research">
          I explore computing education, AI literacy, and human–computer
          interaction. Explore my research
        </Link>
        <p className="eyebrow blue">OFF SCREEN</p>
        <p>
          Listening to RÜFÜS DU SOL · Running · Watching Formula 1 · Capturing
          moments by taking photos
        </p>
      </div>
    </section>
  );
}
function Projects() {
  return (
    <section id="projects" className="projects">
      <h2 className="center">Selected Works</h2>
      <Carousel />
      <a className="explore-stories" href="#stories">
        Explore the project stories
      </a>
      <div id="stories" className="container project-list">
        <h2>Behind the screens.</h2>
        {projects.map((p) => (
          <Link key={p.slug} className="project-row" to={"/projects/" + p.slug}>
            <img src={p.cover} alt={p.title + " cover"} loading="lazy" />
            <div>
              <h3>{p.title}</h3>
              <p>{p.summary}</p>
              <span>{p.cta}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
function Contact() {
  return (
    <section id="contact" className="container contact">
      <div className="contact-note">
        <p className="eyebrow blue">A NOTE TO SAY HELLO</p>
        <h2>Let’s make something meaningful.</h2>
        <p className="muted">
          Have an idea, a research question, or a shared love of making things?
          I’d love to hear from you.
        </p>
        <a className="email" href="mailto:haileymuniz@my.utsa.edu">
          haileymuniz@my.utsa.edu
        </a>
        <p className="muted">
          Talk design, computing education, or your latest side project.
        </p>
        <p className="signature">
          See you soon,
          <br />
          Hailey
        </p>
      </div>
      <img
        className="paper-plane"
        src={assets.contact.imgImage30}
        alt=""
        loading="lazy"
      />
    </section>
  );
}
function Events() {
  return (
    <section className="container events-page">
      <p className="eyebrow blue">EVENTS / A COLLECTION OF MOMENTS</p>
      <h1>Postcards from my world.</h1>
      <p className="muted intro">
        People I’ve met, places I’ve learned, and moments worth keeping.
      </p>
      <div className="postcards">
        {events.map((e) => (
          <Link className="postcard" key={e.slug} to={"/events/" + e.slug}>
            <img
              className="postcard-paper"
              src={assets.events.imgPostageStampPaperTrueCutoutEdge}
              alt=""
            />
            <div className={"postcard-photo-frame " + (e.slug === "cturc" ? "postcard-photo-cturc" : "")}>
            <img
              className={"postcard-photo " + (e.slug === "kode" ? "postcard-photo-fit" : "")}
              src={"/assets/postcard-" + e.slug + (e.slug === "cturc" ? ".jpg" : ".png")}
              alt={e.title}
              loading="lazy"
            />
            </div>
            <div className="postcard-caption">
              <h2>{e.title}</h2>
              <p>{e.date}</p>
            </div>
            <div className={"postmark " + e.type.toLowerCase()}>
              <img src={stampImages[e.type]} alt="" />
              <div className="postmark-type">
                <small>HAILEY’S</small>
                <strong>{e.type.toUpperCase()}</strong>
                <small>
                  {e.type === "Hackathon"
                    ? "★ ★ ★"
                    : e.type === "Conference"
                    ? "IDEAS · EXCHANGE"
                    : e.type === "Leadership"
                    ? "LEAD · CONNECT"
                    : "LEARN · EXPLORE"}
                </small>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <p className="signature">More memories to come.</p>
    </section>
  );
}
function Research() {
  return (
    <section className="container research-page">
      <p className="eyebrow blue">
        QUESTIONS, EXPERIMENTS & THINGS I’M LEARNING
      </p>
      <h1>
        <span className="highlight">
          Research
          <i aria-hidden="true" />
        </span>
      </h1>
      <p className="intro muted">
        Curious about how people learn—and how we can make technology
        <br className="desktop-break" /> more understandable, useful, and human.
      </p>
      <p className="research-topics blue">
        Computing education　 /　 AI literacy　 /　 Human–computer interaction
      </p>
      <h2>Publications</h2>
      <article className="publication">
        <div>
          <h3>
            Building Teacher AI Fluency in Middle Schools: Can Artificial
            Intelligence (AI) Enhance Subject-Area Understanding?
          </h3>
          <p>
            Lin Zhu, Ismaila Sanusi, Hailey Muñiz, Deepti Tagare, Lucretia M.
            Fraga, Diane Schilder, Fred Martin, and Lijun Ni
            <br />
            ACM SIGCSE Technical Symposium 2027
          </p>
        </div>
        <p className="publication-status">
          2027
          <br />
          Accepted
        </p>
      </article>
      <h2>Posters</h2>
      <div className="poster-title">
        <h3>
          Opening the Opaque Box: A Scoping Review of K–12 AI Learning Through
          Games and Code
        </h3>
        <p>Muñiz, H., & Martin, F. · Poster presentations</p>
      </div>
      {[
        [
          "UTSA Pathways–Stanford University",
          "Summer Undergraduate Research",
          "May 27, 2026",
          "Stanford, CA",
        ],
        [
          "UTSA Undergraduate Research Showcase",
          "The University of Texas at San Antonio",
          "April 21, 2026",
          "San Antonio, TX",
        ],
        [
          "Capital of Texas Undergraduate Research Conference",
          "The University of Texas at Austin · CTURC",
          "March 28, 2026",
          "Austin, TX",
        ],
      ].map(([name, sub, date, place]) => (
        <div className="poster-row" key={name}>
          <div>
            <h3>{name}</h3>
            <p>{sub}</p>
          </div>
          <p className="blue">
            {date}
            <br />
            {place}
          </p>
        </div>
      ))}
      <h2>Research Involvement</h2>
      <p className="muted">
        Fellowships, research projects, and professional memberships.
      </p>
      <div className="involvement">
        <div className="involvement-card filled">
          <p className="eyebrow">EXPERIENCE</p>
          <h3>Education Computing Group</h3>
          <h3>ETS Research Intern</h3>
          <h3>P20 Pathways Fellow</h3>
        </div>
        <div>
          <div className="involvement-card">
            <p className="eyebrow">PROGRAMS</p>
            <h3>AI for Everyone Camp</h3>
            <h3>Educate AI</h3>
          </div>
          <div className="involvement-card">
            <p className="eyebrow">PROFESSIONAL MEMBERSHIPS</p>
            <h3>ACM</h3>
            <h3>AERA</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = pathname.startsWith("/projects/")
      ? (projects.find((p) => pathname.endsWith(p.slug))?.title ?? "Project") +
        " | Hailey Muñiz"
      : pathname.startsWith("/events/")
      ? (events.find((p) => pathname.endsWith(p.slug))?.title ?? "Event") +
        " | Hailey Muñiz"
      : pathname === "/about"
      ? "About Me | Hailey Muñiz"
      : pathname === "/projects"
      ? "Selected Works | Hailey Muñiz"
      : pathname === "/contact"
      ? "Contact | Hailey Muñiz"
      : pathname === "/research"
      ? "Research | Hailey Muñiz"
      : pathname === "/events"
      ? "Postcards | Hailey Muñiz"
      : "Hailey Muñiz — Portfolio";
    if (hash) {
      requestAnimationFrame(() =>
        document
          .getElementById(hash.slice(1))
          ?.scrollIntoView({ behavior: "instant" })
      );
    } else window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}
export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollManager />
      <Nav />
      <main id="main">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/research" element={<Research />} />
          <Route path="/events" element={<Events />} />
          <Route path="/projects/:slug" element={<Story kind="project" />} />
          <Route path="/events/:slug" element={<Story kind="event" />} />
          <Route
            path="*"
            element={
              <div className="container empty">
                <h1>That page wandered off.</h1>
                <Link to="/">Back home</Link>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
