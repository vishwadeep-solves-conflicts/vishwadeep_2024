import Header from "./components/Header";
import { Footer } from "./components/Sections";
import { ThemeProvider } from "./theme";
import { profile, sideProjects } from "./data";
import { BASE } from "./paths";

function AppsPage() {
  return (
    <ThemeProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header page="apps" />
      <main id="main">
        <section className="container apps-hero" aria-labelledby="apps-title">
          <p className="eyebrow">Open source · runs in your browser · no sign-up</p>
          <h1 id="apps-title" className="worklog-title">
            Apps
          </h1>
          <p className="hero-lead">
            Everything I've built and put online, in one place. Each app is a single page with no server
            behind it, so your data stays on your device.
          </p>
        </section>

        <section className="container apps-section" aria-label="Apps">
          <ul className="apps-grid">
            {sideProjects.map((app) => (
              <li className="card app-card" key={app.name}>
                {app.image && (
                  <a className="app-shot" href={app.url} target="_blank" rel="noopener" tabIndex={-1} aria-hidden="true">
                    <img src={app.image} alt="" loading="lazy" width={1280} height={800} />
                  </a>
                )}
                <div className="app-body">
                  <span className="mono accent project-tag">{app.tag}</span>
                  <h2 className="app-name">{app.name}</h2>
                  <p className="muted">{app.desc}</p>
                  <div className="project-links">
                    {app.url && (
                      <a href={app.url} target="_blank" rel="noopener">
                        Open app <span aria-hidden="true">→</span>
                      </a>
                    )}
                    {app.code && (
                      <a href={app.code} target="_blank" rel="noopener">
                        View code <span aria-hidden="true">→</span>
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="container apps-section" aria-labelledby="apps-more-title">
          <h2 id="apps-more-title" className="section-title">
            Also here
          </h2>
          <div className="button-row">
            <a className="button" href={BASE}>
              Portfolio
            </a>
            <a className="button" href={`${BASE}work/`}>
              Work log
            </a>
            <a className="button" href={profile.github} target="_blank" rel="noopener">
              All code on GitHub
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default AppsPage;
