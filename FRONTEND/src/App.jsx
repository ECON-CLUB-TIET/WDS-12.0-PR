import { useEffect, useState } from "react";
import EventOverview from "./components/EventOverview";
import "./App.css";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Timeline from './components/Timeline';
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
// import Register from "./components/Register";

const isRegisterRoute = () => window.location.hash === "#/register";

function App() {
  const [onRegister, setOnRegister] = useState(isRegisterRoute());

  useEffect(() => {
    const onHash = () => {
      const reg = isRegisterRoute();
      setOnRegister(reg);
      if (reg) {
        window.scrollTo(0, 0);
      } else {
        // wait for the main page to mount, then jump to the anchor (or top)
        setTimeout(() => {
          const id = window.location.hash.slice(1);
          const el = id ? document.getElementById(id) : null;
          if (el) el.scrollIntoView();
          else window.scrollTo(0, 0);
        }, 0);
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (onRegister) return <Register />;

  return (
    <>
      <Header />
      <Hero />
      <EventOverview />
      <Timeline />
      <Gallery />
      <Contact />
    </>
  );
}

export default App;
