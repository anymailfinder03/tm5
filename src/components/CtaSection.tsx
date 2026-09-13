import { useScrollReveal, revealClass, revealTransition } from '@/hooks/useScrollReveal';

export default function CtaSection() {
  const { ref: textRef, visible: textVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: imageRef, visible: imageVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-red to-[#6E1717] px-6 py-20 sm:py-28 lg:py-32">
      <div className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 font-display text-[20rem] leading-none text-white/[0.035]" aria-hidden="true">
        学
      </div>
      <div className="pointer-events-none absolute right-[28%] top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-brand-gold/10 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div
          ref={textRef}
          className={`text-center lg:text-left ${revealTransition} ${revealClass(textVisible)}`}
        >
          <div className="mb-6 flex items-center justify-center gap-4 lg:justify-start">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand-gold/70 sm:w-20 lg:from-brand-gold/70" />
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold">
              Bắt đầu hành trình của bạn
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand-gold/70 sm:w-20 lg:hidden" />
          </div>

          <h2 className="font-display text-3xl leading-tight text-brand-ivory sm:text-4xl lg:text-5xl">
            Sẵn Sàng Chinh Phục Tiếng Trung Cùng ThanhMaiHSK?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-sans leading-relaxed text-white/80 lg:mx-0">
            Đăng ký học thử miễn phí ngay hôm nay để trải nghiệm phương pháp giảng dạy chuẩn quốc tế cùng đội ngũ giảng viên chất lượng cao.
          </p>
          <a
            href="https://zalo.me/0398519485"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex min-h-[48px] items-center rounded-full bg-brand-gold px-8 py-4 font-sans text-base font-bold text-brand-brown shadow-lg shadow-black/25 transition-all duration-300 hover:scale-105 hover:bg-[#E8B563] hover:shadow-[0_0_30px_rgba(250,199,117,0.45)]"
          >
            Học Thử Miễn Phí
          </a>
        </div>

        <div
          ref={imageRef}
          className={`relative mx-auto w-full max-w-[440px] lg:mx-0 lg:justify-self-end ${revealTransition} ${revealClass(imageVisible)}`}
          style={{ transitionDelay: '150ms' }}
        >
          <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl border-2 border-brand-gold/60" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-xl border-2 border-brand-gold bg-brand-ivory p-1 shadow-2xl shadow-black/25">
            <img
              src="https://res.cloudinary.com/qugyphlv/image/upload/v1789257421/cta.webp"
              alt="Học viên ThanhMaiHSK trong lớp học"
              className="block h-auto w-full object-contain"
            />
          </div>
          <img
            src="https://res.cloudinary.com/qugyphlv/image/upload/v1789009070/dau-an-removebg-preview.png"
            alt="Ấn triện ThanhMaiHSK"
            className="absolute -bottom-7 -left-6 z-10 h-[72px] w-[72px] -rotate-12 object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
