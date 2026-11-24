import CV from "../resume";
import { profile } from "../data";
import { themes, useTheme } from "../theme";
import { BASE } from "../paths";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="theme-switch" role="group" aria-label="Colour theme">
      {themes.map((t) => (
        <button
          key={t.key}
          type="button"
          aria-pressed={theme === t.key}
          onClick={() => setTheme(t.key)}
          className="theme-switch-button"
        >
          <span
            className="theme-switch-dot"
            aria-hidden="true"
            style={{ background: t.bg, boxShadow: `inset 0 0 0 3px ${t.accent}` }}
          />
          <span className="theme-switch-label">{t.label}</span>
        </button>
      ))}
    </div>
  );
}

export default function Header({ page = "home" }: { page?: "home" | "worklog" | "apps" }) {
  const base = page === "home" ? "" : BASE;
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <a className="site-name" href={page === "home" ? "#top" : BASE}>
          {profile.name}
        </a>
        <nav className="site-nav" aria-label="Main">
          <a href={`${base}#experience`}>Experience</a>
          <a href={`${base}#work`}>Work</a>
          <a href={`${base}#side-projects`}>Projects</a>
          <a href={`${base}#skills`}>Skills</a>
          <a href={`${BASE}work/`} aria-current={page === "worklog" ? "page" : undefined}>
            Work log
          </a>
          <a href={`${BASE}apps/`} aria-current={page === "apps" ? "page" : undefined}>
            Apps
          </a>
        </nav>
        <div className="site-header-actions">
          <ThemeSwitcher />
          {CV && (
            <a className="button button-primary button-small" href={CV} target="_blank" rel="noopener">
              Resume
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
