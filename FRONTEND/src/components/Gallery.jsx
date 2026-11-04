import { useEffect, useState } from "react";
import "../Gallery.css";

// Replace these image URLs with your event photographs whenever they are ready.
const galleryPhotos = [
  "/components/gallery/IMG_0015.JPG",
//   "/gallery/IMG_0016.JPG",
//   "/gallery/IMG_0017.JPG",
//   "/gallery/IMG_0018.JPG",
//   "/gallery/IMG_0019.JPG",
//   "/gallery/IMG_0021.JPG",
//   "/gallery/IMG_0022.jpeg",
//   "/gallery/IMG_0023.jpeg",
//   "/gallery/IMG_0024.jpeg",
//   "/gallery/IMG_0025.jpeg",
//   "/gallery/IMG_0026.jpeg",
//   "/gallery/IMG_0027.jpeg",
//   "/gallery/IMG_0028.jpeg",
//   "/gallery/IMG_0029.jpeg",
//   "/gallery/IMG_0030.jpeg",
//   "/gallery/IMG_0031.jpeg",
//   "/gallery/IMG_0032.jpeg",
//   "/gallery/IMG_0033.jpeg",
//   "/gallery/IMG_0034.jpeg",
//   "/gallery/IMG_0035.jpeg",
//   "/gallery/IMG_0036.jpeg",
//   "/gallery/IMG_0037.jpeg",
//   "/gallery/IMG_0038.jpeg",
//   "/gallery/IMG_0039.jpeg",
//   "/gallery/IMG_0040.jpeg",
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
