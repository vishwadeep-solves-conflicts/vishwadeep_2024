import Header from "./components/Header";
import { Footer } from "./components/Sections";
import { ThemeProvider } from "./theme";
import { worklog, worklogStats } from "./worklog";

function WorkLogPage() {
  return (
    <ThemeProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header page="worklog" />
      <main id="main">
        <section className="container worklog-hero" aria-labelledby="worklog-title">
          <p className="eyebrow">Mar 2024 – Nov 2026 · healthcare platform at SleekSky</p>
          <h1 id="worklog-title" className="worklog-title">
            Work log
          </h1>
          <p className="hero-lead">
            The bigger things I've built and fixed on a US healthcare platform for at-home lab testing and
            health-plan programs: a Node.js/Express API, a React web app and PostgreSQL. Client and partner
            names are left out; the numbers come from pull requests, staging tests and production runs.
          </p>
          <dl className="worklog-stats">
            {worklogStats.map((s) => (
              <div className="card stat" key={s.label}>
                <dt className="stat-label">{s.label}</dt>
                <dd className="stat-value">{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <nav className="container worklog-toc" aria-label="Work log sections">
          <ul>
            {worklog.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`}>{g.title}</a>
              </li>
            ))}
          </ul>
        </nav>

        {worklog.map((g) => (
          <section className="container worklog-group" id={g.id} key={g.id} aria-labelledby={`${g.id}-title`}>
            <div className="worklog-group-head">
              <h2 id={`${g.id}-title`} className="section-title">
                {g.title}
              </h2>
              <p className="muted">{g.intro}</p>
            </div>
            <ul className="worklog-items">
              {g.items.map((item) => (
                <li className="card worklog-item" key={item.title}>
                  <div className="worklog-item-head">
                    <h3>{item.title}</h3>
                    {item.metric && <span className="worklog-metric mono">{item.metric}</span>}
                  </div>
                  <p className="muted">{item.detail}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className="container worklog-back">
          <a className="button" href="/">
            <span aria-hidden="true">←</span> Back to home
          </a>
        </div>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default WorkLogPage;
