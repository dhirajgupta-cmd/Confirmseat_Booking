import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import LiveStats from "./components/LiveStats/LiveStats";
import WhyChooseUs from "./components/WhyChooseUs/WhyChooseUs";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <LiveStats />
      <WhyChooseUs />
      <FAQ />
      <Footer />
    </main>
  );
}