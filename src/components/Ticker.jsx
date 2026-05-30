import styles from "./Ticker.module.css";

const ITEMS = [
  { dot: "orange", text: <><strong>FYI Job Board</strong> — Web Service</> },
  { dot: "amber",  text: <><strong>Campaign Dashboard</strong> — For Marketers</> },
  { dot: "green",  text: <><strong>Email Auto-Report</strong> — Automation</> },
  { dot: "purple", text: <><strong>Research Agent</strong> — AI Built</> },
  { dot: "orange", text: <><strong>VTM Salary Tool</strong> — Web App</> },
  { dot: "amber",  text: <><strong>Ad Performance</strong> — Dashboard</> },
  { dot: "green",  text: <><strong>Lead Scoring Bot</strong> — Claude + n8n</> },
  { dot: "purple", text: <><strong>Content Brief AI</strong> — Agent</> },
];

const DOT_COLORS = {
  orange: "#F15A22",
  amber: "#E8A020",
  green: "#2A9D5C",
  purple: "#6C5CE7",
};

export default function Ticker() {
  // Duplicate for seamless loop
  const all = [...ITEMS, ...ITEMS];
  return (
    <div className={styles.strip}>
      <div className={styles.fadeLeft} />
      <div className={styles.track}>
        {all.map((item, i) => (
          <div key={i} className={styles.item}>
            <span className={styles.dot} style={{ background: DOT_COLORS[item.dot] }} />
            <span className={styles.text}>{item.text}</span>
          </div>
        ))}
      </div>
      <div className={styles.fadeRight} />
    </div>
  );
}
