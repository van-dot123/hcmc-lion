import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLang } from "../context/LangContext";
import { PORTFOLIO, TAG_COLORS } from "../data/portfolio";
import styles from "./Hero.module.css";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const AVATARS = ["#F15A22", "#4ECDC4", "#E8A020", "#6C5CE7", "#C5C3BC"];

export default function Hero() {
  const { lang } = useLang();
  const vi = lang === "vi";

  return (
    <section className={styles.hero}>
      <div className={styles.bgOrb} />
      <div className={styles.bgGrid} />

      <div className={styles.inner}>
        <div className={styles.cols}>

          {/* LEFT: Text content */}
          <div className={styles.textCol}>
            <motion.div className={styles.eyebrow} {...fadeUp(0.1)}>
              <span className={styles.dot} />
              Likelion Vietnam · AI For Builders · 2026
            </motion.div>

            <motion.h1 className={styles.h1} {...fadeUp(0.22)}>
              {vi ? (
                <>
                  <span className={styles.black}>Từ người dùng AI<br />thành người tạo ra<br /></span>
                  <span className={styles.orange}>sản phẩm với AI.</span>
                </>
              ) : (
                <>
                  <span className={styles.black}>AI 사용자에서<br />AI로 제품을 만드는<br /></span>
                  <span className={styles.orange}>사람으로.</span>
                </>
              )}
            </motion.h1>

            <motion.p className={styles.sub} {...fadeUp(0.34)}>
              {vi
                ? "Xây sản phẩm, automation và công cụ cho chính công việc của bạn — cùng mentor và cộng đồng trong 4 tuần."
                : "내 업무를 위한 제품, 자동화, 도구를 직접 만들어보세요 — 멘토와 커뮤니티와 함께 4주 안에."}
            </motion.p>

            <motion.div className={styles.actions} {...fadeUp(0.44)}>
              <a href="#early" className={styles.btnMain}>
                {vi ? "Đăng ký sớm — còn 10 suất →" : "얼리버드 신청 — 10자리 한정 →"}
              </a>
              <a href="#portfolio" className={styles.btnGhost}>
                {vi ? "Xem kết quả thực ↓" : "결과물 보기 ↓"}
              </a>
            </motion.div>

            <motion.div className={styles.proof} {...fadeUp(0.54)}>
              <div className={styles.avatars}>
                {AVATARS.map((c, i) => (
                  <div key={i} className={styles.av} style={{ background: c, marginLeft: i ? -8 : 0 }}>
                    {i < 4 ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="rgba(255,255,255,0.9)" strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    ) : (
                      <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>+16</span>
                    )}
                  </div>
                ))}
              </div>
              <span className={styles.proofText}>
                <strong>20+ builders</strong>{" "}
                {vi ? "đang đăng ký" : "신청 중"}
              </span>
              <div className={styles.divider} />
              {[
                { num: "4",  label: vi ? "Tuần" : "주" },
                { num: "0",  label: vi ? "Cần biết code" : "코딩 필요" },
                { num: "2h", label: vi ? "Mỗi tuần" : "매주" },
              ].map(({ num, label }) => (
                <div key={label} className={styles.stat}>
                  <span className={styles.statNum}>{num}</span>
                  <span className={styles.statLabel}>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Carousel */}
          <motion.div
            className={styles.carouselCol}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroCarousel lang={lang} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function HeroCarousel({ lang }) {
  const items = PORTFOLIO;
  const total = items.length;
  const [cur, setCur] = useState(1);
  const autoRef = useRef(null);
  const stageRef = useRef(null);

  const startAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCur(c => (c + 1) % total);
    }, 3500);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(autoRef.current);
  }, [total]);

  const getPos = (i) => {
    const d = ((i - cur) % total + total) % total;
    if (d === 0) return "center";
    if (d === 1) return "right";
    if (d === total - 1) return "left";
    return "far";
  };

  const prev = () => { setCur(c => (c - 1 + total) % total); startAuto(); };
  const next = () => { setCur(c => (c + 1) % total); startAuto(); };

  return (
    <div className={styles.carousel}>
      <div
        ref={stageRef}
        className={styles.stage}
        onMouseEnter={() => clearInterval(autoRef.current)}
        onMouseLeave={startAuto}
      >
        {items.map((item, i) => {
          const pos = getPos(i);
          const colors = TAG_COLORS[item.tagColor];
          return (
            <div
              key={item.id}
              className={`${styles.card} ${styles[`pos_${pos}`]}`}
              onClick={() => {
                if (pos === "left") { setCur((cur - 1 + total) % total); startAuto(); }
                if (pos === "right") { setCur((cur + 1) % total); startAuto(); }
              }}
            >
              <div
                className={styles.cardMedia}
                style={{ background: `${item.accent}1A` }}
              >
                {item.video ? (
                  item.video.endsWith(".gif")
                    ? <img src={item.video} alt={item.title} className={styles.cardAsset} />
                    : <video src={item.video} className={styles.cardAsset} loop muted playsInline ref={(el) => { if (el) { pos === "center" ? el.play().catch(()=>{}) : el.pause(); } }} />
                ) : (
                  <>
                    <div className={styles.playBtn} style={{ background: `${item.accent}22`, color: item.accent }}>▶</div>
                    <span className={styles.playLabel} style={{ color: `${item.accent}99` }}>Video Demo · 3s</span>
                  </>
                )}
              </div>
              <div className={styles.cardBody}>
                <span
                  className={styles.cardTag}
                  style={{ color: colors.text, background: colors.bg, borderColor: colors.border }}
                >
                  <span className={styles.tagDot} style={{ background: item.accent }} />
                  {item.tag}
                </span>
                <div className={styles.cardTitle}>{lang === "vi" ? item.title : item.titleKr}</div>
                <div className={styles.cardDesc}>{lang === "vi" ? item.desc : item.descKr}</div>
                <div className={styles.cardBuilt}>
                  <span>Built with </span>{item.built}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.controls}>
        <button className={styles.navBtn} onClick={prev}>←</button>
        <div className={styles.dots}>
          {items.map((_, i) => (
            <button
              key={i}
              className={`${styles.dotBtn} ${i === cur ? styles.dotActive : ""}`}
              onClick={() => { setCur(i); startAuto(); }}
            />
          ))}
        </div>
        <button className={styles.navBtn} onClick={next}>→</button>
      </div>
    </div>
  );
}
