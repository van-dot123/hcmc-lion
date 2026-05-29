import { useLang } from "../context/LangContext";

export default function Footer() {
  const { lang } = useLang();
  const vi = lang === "vi";
  return (
    <footer style={{
      background: "var(--gray-bg)",
      borderTop: "1px solid var(--gray-line)",
      padding: "36px 48px",
      display: "flex", justifyContent: "space-between",
      alignItems: "center", flexWrap: "wrap", gap: 16,
    }}>
      <div style={{ fontWeight: 700, fontSize: 15, color: "var(--black)", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--o)", display: "inline-block" }} />
        HCMC Lions · Likelion Vietnam
      </div>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {[
          { href: "#portfolio", label: vi ? "Kết quả" : "결과물" },
          { href: "#early",     label: vi ? "Đăng ký" : "신청" },
        ].map((l) => (
          <a key={l.href} href={l.href} style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none", transition: "color .15s" }}
            onMouseEnter={e => e.target.style.color = "var(--black)"}
            onMouseLeave={e => e.target.style.color = "var(--muted)"}
          >{l.label}</a>
        ))}
      </div>
      <p style={{ fontSize: 12, color: "var(--muted2)" }}>© 2026 Likelion Vietnam</p>
    </footer>
  );
}
