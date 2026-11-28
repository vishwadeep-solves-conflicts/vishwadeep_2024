import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { commitsByYear } from "../data";
import { usePrefersReducedMotion } from "../theme";

const MAX_PULL = 70;

// The desk lamp lighting up a small dashboard. The lamp flickers on at load;
// the pull cord stretches when dragged, springs back, swings, and toggles the light.
export default function LampDesk({ onLightChange }: { onLightChange?: (on: boolean) => void }) {
  const reduced = usePrefersReducedMotion();
  const [lampOn, setLampOn] = useState(reduced);
  const [pull, setPull] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [swing, setSwing] = useState(0);
  const [hinted, setHinted] = useState(false);
  const timers = useRef<number[]>([]);
  const dragStart = useRef(0);
  const lastPull = useRef(0);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  useEffect(() => {
    const pending = timers.current;
    if (reduced) {
      setLampOn(true);
    } else {
      [180, 260, 340, 420, 560, 640, 900].forEach((ms, i, all) => {
        pending.push(window.setTimeout(() => setLampOn(i % 2 === 0 || i === all.length - 1), ms));
      });
    }
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, [reduced]);

  useEffect(() => {
    onLightChange?.(lampOn);
  }, [lampOn, onLightChange]);

  const swingCord = (strength: number) => {
    if (reduced) return;
    const a = Math.min(12, 4 + strength / 8);
    [a, -a * 0.7, a * 0.45, -a * 0.25, a * 0.1, 0].forEach((deg, i) => later(() => setSwing(deg), 120 + i * 260));
  };

  const onCordClick = () => {
    const tugged = lastPull.current;
    lastPull.current = 0;
    if (tugged < 8 && !reduced) {
      setPull(22);
      later(() => setPull(0), 110);
    }
    swingCord(Math.max(tugged, 22));
    later(() => {
      setLampOn((on) => !on);
      setHinted(true);
    }, reduced ? 0 : 120);
  };

  const onCordDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStart.current = e.clientY;
    lastPull.current = 0;
    setDragging(true);
  };

  const onCordMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (!dragging) return;
    const p = Math.max(0, Math.min(MAX_PULL, e.clientY - dragStart.current));
    lastPull.current = Math.max(lastPull.current, p);
    setPull(p);
  };

  const onCordUp = () => {
    if (!dragging) return;
    setDragging(false);
    setPull(0);
  };

  const max = Math.max(...commitsByYear.map((c) => c.count));

  return (
    <div className={`lamp-desk ${lampOn ? "is-on" : "is-off"}`}>
      <div className="lamp" aria-hidden="true">
        <span className="lamp-wire" />
        <span className="lamp-shade" />
        <span className="lamp-bulb" />
      </div>
      <div className="lamp-cone" aria-hidden="true" />

      <div className="lamp-cord" style={{ transform: `rotate(${swing}deg)` }}>
        <button
          type="button"
          className="lamp-cord-button"
          aria-pressed={lampOn}
          aria-label="Pull cord: turn the lamp on or off"
          onClick={onCordClick}
          onPointerDown={onCordDown}
          onPointerMove={onCordMove}
          onPointerUp={onCordUp}
          onPointerCancel={onCordUp}
        >
          <span
            className="lamp-cord-thread"
            aria-hidden="true"
            style={{ height: 52 + pull, transition: dragging ? "none" : undefined }}
          />
          <span className="lamp-cord-knob" aria-hidden="true" />
        </button>
        {!hinted && (
          <span className="lamp-cord-hint" aria-hidden="true">
            pull
          </span>
        )}
      </div>

      <figure
        className="desk-board"
        role="img"
        aria-label="Dashboard: 2,333 commits from 2024 to 2026, 150k+ members on the scheduler, lookups down from 514 ms to 1.3 ms"
      >
        <span className="desk-board-spot" aria-hidden="true" />
        <span className="desk-board-rings" aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} />
          ))}
        </span>
        <p className="desk-board-title">commits I pushed</p>
        <div className="desk-chart">
          {commitsByYear.map((c, i) => (
            <div className="desk-bar" key={c.year}>
              <span className="desk-bar-value">{c.count.toLocaleString("en-US")}</span>
              <span
                className={`desk-bar-fill${i === commitsByYear.length - 1 ? " is-latest" : ""}`}
                style={{ height: Math.round((110 * c.count) / max) }}
              />
            </div>
          ))}
        </div>
        <div className="desk-years">
          {commitsByYear.map((c) => (
            <span key={c.year}>{c.year}</span>
          ))}
        </div>
        <div className="desk-stats">
          <div>
            <strong>150k+</strong>
            <span>members on the scheduler I rebuilt</span>
          </div>
          <div>
            <strong>1.3 ms</strong>
            <span>lookups, down from 514 ms</span>
          </div>
        </div>
      </figure>
    </div>
  );
}
