import { highlights, jobs, profile, projects, sideProjects, skills, type Project } from "../data";
import { useTheme, type ThemeKey } from "../theme";
import CV from "../resume";
import { BASE } from "../paths";

const heatmapFor: Record<ThemeKey, string> = {
  navy: `${BASE}commit-heatmap-site.svg`,
  white: `${BASE}commit-heatmap-light.svg`,
  midnight: `${BASE}commit-heatmap-dark.svg`,
};

export function Highlights() {
  return (
    <section className="container highlights" aria-label="Highlights">
      {highlights.map((h) => (
        <div className="card stat" key={h.value}>
          <span className="stat-value">{h.value}</span>
          <span className="stat-label">{h.label}</span>
        </div>
      ))}
    </section>
  );
}

export function Experience() {
  const { theme } = useTheme();
  return (
    <section id="experience" className="container section" aria-labelledby="experience-title">
      <h2 id="experience-title" className="section-title">
        Experience
      </h2>
      <ol className="timeline">
        {jobs.map((job) => (
          <li className="timeline-item" key={job.company}>
            <div className="timeline-head">
              <h3>
                {job.role} · {job.company}
                {job.place ? `, ${job.place}` : ""}
              </h3>
              <span className="mono muted">{job.dates}</span>
            </div>
            {job.summary && <p className="muted">{job.summary}</p>}
            <ul className="timeline-points">
              {job.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <ul className="chips" aria-label={`${job.company} tech stack`}>
              {job.tech.map((t) => (
                <li className="chip" key={t}>
                  {t}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <a className="button worklog-cta" href={`${BASE}work/`}>
        See the full work log <span aria-hidden="true">→</span>
      </a>

      <div className="activity">
        <h3 className="activity-title">Commit activity</h3>
        <p className="muted">
          Daily commits across private client repositories. The work itself is under NDA; the rhythm isn't.
        </p>
        <div className="card activity-frame">
          <img
            src={heatmapFor[theme]}
            alt="Commit heatmap: 2,333 commits from March 2024 to November 2026"
            width={733}
            height={397}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function ProjectGrid({ items, live }: { items: Project[]; live?: boolean }) {
  return (
    <div className="project-grid">
      {items.map((p) => (
        <article className="card project" key={p.name}>
          <span className="mono accent project-tag">{p.tag}</span>
          <h3>{p.name}</h3>
          <p className="muted">{p.desc}</p>
          {(p.url || p.code) && (
            <div className="project-links">
              {p.url && (
                <a href={p.url} target="_blank" rel="noopener">
                  {live ? "Try it" : "Visit site"} <span aria-hidden="true">→</span>
                </a>
              )}
              {p.code && (
                <a href={p.code} target="_blank" rel="noopener">
                  View code <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

export function Work() {
  return (
    <section id="work" className="container section" aria-labelledby="work-title">
      <h2 id="work-title" className="section-title">
        Selected work
      </h2>
      <ProjectGrid items={projects} />
    </section>
  );
}

export function SideProjects() {
  return (
    <section id="side-projects" className="container section" aria-labelledby="side-title">
      <h2 id="side-title" className="section-title">
        Side projects
      </h2>
      <p className="muted section-lead">Small things I built for fun. Each one is open source and runs in your browser.</p>
      <ProjectGrid items={sideProjects} live />
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="container section" aria-labelledby="skills-title">
      <h2 id="skills-title" className="section-title">
        Skills
      </h2>
      <div className="skills-grid">
        {skills.map((s) => (
          <div key={s.group}>
            <h3 className="mono accent skills-group">{s.group}</h3>
            <p>{s.items}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container site-footer-inner">
        <div>
          <h2 className="footer-title">Let's talk.</h2>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
        <div className="button-row">
          {CV && (
            <a className="button button-primary" href={CV} target="_blank" rel="noopener">
              Resume (PDF)
            </a>
          )}
          <a className={CV ? "button" : "button button-primary"} href={profile.linkedin} target="_blank" rel="noopener">
            LinkedIn
          </a>
          <a className="button" href={profile.github} target="_blank" rel="noopener">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
