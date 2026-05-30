import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LangContext";
import styles from "./Nav.module.css";

export default function Nav() {
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href="#" className={styles.logo}>
        <span className={styles.logoDot} />
        HCMC Lions
      </a>

      <div className={styles.right}>
        <div className={styles.langToggle}>
          {["vi", "kr"].map((l) => (
            <button
              key={l}
              className={`${styles.langBtn} ${lang === l ? styles.active : ""}`}
              onClick={() => setLang(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <a href="#early" className={styles.cta}>
          {lang === "vi" ? "Giữ chỗ →" : "얼리버드 →"}
        </a>
      </div>
    </motion.nav>
  );
}
