import { motion } from "framer-motion";
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
      quote: ""Nếu AI làm được việc này, tôi có thể nhận thêm 2 client nữa."",
    },
    {
      n: "03",
      img: "/images/target-3.png",
      title: "Builder muốn ra sản phẩm đầu tiên",
      desc: "Ý tưởng thì có, nhưng không biết bắt đầu từ đâu và không muốn học code từ đầu.",
      quote: ""Tôi muốn build cái gì đó thật không chỉ xem tutorial."",
    },
  ];

  return (
    <section style={{ padding: "100px 40px", background: "#F8F7F5" }}>
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
  const steps = [
    {
      n: "01",
      title: vi ? "Giới hạn của AI chat" : "AI 채팅의 한계",
      desc: vi ? "Copy, paste, hỏi lại — đây chưa phải tận dụng AI. Chatbox chỉ là bề nổi." : "복사, 붙여넣기, 반복 질문 — 이건 진짜 AI 활용이 아닙니다.",
    },
    {
      n: "02",
      title: vi ? "AI bước ra ngoài chatbox" : "AI가 채팅창 밖으로",
      desc: vi ? "Đọc file, tạo tài liệu, build app — AI chạy trực tiếp trên máy tính của bạn." : "파일 읽기, 앱 제작, 자동화 — AI가 내 컴퓨터에서 직접 작동합니다.",
    },
    {
      n: "03",
      title: vi ? "Không khó — khi làm cùng nhau" : "함께하면 어렵지 않습니다",
      desc: vi ? "HCMC Lions là co-studying: cùng học, cùng build, cùng ra sản phẩm thật." : "HCMC Lions는 코스터디입니다. 함께 만들고, 함께 결과물을 냅니다.",
    },
  ];
  return (
    <section style={{ padding: "100px 40px", background: "var(--white)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div>
          <motion.div {...fadeUp(0)} style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--o)", marginBottom: 16 }}>
            {vi ? "Tại sao khác biệt?" : "왜 다른가요?"}
          </motion.div>
          <motion.h2 {...fadeUp(0.1)} style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 48 }}>
            {vi ? <>'Solo-entrepreneur era.'<br />Vậy sao vẫn chỉ <em style={{ color: "var(--o)", fontStyle: "normal" }}>đang chat?</em></> : <>'1인 기업가 시대'.<br />그런데 아직도 <em style={{ color: "var(--o)", fontStyle: "normal" }}>채팅창에만?</em></>}
          </motion.h2>
          {steps.map((s, i) => (
            <motion.div key={i} {...fadeUp(0.1 * i)}
              style={{ display: "grid", gridTemplateColumns: "52px 1fr", gap: 20, padding: "28px 0", borderTop: "1px solid var(--gray-line)" }}
            >
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--muted2)", letterSpacing: 1 }}>STEP</div>
                <div style={{ fontSize: 30, fontWeight: 700, color: "var(--o)", letterSpacing: -1.5, lineHeight: 1 }}>{s.n}</div>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{s.title}</div>
                <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75 }}>{s.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Early Access ──────────────────────────────────────────────────────────────
export function EarlyAccess() {
  const { lang } = useLang();
  const vi = lang === "vi";
  const benefits = vi
    ? ["Tiết kiệm 500,000đ so với giá chính thức", "Vote nội dung curriculum theo nhu cầu thực", "Cohort 20 người — mentor hướng dẫn trực tiếp", "Vào cộng đồng Discord builders HCMC"]
    : ["정가 대비 500,000đ 할인", "커리큘럼 투표 참여권", "20명 소규모 — 멘토 1:1 지원", "HCMC 빌더 Discord 커뮤니티 입장"];

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
            <div style={{ fontSize: "clamp(44px,5vw,72px)", fontWeight: 700, letterSpacing: -3, lineHeight: 1, color: "var(--black)" }}>
              2,500<span style={{ color: "var(--o)" }}>,000</span>
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
            style={{ background: "var(--gray-bg)", border: "1px solid var(--gray-line)", borderRadius: 20, padding: "40px 36px" }}
          >
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, letterSpacing: -0.5 }}>{vi ? "Giữ chỗ ngay" : "자리 예약하기"}</div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 28, lineHeight: 1.6 }}>{vi ? "Điền thông tin, team Lions liên hệ trong 24h." : "24시간 내에 연락드립니다."}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              {[{ label: vi ? "Họ và tên" : "성함", id: "name", placeholder: vi ? "Nguyễn Văn A" : "홍길동", type: "text" },
                { label: vi ? "Điện thoại" : "연락처", id: "phone", placeholder: vi ? "0901 234 567" : "010-1234-5678", type: "tel" }].map((f) => (
                <div key={f.id}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--muted)", marginBottom: 6, letterSpacing: .5, textTransform: "uppercase" }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} style={{ width: "100%", background: "var(--white)", border: "1px solid var(--gray-line)", color: "var(--black)", padding: "11px 14px", borderRadius: 8, fontSize: 14, outline: "none", fontFamily: "var(--fs)" }} />
                </div>
              ))}
            </div>
            {[{ label: "Email", type: "email", placeholder: "your@email.com" },
              { label: vi ? "Bạn muốn build gì?" : "무엇을 만들고 싶으신가요?", type: "textarea", placeholder: vi ? "Dashboard, automation, web app..." : "대시보드, 자동화 봇, 웹 앱..." }].map((f, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--muted)", marginBottom: 6, letterSpacing: .5, textTransform: "uppercase" }}>{f.label}</label>
                {f.type === "textarea"
                  ? <textarea placeholder={f.placeholder} rows={3} style={{ width: "100%", background: "var(--white)", border: "1px solid var(--gray-line)", color: "var(--black)", padding: "11px 14px", borderRadius: 8, fontSize: 14, outline: "none", fontFamily: "var(--fs)", resize: "vertical" }} />
                  : <input type={f.type} placeholder={f.placeholder} style={{ width: "100%", background: "var(--white)", border: "1px solid var(--gray-line)", color: "var(--black)", padding: "11px 14px", borderRadius: 8, fontSize: 14, outline: "none", fontFamily: "var(--fs)" }} />}
              </div>
            ))}
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
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
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
        <motion.div {...fadeUp(0.2)}
          style={{ background: "var(--white)", border: "1px solid var(--gray-line)", borderRadius: 16, padding: 36, position: "sticky", top: 100 }}
        >
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.8, marginBottom: 12, lineHeight: 1.3 }}>
            {vi ? "Bạn cũng có thể build điều này." : "당신도 이걸 만들 수 있습니다."}
          </div>
          <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75, marginBottom: 24 }}>
            {vi ? "4 tuần, 2 giờ mỗi thứ 7. Không cần code." : "4주, 매주 토요일 2시간. 코딩 불필요."}
          </div>
          <a href="#early" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "var(--o)", color: "#fff", padding: "14px 28px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none", marginBottom: 12 }}>
            {vi ? "Đăng ký giữ chỗ →" : "얼리버드 신청하기 →"}
          </a>
          <p style={{ fontSize: 11, color: "var(--muted2)", textAlign: "center" }}>
            {vi ? "⚡ Còn 10 suất · 2,500,000 VNĐ" : "⚡ 10자리 한정 · 2,500,000 VNĐ"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Need React import for useState in FAQ
import React from "react";
