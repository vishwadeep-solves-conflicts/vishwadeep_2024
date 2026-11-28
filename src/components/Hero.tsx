import { useState } from "react";
import Avatar from "./Avatar";
import LampDesk from "./LampDesk";
import CV from "../resume";
import { profile } from "../data";

export default function Hero() {
  const [lightsOn, setLightsOn] = useState(true);
  return (
    <section className="hero" aria-labelledby="hero-name">
      <div className="container hero-inner">
        <div className="hero-intro">
          <Avatar asleep={!lightsOn} />
          <p className="eyebrow">Hi there, I'm</p>
          <h1 id="hero-name" className="hero-name">
            {profile.name}
          </h1>
          <p className="hero-lead">
            Senior software engineer in Bengaluru. I build the backend parts that have to work at scale: job
            queues, Postgres and integrations.
          </p>
          <div className="button-row">
            {CV && (
              <a className="button button-primary" href={CV} target="_blank" rel="noopener">
                Download resume
              </a>
            )}
            <a className={CV ? "button" : "button button-primary"} href={profile.linkedin} target="_blank" rel="noopener">
              LinkedIn
            </a>
            <a className="button" href={profile.github} target="_blank" rel="noopener">
              GitHub
            </a>
          </div>
          <p className="hero-hint">Move your cursor around. Shake it fast if you're feeling mean.</p>
        </div>
        <LampDesk onLightChange={setLightsOn} />
      </div>
    </section>
  );
}
