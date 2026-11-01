import { useEffect, useState } from "react";
import "../Gallery.css";

// Replace these image URLs with your event photographs whenever they are ready.
const galleryPhotos = [
    { src: "/gallery/IMG_0015.jpeg", alt: "Wolf of Dalal Street event photograph 1", caption: "THE EVENT BEGINS" },
    { src: "/gallery/IMG_0016.jpeg", alt: "Wolf of Dalal Street event photograph 2", caption: "TEAM IN ACTION" },
    { src: "/gallery/IMG_0017.jpeg", alt: "Wolf of Dalal Street event photograph 3", caption: "THE PEOPLE BEHIND WDS" },
    { src: "/gallery/IMG_0018.jpeg", alt: "Wolf of Dalal Street event photograph 4", caption: "MARKET FLOOR MOMENTS" },
    { src: "/gallery/IMG_0019.jpeg", alt: "Wolf of Dalal Street event photograph 5", caption: "FOCUS ON THE GAME" },
    { src: "/gallery/IMG_0021.jpeg", alt: "Wolf of Dalal Street event photograph 6", caption: "IDEAS IN MOTION" },
    { src: "/gallery/IMG_0022.jpeg", alt: "Wolf of Dalal Street event photograph 7", caption: "THE TEAM SPIRIT" },
    { src: "/gallery/IMG_0023.jpeg", alt: "Wolf of Dalal Street event photograph 8", caption: "MAKING MOVES" },
    { src: "/gallery/IMG_0024.jpeg", alt: "Wolf of Dalal Street event photograph 9", caption: "BUILT TOGETHER" },
    { src: "/gallery/IMG_0025.jpeg", alt: "Wolf of Dalal Street event photograph 10", caption: "A ROOM FULL OF IDEAS" },
    { src: "/gallery/IMG_0026.jpeg", alt: "Wolf of Dalal Street event photograph 11", caption: "COLLABORATION IN ACTION" },
    { src: "/gallery/IMG_0027.jpeg", alt: "Wolf of Dalal Street event photograph 12", caption: "THE TRADING FLOOR" },
    { src: "/gallery/IMG_0028.jpeg", alt: "Wolf of Dalal Street event photograph 13", caption: "STRATEGY AT WORK" },
    { src: "/gallery/IMG_0029.jpeg", alt: "Wolf of Dalal Street event photograph 14", caption: "MOMENTS BETWEEN MOVES" },
    { src: "/gallery/IMG_0030.jpeg", alt: "Wolf of Dalal Street event photograph 15", caption: "ON THE FLOOR" },
    { src: "/gallery/IMG_0031.jpeg", alt: "Wolf of Dalal Street event photograph 16", caption: "THE WDS EXPERIENCE" },
    { src: "/gallery/IMG_0032.jpeg", alt: "Wolf of Dalal Street event photograph 17", caption: "TEAMWORK IN MOTION" },
    { src: "/gallery/IMG_0033.jpeg", alt: "Wolf of Dalal Street event photograph 18", caption: "THE PEOPLE OF WDS" },
    { src: "/gallery/IMG_0034.jpeg", alt: "Wolf of Dalal Street event photograph 19", caption: "A MOMENT TO REMEMBER" },
    { src: "/gallery/IMG_0035.jpeg", alt: "Wolf of Dalal Street event photograph 20", caption: "THE ENERGY OF WDS" },
    { src: "/gallery/IMG_0036.jpeg", alt: "Wolf of Dalal Street event photograph 21", caption: "BEHIND THE SCENES" },
    { src: "/gallery/IMG_0037.jpeg", alt: "Wolf of Dalal Street event photograph 22", caption: "THE EXECUTIVE TEAM" },
    { src: "/gallery/IMG_0038.jpeg", alt: "Wolf of Dalal Street event photograph 23", caption: "A SHARED VISION" },
    { src: "/gallery/IMG_0039.jpeg", alt: "Wolf of Dalal Street event photograph 24", caption: "THE WDS COMMUNITY" },
    { src: "/gallery/IMG_0040.jpeg", alt: "Wolf of Dalal Street event photograph 25", caption: "MAKING MEMORIES" },
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
                    <span className="gallery-card-caption">
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <span>{photo.caption}</span>
                    </span>
                </button>
            ))}
        </div>
    );

    return (
        <main className="gallery-page">
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
                        <figcaption>
                            <span>{String(activePhoto + 1).padStart(2, "0")} / {String(galleryPhotos.length).padStart(2, "0")}</span>
                            <span>{galleryPhotos[activePhoto].caption}</span>
                        </figcaption>
                    </figure>
                    <button className="lightbox-nav lightbox-next" type="button" onClick={(event) => { event.stopPropagation(); showNext(); }} aria-label="Next photograph">›</button>
                </div>
            )}
        </main>
    );
}

export default Gallery;
