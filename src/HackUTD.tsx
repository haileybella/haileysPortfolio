const assetPath = "/assets/hackutd/";

const memories = [
  [
    { file: "agentbox-home", alt: "AgentBox landing page", height: 179.976, crop: { width: "102.31%" } },
    { file: "indoor-selfie", alt: "Hailey and a friend at the hackathon", height: 195.048 },
    { file: "hackutd-entrance", alt: "Attendees outside the HackUTD entrance", height: 399.115, crop: { width: "122.2%", height: "170.97%", left: "-3.92%", top: "-59.61%" } },
  ],
  [
    { file: "agentbox-dashboard", alt: "AgentBox dashboard showing the four agents", height: 180.234 },
    { file: "standing-together", alt: "Two attendees posing together at HackUTD", height: 415.334, crop: { width: "155.29%", height: "156.46%", left: "-35.08%", top: "-50.69%" } },
    { file: "lit-stage", alt: "HackUTD stage lit in blue and purple", height: 204.093 },
  ],
  [
    { file: "car-selfie", alt: "Friends taking a group selfie in the car", height: 218.032, crop: { width: "113.65%", height: "113.74%", left: "-7.1%", top: "-12.22%" } },
    { file: "outdoor-selfie", alt: "Hailey and a friend smiling outdoors", height: 207.623 },
    { file: "dallas-mural", alt: "Hailey posing in front of a colorful Dallas mural", height: 432.265, crop: { height: "128.89%", top: "-15.17%" } },
  ],
];

const projectLinks = [
  { name: "GitHub", href: "https://github.com/Mystery335/AgentBox" },
  { name: "Devpost", href: "https://devpost.com/software/agentbox" },
];

export default function HackUTD({ title, cover }: { title: string; cover: string }) {
  return (
    <div className="story-group story-column">
      <header className="event-header story-row">
        <div className="story-group story-column">
          <p className="eyebrow blue">A POSTCARD FROM</p>
          <h1>{title}</h1>
          <p className="muted">November 7-8 2026 · Richardson, Texas</p>
        </div>
        <div className="detail-stamp">
          <small>FROM THE FIELD</small>
          <span>Hackathon</span>
          <small>HAILEY’S POSTCARDS</small>
        </div>
      </header>

      <img className="hackutd-cover" src={cover} alt="Four HackUTD teammates posing together" width="1024" height="639" />

      <div className="postcard-message story-row">
        <section className="story-column">
          <h2 className="dear">Dear reader,</h2>
          <div>
            <p>
              My second hackathon took me to Dallas for 24 hours to build AgentBox.<br />
              A platform that uses four NVIDIA Nemotron AI agents to modernize legacy software. The agents analyze and document older code, rewrite it in a modern language, test both versions on the same inputs, and debug differences while users follow their progress through a live dashboard. I designed the app and built its frontend so people could follow what each AI agent was doing as it analyzed, rewrote, tested, and debugged legacy code.
            </p>
            <p>
              Being at North America’s largest 24-hour university hackathon was surreal.<br />
              I met so many kind, creative people, and the whole weekend made my first Dallas trip unforgettable.
            </p>
          </div>
        </section>
        <section className="story-column">
          <h2>The moments I’m keeping</h2>
          <p>Chance to meet some of my favorite tech creators who inspire me to continue to learn and build!</p>
        </section>
      </div>

      <div className="people-tools story-row">
        <section className="story-column">
          <h2>Good company</h2>
          <p>
            ACM UT San Antonio Student Chapter<br />
            Tech creators: Mori Liu, Madeline Zhang, and Aidan Ouckama<br />
            Photos and video: Camille Rivera and me<br />
            Teammates: William Chen and Vian Chen
          </p>
        </section>
        <section className="story-column">
          <h2>In my toolkit</h2>
          <p>Figma · frontend development · NVIDIA Nemotron · SpacetimeDB</p>
        </section>
      </div>

      <section className="hackutd-memories">
        <h2>A few more memories</h2>
        <div className="hackutd-gallery">
          {memories.map((column) => (
            <div className="hackutd-gallery-column" key={column[0].file}>
              {column.map(({ file, alt, height, crop }) => (
                <div className="hackutd-memory" key={file} style={{ aspectRatio: `313.849 / ${height}` }}>
                  <img src={assetPath + file + ".webp"} alt={alt} loading="lazy" style={crop} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="story-column">
        <h2>Follow the story</h2>
        <p className="muted">A few stamps to take you further.</p>
        <div className="stamp-links story-row">
          {projectLinks.map(({ name, href }) => (
            <a className="link-stamp" key={name} href={href} target="_blank" rel="noreferrer">
              <small>FOLLOW THE STORY</small>
              <span>{name}</span>
              <small>OPEN LINK ↗</small>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
