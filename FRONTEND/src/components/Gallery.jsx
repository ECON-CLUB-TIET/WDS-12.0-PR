import { useEffect, useState } from "react";
import "./Gallery.css";

// Photos are hosted publicly in Supabase Storage (bucket "Gallery Photos").
const GALLERY_BASE_URL =
  `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/Gallery%20Photos`;

// IMG_0015 ... IMG_0040 (IMG_0020 does not exist in the bucket)
const PHOTO_NUMBERS = Array.from({ length: 26 }, (_, i) => i + 15).filter((n) => n !== 20);

const ALL_PHOTOS = PHOTO_NUMBERS.map((n) => {
    const name = `IMG_${String(n).padStart(4, "0")}.JPG`;
    return { src: `${GALLERY_BASE_URL}/${name}`, alt: `Wolf of Dalal Street event photo ${n}` };
});
function Gallery() {
    const [activePhoto, setActivePhoto] = useState(null);
    const [failed, setFailed] = useState([]);

    // Drop any photo that fails to load so no broken cards appear.
    const galleryPhotos = ALL_PHOTOS.filter((p) => !failed.includes(p.src));
    const handleError = (src) => setFailed((prev) => (prev.includes(src) ? prev : [...prev, src]));

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
                        <img src={photo.src} alt={isDuplicate ? "" : photo.alt} loading={isDuplicate || index > 2 ? "lazy" : "eager"} onError={() => handleError(photo.src)} />
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
