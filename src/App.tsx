import { useEffect } from "react";
import AddChallenge from "./components/AddChl";
import Challenges from "./components/challenges";
import Nav from "./components/nav";
import Lenis from "lenis";
import Footer from "./components/footer";
export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,

    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  return (
    <div className="overflow-y-hidden  relative min-h-screen flex flex-col font-sans text-foreground">
      <div className="absolute inset-0 bg-[url(src/assets/martin-martz-Rlb48BuaeWc-unsplash.jpg)] bg-cover bg-center bg-fixed opacity-60 -z-10" />

      {/* Header */}
      <Nav />

      {/* Body */}
      <h1 className="px-5 pt-8 pb-4 text-3xl font-bold font-serif w-full text-center ">
        My Challenges
      </h1>

      <Challenges />

      {/* Add challenges */}
      <AddChallenge />

      {/* footer */}
      <Footer />
    </div>
  );
}
