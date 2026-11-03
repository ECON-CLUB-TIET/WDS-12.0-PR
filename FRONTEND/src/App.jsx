import EventOverview from "./EventOverview";
import './App.css'

import Header from "./components/Header";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Timeline from './components/Timeline';


function App() {
  return (
    <>
      <Header />
      <Hero />
      <EventOverview />
      <Gallery />
      <Contact />
      <Timeline />
    </>
  );
}

export default App;
