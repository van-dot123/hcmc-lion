// ─────────────────────────────────────────────
//  PORTFOLIO DATA
//  Swap `video` paths when you have real assets.
//  Accepted: .mp4, .webm, .gif
// ─────────────────────────────────────────────

export const PORTFOLIO = [
  {
    id: "fyi-jobs",
    tag: "Web Service",
    tagColor: "orange",
    title: "FYI Job Board",
    titleKr: "FYI 채용 플랫폼",
    desc: "Nền tảng tuyển dụng ngành digital",
    descKr: "디지털 업계 채용 플랫폼",
    built: "Claude + Cursor",
    // ▶ Replace with your real video/gif path
    // e.g. video: "/videos/fyi-jobs-demo.mp4"
    video: null,
    // Fallback accent color shown when no video
    accent: "#F15A22",
  },
  {
    id: "campaign-dashboard",
    tag: "Dashboard",
    tagColor: "amber",
    title: "Campaign Analytics",
    titleKr: "캠페인 성과 대시보드",
    desc: "Real-time metrics cho Marketing team",
    descKr: "마케터를 위한 실시간 성과 측정",
    built: "Claude + Lovable",
    video: null,
    accent: "#E8A020",
  },
  {
    id: "email-automation",
    tag: "Automation",
    tagColor: "green",
    title: "Email → Slack Bot",
    titleKr: "이메일 자동화 봇",
    desc: "Tiết kiệm 3h/ngày cho team Sales",
    descKr: "세일즈팀 하루 3시간 절약",
    built: "Claude + n8n",
    video: null,
    accent: "#2A9D5C",
  },
  {
    id: "ai-agent",
    tag: "AI Agent",
    tagColor: "purple",
    title: "Research Assistant",
    titleKr: "리서치 에이전트",
    desc: "24 nguồn, 1 báo cáo, tự động",
    descKr: "24개 소스 → 자동 보고서",
    built: "Claude Code",
    video: null,
    accent: "#6C5CE7",
  },
];

// Tag color map
export const TAG_COLORS = {
  orange: { bg: "#FEF0EA", text: "#C44410", border: "#fcd9c7" },
  amber:  { bg: "#FFFBEC", text: "#92600A", border: "#fde8a3" },
  green:  { bg: "#EEF9F4", text: "#0B6B3A", border: "#c2ecd8" },
  purple: { bg: "#F0EEFF", text: "#4A3AAA", border: "#d4cbf8" },
};
