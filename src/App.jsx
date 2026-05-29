import { LangProvider } from "./context/LangContext";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import PortfolioCarousel from "./components/PortfolioCarousel";
import { WhySection, EarlyAccess, FAQ } from "./components/Sections";
import Footer from "./components/Footer";

export default function App() {
  return (
    <LangProvider>
      <div style={{ minHeight: "100vh" }}>
        <Nav />
        <Hero />
        <Ticker />
        <PortfolioCarousel />
        <WhySection />
        <EarlyAccess />
        <FAQ />
        <Footer />
      </div>
    </LangProvider>
  );
}
