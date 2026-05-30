import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LangContext";
import { PORTFOLIO, TAG_COLORS } from "../data/portfolio";
import styles from "./PortfolioCarousel.module.css";

// ─── Card positions relative to active index ───────────────────────────────
function getPosition(index, current, total) {
  const diff = ((index - current) % total + total) % total;
  if (diff === 0) return "center";
  if (diff === 1) return "right";
  if (diff === total - 1) return "left";
  if (diff === 2) return "farRight";
  return "farLeft";
}

const TRANSFORMS = {
  center:   { x: 0,     scale: 1,    rotateY: 0,   opacity: 1,   z: 10 },
  left:     { x: -320,  scale: 0.82, rotateY: 14,  opacity: 0.7, z: 5  },
  right:    { x: 320,   scale: 0.82, rotateY: -14, opacity: 0.7, z: 5  },
  farLeft:  { x: -580,  scale: 0.65, rotateY: 20,  opacity: 0,   z: 1  },
  farRight: { x: 580,   scale: 0.65, rotateY: -20, opacity: 0,   z: 1  },
};

// ─── Video / GIF placeholder ────────────────────────────────────────────────
function MediaArea({ item, isCenter }) {
  const colors = TAG_COLORS[item.tagColor];

  if (item.video) {
    // Supports both .mp4/.webm and .gif
    const isGif = item.video.endsWith(".gif");
    return (
      <div className={styles.mediaWrap}>
        {isGif ? (
          <img
            src={item.video}
            alt={item.title}
            className={styles.mediaAsset}
            loading="lazy"
          />
        ) : (
          <video ref={(el) => { if (el) { isCenter ? el.play().catch(()=>{}) : el.pause(); } }}
            src={item.video}
            className={styles.mediaAsset}
            autoPlay
            loop
            muted
            playsInline
          />
        )}
      </div>
    );
  }

  // Placeholder — swap out once you have real assets
  return (
    <div
      className={styles.placeholder}
      style={{ background: `${item.accent}12`, borderColor: `${item.accent}25` }}
    >
      <div className={styles.placeholderInner}>
        <div className={styles.placeholderIcon} style={{ background: `${item.accent}20`, color: item.accent }}>
          ▶
        </div>
        <span className={styles.placeholderLabel} style={{ color: `${item.accent}99` }}>
          Video demo · 3s
        </span>
      </div>
      {/* Fake browser bar for polish */}
      <div className={styles.fakeBrowserBar}>
        <span className={styles.fbb} style={{ background: "#FF5F57" }} />
        <span className={styles.fbb} style={{ background: "#FEBC2E" }} />
        <span className={styles.fbb} style={{ background: "#28C840" }} />
        <span className={styles.fbbUrl}>{item.id}.app</span>
      </div>
    </div>
  );
}

// ─── Single card ─────────────────────────────────────────────────────────────
function Card({ item, position, onClick }) {
  const { lang } = useLang();
  const t = TRANSFORMS[position];
  const colors = TAG_COLORS[item.tagColor];
  const isCenter = position === "center";

  return (
    <motion.div
      className={styles.card}
      style={{ zIndex: t.z }}
      animate={{
        x: t.x,
        scale: t.scale,
        rotateY: t.rotateY,
        opacity: t.opacity,
      }}
      transition={{ duration: 0.55, ease: [0.34, 1.2, 0.64, 1] }}
      onClick={onClick}
      whileHover={isCenter ? { y: -4 } : {}}
    >
      {/* Tag */}
      <div className={styles.cardHeader}>
        <span
          className={styles.tag}
          style={{ background: colors.bg, color: colors.text, borderColor: colors.border }}
        >
          <span className={styles.tagDot} style={{ background: colors.text }} />
          {item.tag}
        </span>
      </div>

      {/* Media — video / gif / placeholder */}
      <MediaArea item={item} isCenter={isCenter} />

      {/* Info footer */}
      <div className={styles.cardFooter}>
        <div className={styles.cardTitle}>
          {lang === "vi" ? item.title : item.titleKr}
        </div>
        <div className={styles.cardDesc}>
          {lang === "vi" ? item.desc : item.descKr}
        </div>
        <div className={styles.cardBuilt}>
          <span className={styles.builtLabel}>Built with </span>
          {item.built}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main carousel ────────────────────────────────────────────────────────────
export default function PortfolioCarousel() {
  const { lang } = useLang();
  const [current, setCurrent] = useState(0);
  const total = PORTFOLIO.length;
  const autoRef = useRef(null);

  const next = () => setCurrent((c) => (c + 1) % total);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  const startAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 3800);
  };
  const stopAuto = () => clearInterval(autoRef.current);

  useEffect(() => { startAuto(); return stopAuto; }, []);

  function handleCardClick(index) {
    const pos = getPosition(index, current, total);
    if (pos === "left") prev();
    else if (pos === "right") next();
  }

  return (
    <section className={styles.section} id="portfolio">
      <div className={styles.header}>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {lang === "vi" ? "🔥 Kết quả từ học viên" : "🔥 수강생 결과물"}
        </motion.div>

        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {lang === "vi" ? (
            <>Bạn cũng sẽ build<br /><em>được những thứ này.</em></>
          ) : (
            <>당신도 이런 걸<br /><em>만들 수 있습니다.</em></>
          )}
        </motion.h2>

        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.18 }}
        >
          {lang === "vi"
            ? "Không cần background lập trình. Chỉ cần vấn đề muốn giải quyết."
            : "프로그래밍 배경 없이도 됩니다. 해결하고 싶은 문제만 있으면 충분합니다."}
        </motion.p>
      </div>

      {/* Stage */}
      <div
        className={styles.stage}
        onMouseEnter={stopAuto}
        onMouseLeave={startAuto}
      >
        <div className={styles.track} style={{ perspective: 1200 }}>
          {PORTFOLIO.map((item, i) => (
            <Card
              key={item.id}
              item={item}
              position={getPosition(i, current, total)}
              onClick={() => handleCardClick(i)}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button className={styles.navBtn} onClick={prev} aria-label="Previous">←</button>

        <div className={styles.dots}>
          {PORTFOLIO.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to ${i + 1}`}
            />
          ))}
        </div>

        <button className={styles.navBtn} onClick={next} aria-label="Next">→</button>
      </div>

      <p className={styles.footnote}>
        {lang === "vi" ? "* Kết quả thực từ học viên Cohort 1" : "* 실제 수강생 프로젝트 결과물"}
      </p>
    </section>
  );
}
