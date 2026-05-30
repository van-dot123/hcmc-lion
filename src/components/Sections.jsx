import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LangContext";

// ── shared util ──────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

// ── Target Section ────────────────────────────────────────────────────────────
export function TargetSection() {
  const _id = "audience";
  const cards = [
    {
      n: "01",
      img: "/images/target-1.png",
      title: "Người đi làm muốn dùng AI thực sự",
      desc: "Bạn đã thử ChatGPT nhưng vẫn chưa thấy nó thay đổi được công việc hàng ngày.",
      quote: "Tôi biết AI mạnh nhưng tôi chưa biết dùng nó cho việc của mình.",
    },
    {
      n: "02",
      img: "/images/target-2.png",
      title: "Freelancer & side-hustler",
      desc: "Bạn muốn tự động hoá một phần công việc để có thêm thời gian cho dự án cá nhân.",
      quote: "Nếu AI làm được việc này, tôi có thể nhận thêm 2 client nữa.",
    },
    {
      n: "03",
      img: "/images/target-3.png",
      title: "Builder muốn ra sản phẩm đầu tiên",
      desc: "Ý tưởng thì có, nhưng không biết bắt đầu từ đâu và không muốn học code từ đầu.",
      quote: "Tôi muốn build cái gì đó thật không chỉ xem tutorial.",
    },
  ];

  return (
    <section id="audience" style={{ padding: "100px 40px", background: "#F8F7F5" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div {...fadeUp(0)} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--o)", marginBottom: 14 }}>
          DÀNH CHO AI?
        </motion.div>
        <motion.h2 {...fadeUp(0.08)} style={{ textAlign: "center", fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 48 }}>
          Bạn có phải là người này?
        </motion.h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {cards.map((c, i) => (
            <TargetCard key={i} card={c} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TargetCard({ card, delay }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <motion.div
      {...fadeUp(delay)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        height: 340,
        borderRadius: 20,
        overflow: "hidden",
        background: "#111",
        cursor: "default",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.25)" : "0 4px 16px rgba(0,0,0,0.12)",
      }}
    >
      {/* Orange top border on hover */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: "var(--o)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
        zIndex: 3,
        borderRadius: "20px 20px 0 0",
      }} />

      {/* Image */}
      <img
        src={card.img}
        alt={card.title}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 100%)",
      }} />

      {/* Bottom content */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 24px 24px", zIndex: 2 }}>
        {/* Extra content slides up on hover */}
        <div style={{
          overflow: "hidden",
          maxHeight: hovered ? 120 : 0,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(12px)",
          transition: "max-height 0.35s ease, opacity 0.3s ease, transform 0.35s ease",
          marginBottom: hovered ? 12 : 0,
        }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, marginBottom: 8 }}>{card.desc}</p>
          <p style={{ fontSize: 12, color: "var(--o)", fontStyle: "italic", lineHeight: 1.55 }}>{card.quote}</p>
        </div>

        {/* Number */}
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>
          {card.n}
        </div>
        {/* Title always visible */}
        <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{card.title}</div>
      </div>
    </motion.div>
  );
}

// ── Why section ───────────────────────────────────────────────────────────────
export function WhySection() {
  const { lang } = useLang();
  const vi = lang === "vi";
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);

  const steps = [
    {
      n: "01",
      title: vi ? "Thoát khỏi giới hạn của AI Chat" : "AI 채팅의 한계에서 벗어나기",
      desc: vi
        ? "Copy, paste, hỏi lại — đây chưa phải tận dụng AI. Chatbox chỉ là bề nổi."
        : "복사, 붙여넣기, 반복 질문 — 이건 진짜 AI 활용이 아닙니다.",
      visual: "chat",
    },
    {
      n: "02",
      title: vi ? "Đưa AI đi làm" : "AI를 실제 업무에 투입하기",
      desc: vi
        ? "Đọc file, tạo tài liệu, build app — AI chạy trực tiếp trên máy tính của bạn."
        : "파일 읽기, 앱 제작, 자동화 — AI가 내 컴퓨터에서 직접 작동합니다.",
      visual: "code",
    },
    {
      n: "03",
      title: vi ? "Build cùng nhau" : "함께 만들기",
      desc: vi
        ? "HCMC Lions là co-studying: cùng học, cùng build, cùng ra sản phẩm thật."
        : "HCMC Lions는 코스터디입니다. 함께 만들고, 함께 결과물을 냅니다.",
      visual: "team",
    },
  ];

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / total));
      const idx = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      setActive(idx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const current = steps[active];

  return (
    <section id="how" ref={containerRef} style={{ background: "var(--white)", position: "relative", height: `${steps.length * 80}vh` }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 40px", overflow: "hidden" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--o)", marginBottom: 16 }}>
            How it works
          </div>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 28 }}>
            {vi
              ? <>Làm sao để build được<br /><em style={{ color: "var(--o)", fontStyle: "normal" }}>những dự án AI đó?</em></>
              : <>어떻게 그런 AI 프로젝트를<br /><em style={{ color: "var(--o)", fontStyle: "normal" }}>만들 수 있을까요?</em></>}
          </h2>

          <div style={{ display: "flex", gap: 4, height: 2, marginBottom: 48 }}>
            {steps.map((_, i) => (
              <div key={i} style={{ flex: 1, background: i < active ? "var(--black)" : i === active ? "var(--o)" : "var(--gray-line)", borderRadius: 1, transition: "background 0.4s" }} />
            ))}
          </div>

          <div style={{ position: "relative", minHeight: 380 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}
              >
                <div style={{ order: active % 2 === 0 ? 1 : 2 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: "var(--muted2)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>BƯỚC</div>
                  <div style={{ fontSize: 56, fontWeight: 700, color: "var(--o)", letterSpacing: -3, lineHeight: 1, marginBottom: 20 }}>{current.n}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 14, letterSpacing: -0.5, lineHeight: 1.25 }}>{current.title}</div>
                  <div style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.85 }}>{current.desc}</div>
                </div>
                <div style={{ order: active % 2 === 0 ? 2 : 1 }}>
                  {current.visual === "chat" && <HowChatVisual />}
                  {current.visual === "code" && <HowCodeVisual />}
                  {current.visual === "team" && <HowTeamVisual />}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 36, paddingTop: 20, borderTop: "0.5px solid var(--gray-line)" }}>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>
              {vi ? "Scroll xuống để xem tiếp" : "스크롤해서 다음 단계로"} ↓
            </div>
            <div style={{ fontSize: 12, color: "var(--muted2)", fontWeight: 600, letterSpacing: 0.5 }}>
              <span style={{ color: "var(--black)", fontWeight: 700 }}>{String(active + 1).padStart(2, "0")}</span> / 0{steps.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowChatVisual() {
  return (
    <div style={{ background: "#F7F6F3", borderRadius: 16, padding: 20, border: "1px solid var(--gray-line)" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid var(--gray-line)"
      }}>
        {["#FF5F57","#FEBC2E","#28C840"].map(c => (
          <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "inline-block" }} />
        ))}
        <span style={{ fontSize: 11, color: "var(--muted)", marginLeft: 8, fontWeight: 500 }}>ChatGPT</span>
      </div>
      {[
        { role: "user", text: "Viết email cho khách hàng về dự án X" },
        { role: "ai",   text: "Kính gửi Quý khách, Tôi xin phép liên hệ để..." },
        { role: "user", text: "Viết lại, ngắn hơn" },
        { role: "ai",   text: "Xin chào, Tôi muốn thông báo về..." },
        { role: "user", text: "Ngắn hơn nữa, bớt formal" },
      ].map((m, i) => (
        <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 8 }}>
          <div style={{
            background: m.role === "user" ? "var(--o)" : "#fff",
            color: m.role === "user" ? "#fff" : "var(--black)",
            border: m.role === "ai" ? "1px solid var(--gray-line)" : "none",
            borderRadius: m.role === "user" ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
            padding: "8px 13px", fontSize: 13, lineHeight: 1.5, maxWidth: "82%",
          }}>
            {m.text}
          </div>
        </div>
      ))}
      <div style={{
        display: "flex", gap: 5, padding: "7px 12px",
        background: "#fff", border: "1px solid var(--gray-line)",
        borderRadius: 12, width: "fit-content", marginTop: 6
      }}>
        {[0,1,2].map(i => (
          <span key={i} style={{
            width: 6, height: 6, borderRadius: "50%", background: "var(--muted2)",
            display: "inline-block",
            animation: `howTyping 0.9s ${i * 0.2}s infinite ease-in-out`
          }} />
        ))}
      </div>
      <div style={{
        textAlign: "center", fontSize: 11, color: "var(--muted2)",
        marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--gray-line)"
      }}>
        ↩ copy → paste → hỏi lại... mãi mãi
      </div>
    </div>
  );
}

function HowCodeVisual() {
  return (
    <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #2a2a2a" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "11px 16px", background: "#141414", borderBottom: "1px solid #2a2a2a"
      }}>
        {["#FF5F57","#FEBC2E","#28C840"].map(c => (
          <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "inline-block" }} />
        ))}
        <span style={{ fontSize: 11, color: "#555", marginLeft: 10, fontFamily: "monospace" }}>
          claude — claude code
        </span>
      </div>
      <div style={{ background: "#1a1a1a", padding: "18px 20px", fontFamily: "monospace", fontSize: 13, lineHeight: 2.2 }}>
        <div><span style={{ color: "#3fb950" }}>✓ </span><span style={{ color: "#e6edf3" }}>Reading </span><span style={{ color: "#4ECDC4" }}>report_Q1.xlsx</span></div>
        <div><span style={{ color: "#3fb950" }}>✓ </span><span style={{ color: "#e6edf3" }}>Analyzing </span><span style={{ color: "#F15A22" }}>847 rows</span><span style={{ color: "#555" }}> of data</span></div>
        <div><span style={{ color: "#3fb950" }}>✓ </span><span style={{ color: "#e6edf3" }}>Generating </span><span style={{ color: "#4ECDC4" }}>dashboard.html</span></div>
        <div><span style={{ color: "#F15A22" }}>→ </span><span style={{ color: "#e6edf3" }}>Sending to </span><span style={{ color: "#3fb950" }}>#marketing</span><span style={{ color: "#555" }}> on Slack</span></div>
        <div>
          <span style={{ color: "#e6edf3" }}>Done in 4.2s </span>
          <span style={{
            display: "inline-block", width: 8, height: 14,
            background: "#F15A22", verticalAlign: "text-bottom",
            animation: "howCursor 0.8s step-end infinite"
          }} />
        </div>
      </div>
    </div>
  );
}

function HowTeamVisual() {
  return (
    <div style={{
      borderRadius: 16, aspectRatio: "16/10",
      overflow: "hidden", border: "1px solid var(--gray-line)",
    }}>
      <img
        src="https://res.cloudinary.com/dcbythlhu/image/upload/q_auto/f_auto/v1780138614/section4_img1_vioslh.png"
        alt="Co-studying cohort"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}

// ── Values Section ────────────────────────────────────────────────────────────
export function ValuesSection() {
  const { lang } = useLang();
  const vi = lang === "vi";

  const values = [
    {
      n: "01 —",
      title: vi ? "Làm việc cùng AI, không chống lại" : "AI와 함께, 맞서지 말고",
      desc: vi
        ? "Câu hỏi \"AI hay con người\" đã lỗi thời. Hỏi đúng hơn: làm sao làm việc cùng AI hiệu quả nhất?"
        : "\"AI냐 인간이냐\"는 구시대 질문입니다. 올바른 질문은: AI와 어떻게 효율적으로 협업할까?",
      img: "https://res.cloudinary.com/dcbythlhu/image/upload/q_auto/f_auto/v1779957956/482203736_1084404486822514_556847603464305365_n_ywd2f6.jpg",
    },
    {
      n: "02 —",
      title: vi ? "Tập trung vào vấn đề của bạn" : "당신의 문제에 집중하기",
      desc: vi
        ? "Đừng bị cuốn theo tool mới nhất. Chỉ cần tìm giải pháp phù hợp với nhu cầu thực của bản thân."
        : "최신 툴을 쫓지 마세요. 내 실제 필요에 맞는 솔루션만 찾으면 됩니다.",
      img: "https://res.cloudinary.com/dcbythlhu/image/upload/q_auto/f_auto/v1779957956/480664070_1421344219273717_766603543067293344_n_ml1aws.jpg",
    },
    {
      n: "03 —",
      title: vi ? "Test, fail, learn và lặp lại" : "테스트, 실패, 학습 그리고 반복",
      desc: vi
        ? "Tinh thần startup: đừng chần chừ vì sợ sai. Thử nghiệm nhanh sẽ giúp bạn vượt giới hạn bản thân."
        : "스타트업 정신: 실수가 두렵다고 망설이지 마세요. 빠른 실험이 한계를 넘게 해줍니다.",
      img: "https://res.cloudinary.com/dcbythlhu/image/upload/q_auto/f_auto/v1779957956/481248195_1422998545774951_8723276155117443191_n_mywrxk.jpg",
    },
  ];

  return (
    <section style={{ padding: "100px 40px", background: "var(--white)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div {...fadeUp(0)} style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--o)", marginBottom: 16 }}>
          {vi ? "Triết lý" : "철학"}
        </motion.div>
        <motion.h2 {...fadeUp(0.1)} style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 56 }}>
          {vi ? <>Ba điều chúng tôi<br />xây dựng ở đây.</> : <>우리가 여기서<br />만들어가는 세 가지.</>}
        </motion.h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0 }}>
          {values.map((v, i) => (
            <motion.div key={i} {...fadeUp(0.12 * i)}
              style={{ paddingRight: i < 2 ? 32 : 0, paddingLeft: i > 0 ? 32 : 0, borderRight: i < 2 ? "1px solid var(--gray-line)" : "none" }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--o)", letterSpacing: 1, marginBottom: 12 }}>{v.n}</div>
              <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, lineHeight: 1.35 }}>{v.title}</div>
              <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75, marginBottom: 24 }}>{v.desc}</div>
              <div style={{ height: 280, borderRadius: 12, overflow: "hidden", border: "1px solid var(--gray-line)" }}>
                <img src={v.img} alt={v.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Korea Community ───────────────────────────────────────────────────────────
export function KoreaCommunity() {
  const { lang } = useLang();
  const vi = lang === "vi";

  return (
    <section style={{ padding: "100px 40px", background: "#111", color: "#fff", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-30%", right: "-15%", width: 700, height: 600, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(241,90,34,0.15) 0%,transparent 60%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <motion.div {...fadeUp(0)} style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--o)", marginBottom: 16, display: "inline-flex", alignItems: "center", gap: 10 }}>
          <span style={{ display: "inline-block", width: 28, height: 1, background: "var(--o)" }} />
          {vi ? "Chúng tôi đã làm điều này ở Seoul" : "서울에서 이미 했습니다"}
        </motion.div>
        <motion.h2 {...fadeUp(0.1)} style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 12, color: "#fff" }}>
          {vi ? <>Và nó thực sự <em style={{ color: "var(--o)", fontStyle: "normal" }}>hiệu quả.</em></> : <>그리고 정말 <em style={{ color: "var(--o)", fontStyle: "normal" }}>효과적이었습니다.</em></>}
        </motion.h2>
        <motion.p {...fadeUp(0.18)} style={{ fontSize: 15, color: "#9A9890", lineHeight: 1.75, marginBottom: 48, maxWidth: 540 }}>
          {vi
            ? "Cùng mô hình, cùng tinh thần — học viên Seoul đã tự build sản phẩm thật trong 4 tuần."
            : "같은 모델, 같은 정신으로 — 서울 수강생들은 4주 만에 실제 제품을 만들었습니다."}
        </motion.p>

        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 32, alignItems: "center" }}>
          <motion.div {...fadeUp(0.2)} style={{ display: "grid", gap: 10 }}>
            <div style={{ aspectRatio: "16/9", borderRadius: 12, overflow: "hidden", border: "0.5px solid #2a2a2a" }}>
              <img src="https://res.cloudinary.com/dcbythlhu/image/upload/q_auto/f_auto/v1780139004/section4_img3_u3gu9b.png" alt="Demo Day Seoul" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ aspectRatio: "4/3", borderRadius: 12, overflow: "hidden", border: "0.5px solid #2a2a2a" }}>
                <img src="https://res.cloudinary.com/dcbythlhu/image/upload/q_auto/f_auto/v1780138999/section4_img4_zeo4cg.png" alt="Co-study" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ aspectRatio: "4/3", borderRadius: 12, overflow: "hidden", border: "0.5px solid #2a2a2a" }}>
                <img src="https://res.cloudinary.com/dcbythlhu/image/upload/q_auto/f_auto/v1780138998/section4_img2_vufetl.png" alt="MVP showcase" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.28)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid #2a2a2a", borderLeft: "3px solid var(--o)", borderRadius: "0 12px 12px 0", padding: "20px 20px 18px 22px" }}>
              <p style={{ fontSize: 14, fontStyle: "italic", lineHeight: 1.75, color: "#e8e8ec", marginBottom: 10 }}>
                {vi
                  ? '"Trước lớp học tôi chỉ biết dùng ChatGPT để viết email. Sau 4 tuần tôi đã tự build tool tổng hợp báo cáo cho cả team — không viết một dòng code nào."'
                  : '"수업 전에는 이메일 쓸 때만 ChatGPT를 썼어요. 4주 후에는 코드 한 줄 없이 팀 전체 보고서를 자동화하는 툴을 만들었습니다."'}
              </p>
              <p style={{ fontSize: 12, color: "#9A9890" }}>— Kim Jiyeon · Seoul Cohort 01 · Marketing Manager</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
              {[
                { n: "47", l: vi ? "Học viên Seoul" : "서울 수강생", acc: false },
                { n: "38", l: vi ? "MVP đã ra mắt" : "출시된 MVP", acc: false },
                { n: "4.9", l: vi ? "Đánh giá / 5" : "평점 / 5", acc: true },
              ].map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid #2a2a2a", borderRadius: 10, padding: "16px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -1, color: s.acc ? "var(--o)" : "#fff", lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 10, color: "#9A9890", marginTop: 6, letterSpacing: 0.3, textTransform: "uppercase", fontWeight: 600 }}>{s.l}</div>
                </div>
              ))}
            </div>

            <a
              href="https://likelion.net/b2b"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "var(--o)", color: "#fff", padding: "14px 24px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none", width: "100%", boxSizing: "border-box" }}
            >
              {vi ? "Xem lớp học ở Seoul →" : "서울 클래스 보기 →"}
            </a>
            <p style={{ fontSize: 11, color: "#6e6e76", textAlign: "center" }}>
              likelion.net · {vi ? "Chương trình gốc từ Hàn Quốc" : "한국 원본 프로그램"}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Early Access ──────────────────────────────────────────────────────────────
const inputSt = { width: "100%", background: "var(--white)", border: "1px solid var(--gray-line)", color: "var(--black)", padding: "11px 14px", borderRadius: 8, fontSize: 14, outline: "none", fontFamily: "var(--fs)" };

function FormField({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--muted)", marginBottom: 6, letterSpacing: 0.5, textTransform: "uppercase" }}>{label}</label>
      {children}
    </div>
  );
}

export function EarlyAccess() {
  const { lang } = useLang();
  const vi = lang === "vi";
  const benefits = vi
    ? ["Tiết kiệm 500,000đ so với giá chính thức", "Vào cộng đồng Discord builders HCMC"]
    : ["정가 대비 500,000đ 할인", "HCMC 빌더 Discord 커뮤니티 입장"];

  return (
    <section id="early" style={{ padding: "100px 40px", background: "var(--white)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-30%", left: "50%", transform: "translateX(-50%)", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle,rgba(241,90,34,0.05) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div {...fadeUp(0)} style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--o)", marginBottom: 16 }}>Early Access</motion.div>
        <motion.h2 {...fadeUp(0.1)} style={{ fontSize: "clamp(28px,3.5vw,52px)", fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 56 }}>
          {vi ? <>Đăng ký sớm.<br /><span style={{ color: "var(--muted)" }}>Học với giá tốt nhất.</span></> : <>지금 신청하고<br /><span style={{ color: "var(--muted)" }}>얼리버드 혜택 받기.</span></>}
        </motion.h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          {/* Left: price + benefits */}
          <motion.div {...fadeUp(0.15)}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, border: "1px solid rgba(241,90,34,0.3)", background: "rgba(241,90,34,0.07)", color: "var(--o)", fontSize: 11, fontWeight: 700, padding: "7px 14px", borderRadius: 100, marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--o)", display: "inline-block", animation: "blink 1.5s infinite" }} />
              {vi ? "Chỉ còn 10 suất early bird" : "얼리버드 10자리 한정"}
            </div>
            <div style={{ fontSize: 14, color: "var(--muted2)", textDecoration: "line-through", marginBottom: 4 }}>{vi ? "3,000,000 VNĐ" : "정가 3,000,000 VNĐ"}</div>
            <div style={{ fontSize: "clamp(44px,5vw,72px)", fontWeight: 700, letterSpacing: -3, lineHeight: 1, color: "var(--o)" }}>
              2,500,000
            </div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 6, marginBottom: 32 }}>VNĐ / {vi ? "khoá học · 4 tuần offline" : "4주 오프라인 과정"}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {benefits.map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(241,90,34,0.12)", color: "var(--o)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</div>
                  {b}
                </div>
              ))}
            </div>
          </motion.div>
          {/* Right: form */}
          <motion.div {...fadeUp(0.25)}
            style={{ background: "var(--gray-bg)", border: "1px solid var(--gray-line)", borderRadius: 20, padding: "36px 32px" }}
          >
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, letterSpacing: -0.5 }}>{vi ? "Giữ chỗ ngay" : "자리 예약하기"}</div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 24, lineHeight: 1.6 }}>{vi ? "Điền thông tin, team Lions liên hệ trong 24h." : "24시간 내에 연락드립니다."}</div>

            <FormField label={vi ? "Họ và tên" : "성함"}>
              <input type="text" placeholder={vi ? "Nguyễn Văn A" : "홍길동"} style={inputSt} />
            </FormField>
            <FormField label="Email">
              <input type="email" placeholder="your@email.com" style={inputSt} />
            </FormField>
            <FormField label={vi ? "Số điện thoại" : "연락처"}>
              <input type="tel" placeholder={vi ? "0901 234 567" : "010-1234-5678"} style={inputSt} />
            </FormField>

            <FormField label={vi ? "Công việc hiện tại" : "현재 직업"}>
              <select style={inputSt} defaultValue="">
                <option value="" disabled>{vi ? "Chọn công việc..." : "선택..."}</option>
                {(vi
                  ? ["Designer", "Marketer", "PM / PO", "Sales / BD", "Founder / Owner", "HR / Ops", "Lập trình viên", "Sinh viên", "Khác"]
                  : ["Designer", "Marketer", "PM / PO", "Sales / BD", "Founder", "HR / Ops", "개발자", "학생", "기타"]
                ).map(o => <option key={o}>{o}</option>)}
              </select>
            </FormField>

            <FormField label={vi ? "Bạn muốn build gì với AI? (chọn nhiều)" : "AI로 무엇을 만들고 싶으신가요? (복수)"}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 4 }}>
                {(vi
                  ? ["AI Automation cho công việc", "AI Agent / Chatbot", "Sản phẩm SaaS / Web app", "Tool nội bộ cho team", "AI cho content / marketing", "AI cho phân tích dữ liệu", "Chưa rõ, muốn khám phá"]
                  : ["업무 자동화", "AI 에이전트 / 챗봇", "SaaS / 웹 앱", "팀 내부 도구", "콘텐츠 / 마케팅 AI", "데이터 분석 AI", "아직 미정"]
                ).map(opt => (
                  <label key={opt} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--black)", cursor: "pointer", padding: "8px 10px", background: "var(--white)", border: "1px solid var(--gray-line)", borderRadius: 6 }}>
                    <input type="checkbox" name="goal" value={opt} style={{ accentColor: "var(--o)" }} />
                    {opt}
                  </label>
                ))}
              </div>
            </FormField>

            <FormField label={vi ? "Trình độ AI hiện tại" : "현재 AI 수준"}>
              <select style={inputSt} defaultValue="">
                <option value="" disabled>{vi ? "Chọn trình độ..." : "선택..."}</option>
                {(vi
                  ? ["Mới bắt đầu, đang khám phá", "Dùng ChatGPT / Claude thường xuyên", "Đã thử build nhưng chưa ra sản phẩm", "Đã build được, muốn nâng cao"]
                  : ["입문자", "ChatGPT / Claude 자주 사용", "빌드 시도 중", "이미 빌드 경험"]
                ).map(o => <option key={o}>{o}</option>)}
              </select>
            </FormField>

            <FormField label={vi ? "Bạn nghe về khoá học từ đâu?" : "어디서 알게 되셨나요?"}>
              <select style={inputSt} defaultValue="">
                <option value="" disabled>{vi ? "Chọn nguồn..." : "선택..."}</option>
                {["Facebook", "Instagram", "TikTok", "LinkedIn", vi ? "Bạn bè giới thiệu" : "지인 추천", vi ? "Khác" : "기타"].map(o => <option key={o}>{o}</option>)}
              </select>
            </FormField>

            <label style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "var(--muted)", cursor: "pointer", marginTop: 8, marginBottom: 14, lineHeight: 1.5 }}>
              <input type="checkbox" defaultChecked style={{ accentColor: "var(--o)", marginTop: 2, flexShrink: 0 }} />
              <span>{vi ? "Tôi đồng ý nhận email và SMS cập nhật từ HCMC Lions" : "HCMC Lions의 이메일 및 SMS 수신에 동의합니다"}</span>
            </label>

            <button style={{ width: "100%", background: "var(--o)", color: "#fff", border: "none", padding: 15, borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "var(--fs)", marginTop: 4, letterSpacing: -0.3 }}>
              {vi ? "Đăng ký giữ chỗ →" : "얼리버드 신청하기 →"}
            </button>
            <p style={{ fontSize: 11, color: "var(--muted2)", textAlign: "center", marginTop: 10 }}>
              {vi ? "Team Lions liên hệ trong 24h!" : "24시간 내에 연락드립니다!"}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
export function FAQ() {
  const { lang } = useLang();
  const vi = lang === "vi";
  const faqs = [
    { q: vi ? "Không biết code có học được không?" : "코딩 몰라도 되나요?", a: vi ? "Hoàn toàn được. Không yêu cầu lập trình. Chỉ cần vấn đề thực tế và tinh thần muốn thử." : "물론입니다. 프로그래밍 없이도 참여 가능합니다." },
    { q: vi ? "Học offline hay online?" : "오프라인인가요?", a: vi ? "Offline tại HCMC, thứ 7 hàng tuần, 2 giờ mỗi buổi. Ngồi cùng phòng với 20 người cùng mục tiêu." : "HCMC에서 매주 토요일 2시간 오프라인 진행입니다." },
    { q: vi ? "Khi nào khai giảng?" : "개강일은 언제인가요?", a: vi ? "Sau khi đủ 20 học viên. Early bird được thông báo đầu tiên và vote lịch học." : "수강생 20명이 모이면 확정합니다. 얼리버드에게 먼저 안내드립니다." },
    { q: vi ? "2 giờ mỗi tuần có đủ không?" : "주 2시간이 충분할까요?", a: vi ? "Đó là lý do thiết kế mô hình này. 2 giờ tập trung hiệu quả hơn học rải rác cho người bận." : "분산 학습 대신 집중 2시간이 바쁜 분들께 더 효과적입니다." },
  ];
  const [open, setOpen] = React.useState(null);
  return (
    <section style={{ padding: "100px 40px", background: "var(--gray-bg)" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div>
          <motion.div {...fadeUp(0)} style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--o)", marginBottom: 16 }}>FAQ</motion.div>
          <motion.h2 {...fadeUp(0.1)} style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 40 }}>
            {vi ? <>Câu hỏi<br />thường gặp.</> : <>자주 묻는<br />질문들.</>}
          </motion.h2>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: "1px solid var(--gray-line)" }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", background: "none", border: "none", textAlign: "left", cursor: "pointer", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, fontFamily: "var(--fs)", fontSize: 14, fontWeight: 600, color: "var(--black)" }}>
                {f.q}
                <span style={{ fontSize: 20, color: "var(--muted2)", transition: "transform .2s", transform: open === i ? "rotate(45deg)" : "none", lineHeight: 1, flexShrink: 0 }}>+</span>
              </button>
              <motion.div animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }} initial={{ height: 0, opacity: 0 }} style={{ overflow: "hidden" }}>
                <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, paddingBottom: 20 }}>{f.a}</div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Need React import for useState in FAQ
import React from "react";
