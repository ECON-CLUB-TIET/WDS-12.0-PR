import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Gallery from "./components/Gallery.jsx";
import "./App.css";

function App() {
    const isGalleryPage = window.location.pathname.replace(/\/+$/, "") === "/gallery";

    return (
        <>
            <Header />
            {isGalleryPage ? <Gallery /> : <Hero />}
        </>
    );
}

export default App;
