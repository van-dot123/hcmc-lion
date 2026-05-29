import { motion } from "framer-motion";
import { useLang } from "../context/LangContext";
import styles from "./Hero.module.css";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const { lang } = useLang();
  const vi = lang === "vi";

  return (
    <section className={styles.hero}>
      {/* Background decoration */}
      <div className={styles.bgOrb} />
      <div className={styles.bgGrid} />

      <div className={styles.inner}>
        <motion.div className={styles.eyebrow} {...fadeUp(0.1)}>
          <span className={styles.dot} />
          Likelion Vietnam · AI For Builders · 2026
        </motion.div>

        <motion.h1 className={styles.h1} {...fadeUp(0.22)}>
          {vi ? (
            <>
              Tất cả những sản phẩm này<br />
              <em>đều do AI tạo ra.</em><br />
              <span className={styles.dim}>Trong 4 tuần.</span>
            </>
          ) : (
            <>
              이 모든 결과물은<br />
              <em>AI가 만들었습니다.</em><br />
              <span className={styles.dim}>단 4주 만에.</span>
            </>
          )}
        </motion.h1>

        <motion.p className={styles.sub} {...fadeUp(0.34)}>
          {vi
            ? "Web app. Dashboard. Automation. AI Agent. — Không cần code, chỉ 2 giờ mỗi tuần."
            : "웹앱, 대시보드, 자동화, AI 에이전트. 코딩 없이, 매주 2시간으로."}
        </motion.p>

        <motion.div className={styles.actions} {...fadeUp(0.44)}>
          <a href="#early" className={styles.btnMain}>
            {vi ? "Đăng ký sớm — còn 10 suất" : "얼리버드 신청 — 10자리 한정"}
            {" →"}
          </a>
          <a href="#portfolio" className={styles.btnGhost}>
            {vi ? "Xem kết quả thực" : "결과물 보기"} ↓
          </a>
        </motion.div>

        <motion.div className={styles.proof} {...fadeUp(0.54)}>
          <div className={styles.avatars}>
            {["#F15A22","#4ECDC4","#FFB347","#A8E6CF","#C5C3BC"].map((c, i) => (
              <div key={i} className={styles.av} style={{ background: c, marginLeft: i ? -8 : 0 }}>
                {i === 4 ? "+" : ""}
              </div>
            ))}
          </div>
          <span className={styles.proofText}>
            <strong>20+ builders</strong>{" "}
            {vi ? "đang đăng ký" : "신청 중"}
          </span>
          <div className={styles.divider} />
          {[
            { num: "4", label: vi ? "Tuần" : "주" },
            { num: "0", label: vi ? "Cần code" : "코딩 필요" },
            { num: "2h", label: vi ? "Mỗi tuần" : "매주" },
          ].map(({ num, label }) => (
            <div key={label} className={styles.stat}>
              <span className={styles.statNum}>{num}</span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
