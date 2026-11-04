import { useEffect, useState } from "react";
import "../Gallery.css";

// Replace these image URLs with your event photographs whenever they are ready.
const galleryPhotos = [
    {
        src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85",
        alt: "Modern financial district skyscrapers",
    },
    {
        src: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1000&q=85",
        alt: "City skyline glowing at night",
    },
    {
        src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85",
        alt: "Professional in a suit",
    },
    {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85",
        alt: "Financial charts on a computer screen",
    },
    {
        src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=85",
        alt: "Team collaborating around a table",
    },
    {
        src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85",
        alt: "Contemporary workspace",
    },
    {
        src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85",
        alt: "People working together on a laptop",
    },
    {
        src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=85",
        alt: "Team meeting in a bright room",
    },
];

function Gallery() {
    const [activePhoto, setActivePhoto] = useState(null);

    const closeLightbox = () => setActivePhoto(null);
    const showPrevious = () => {
        setActivePhoto((current) => (current - 1 + galleryPhotos.length) % galleryPhotos.length);
    };
    const showNext = () => {
        setActivePhoto((current) => (current + 1) % galleryPhotos.length);
    };

    useEffect(() => {
        if (activePhoto === null) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") setActivePhoto(null);
            if (event.key === "ArrowLeft") {
                setActivePhoto((current) => (current - 1 + galleryPhotos.length) % galleryPhotos.length);
            }
            if (event.key === "ArrowRight") {
                setActivePhoto((current) => (current + 1) % galleryPhotos.length);
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [activePhoto]);

    const renderSequence = (isDuplicate = false) => (
        <div className="gallery-sequence" aria-hidden={isDuplicate || undefined}>
            {galleryPhotos.map((photo, index) => (
                <button
                    className="gallery-card"
                    type="button"
                    key={`${isDuplicate ? "duplicate-" : "photo-"}${photo.src}`}
                    onClick={() => setActivePhoto(index)}
                    aria-label={`View photo: ${photo.alt}`}
                    tabIndex={isDuplicate ? -1 : 0}
                >
                    <span className="gallery-card-image-wrap">
                        <img src={photo.src} alt={isDuplicate ? "" : photo.alt} loading={isDuplicate || index > 2 ? "lazy" : "eager"} />
                    </span>
                </button>
            ))}
        </div>
    );

    return (
        <main className="gallery-page" id="gallery"><div className="gallery-seam-top" />
            <section className="gallery-intro" aria-labelledby="gallery-title">
                <p className="gallery-eyebrow"><span /> ECON CLUB PRESENTS <span /></p>
                <h1 id="gallery-title">GALLERY</h1>
                <p className="gallery-subtitle">A COLLECTION OF MOMENTS</p>
            </section>

            <section className="gallery-marquee" aria-label="Photo gallery. Hover to pause, select a photograph to enlarge.">
                <div className="gallery-track">
                    {renderSequence()}
                    {renderSequence(true)}
                </div>
            </section>

            <div className="gallery-bottomline">
                <span>WOLF OF DALAL STREET</span>
                <span className="gallery-bottomline-rule" />
                <span>MEMORIES IN MOTION <b>✳</b></span>
            </div>

            {activePhoto !== null && (
                <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Expanded gallery photograph" onClick={closeLightbox}>
                    <button className="lightbox-close" type="button" onClick={closeLightbox} aria-label="Close image preview">×</button>
                    <button className="lightbox-nav lightbox-prev" type="button" onClick={(event) => { event.stopPropagation(); showPrevious(); }} aria-label="Previous photograph">‹</button>
                    <figure className="lightbox-figure" onClick={(event) => event.stopPropagation()}>
                        <img src={galleryPhotos[activePhoto].src} alt={galleryPhotos[activePhoto].alt} />
                    </figure>
                    <button className="lightbox-nav lightbox-next" type="button" onClick={(event) => { event.stopPropagation(); showNext(); }} aria-label="Next photograph">›</button>
                </div>
            )}
        </main>
    );
}

export default Gallery;
