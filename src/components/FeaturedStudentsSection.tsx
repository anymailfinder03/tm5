import { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollReveal, revealClass, revealTransition } from '@/hooks/useScrollReveal';

const achievements = [
  'https://res.cloudinary.com/qugyphlv/image/upload/v1789259687/vinh-danh-hoc-vien1_a-4.webp',
  'https://res.cloudinary.com/qugyphlv/image/upload/v1789259686/vinh-danh-hoc-vien1_a-12.webp',
  'https://res.cloudinary.com/qugyphlv/image/upload/v1789259686/vinh-danh-hoc-vien1_a-15.webp',
  'https://res.cloudinary.com/qugyphlv/image/upload/v1789259688/vinh-danh-hoc-vien1_a-3.webp',
  'https://res.cloudinary.com/qugyphlv/image/upload/v1789259688/vinh-danh-hoc-vien1_a-9.webp',
  'https://res.cloudinary.com/qugyphlv/image/upload/v1789259690/vinh-danh-hoc-vien1_a-10.webp',
];

export default function FeaturedStudentsSection() {
  const { ref: headerRef, visible: headerVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: gridRef, visible: gridVisible } = useScrollReveal<HTMLDivElement>();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + achievements.length) % achievements.length));
  }, []);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % achievements.length));
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  return (
    <section id="hoc-vien-tieu-bieu" className="relative overflow-hidden bg-gradient-to-br from-brand-red to-[#6E1717] px-6 py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-16 top-10 font-display text-[18rem] leading-none text-white/[0.035]" aria-hidden="true">榮</div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div
          ref={headerRef}
          className={`mx-auto max-w-3xl text-center ${revealTransition} ${revealClass(headerVisible)}`}
        >
          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand-gold/70 sm:w-20" />
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold">Thành tích học viên</p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand-gold/70 sm:w-20" />
          </div>
          <h2 className="font-display text-3xl leading-tight text-brand-ivory sm:text-4xl lg:text-5xl">
            Học Viên Tiêu Biểu Tại ThanhMaiHSK
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-sans leading-relaxed text-white/75">
            Những thành tích ấn tượng trong kỳ thi HSK/HSKK là minh chứng rõ nét nhất cho chất lượng đào tạo tại ThanhMaiHSK.
          </p>
        </div>

        {/* Framed grid container */}
        <div ref={gridRef} className="relative mt-14 rounded-2xl border border-brand-gold/25 p-4 sm:p-6 lg:p-8">
          {/* Corner ornaments */}
          <span className="absolute -left-px -top-px h-6 w-6 border-l-2 border-t-2 border-brand-gold/60" aria-hidden="true" />
          <span className="absolute -right-px -top-px h-6 w-6 border-r-2 border-t-2 border-brand-gold/60" aria-hidden="true" />
          <span className="absolute -bottom-px -left-px h-6 w-6 border-b-2 border-l-2 border-brand-gold/60" aria-hidden="true" />
          <span className="absolute -bottom-px -right-px h-6 w-6 border-b-2 border-r-2 border-brand-gold/60" aria-hidden="true" />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {achievements.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setLightboxIndex(index)}
                className={`group relative block overflow-hidden rounded-xl border border-brand-gold/60 bg-brand-cream p-2 shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-brand-gold hover:shadow-xl ${revealTransition} ${revealClass(gridVisible)}`}
                style={{ transitionDelay: gridVisible ? `${index * 100}ms` : '0ms' }}
                aria-label={`Xem thành tích học viên ${index + 1}`}
              >
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={src}
                    alt={`Thành tích học viên ${index + 1}`}
                    className="block h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Thành tích học viên phóng to"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute right-4 top-4 rounded-full p-3 text-white transition-colors hover:bg-white/15 hover:text-brand-gold sm:right-7 sm:top-7"
            aria-label="Đóng"
          >
            <X className="h-7 w-7" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-brand-gold/50 p-2 text-white transition-colors hover:bg-brand-gold hover:text-brand-brown sm:left-5 sm:p-3"
            aria-label="Trước"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <img
            src={achievements[lightboxIndex]}
            alt={`Thành tích học viên ${lightboxIndex + 1}`}
            className="max-h-[88vh] max-w-full rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-brand-gold/50 p-2 text-white transition-colors hover:bg-brand-gold hover:text-brand-brown sm:right-5 sm:p-3"
            aria-label="Sau"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Pagination dots */}
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
            {achievements.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(index); }}
                className={`h-2.5 rounded-full transition-all ${index === lightboxIndex ? 'w-6 bg-brand-gold' : 'w-2.5 bg-white/40 hover:bg-white/70'}`}
                aria-label={`Đến ảnh ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
