import { useRef, useState, useEffect } from 'react';
import { useScrollReveal, revealClass, revealTransition } from '@/hooks/useScrollReveal';

/* ─── Brush-style checkmark icon ─── */
function BrushCheck() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5 flex-shrink-0 mt-0.5">
      <path
        d="M6 17 L13 24 L27 8"
        stroke="#8B1E1E"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: 'url(#brushRough)' }}
      />
      <defs>
        <filter id="brushRough">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="1" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.5" />
        </filter>
      </defs>
    </svg>
  );
}

/* ─── Decorative divider with seal icon ─── */
function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-4 mb-10">
      <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#BA7517]/50" />
      <div className="w-3 h-3 rotate-45 border border-[#BA7517]/60 bg-[#FAC775]/30" />
      <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#BA7517]/50" />
    </div>
  );
}

/* ─── Count-up hook (Intersection Observer, fires once) ─── */
function useCountUp(target: number, duration: number, start: boolean) {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start || done) return;
    let raf: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setValue(target);
        setDone(true);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, done, target, duration]);

  return { value, done };
}

/* ─── Stat card ─── */
function StatCard({
  target,
  suffix,
  label,
  start,
  duration,
  delay,
}: {
  target: number;
  suffix: string;
  label: string;
  start: boolean;
  duration: number;
  delay: number;
}) {
  const { value, done } = useCountUp(target, duration, start);

  return (
    <div
      className={`group bg-white rounded-2xl px-6 py-10 text-center border border-[#BA7517]/40 shadow-sm hover:shadow-xl hover:border-[#BA7517]/70 transition-all duration-300 hover:-translate-y-1 ${revealTransition} ${revealClass(start)}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="font-sans text-5xl sm:text-6xl font-extrabold text-brand-red leading-none tracking-tight">
        {value}
        <span
          className={`inline-block transition-all duration-500 ${
            done ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
          }`}
        >
          {suffix}
        </span>
      </div>
      <p className="font-sans text-sm sm:text-base text-gray-600 mt-3 leading-snug">
        {label}
      </p>
    </div>
  );
}

/* ─── Feature list item ─── */
const features = [
  'Lộ trình học rõ ràng',
  'Giảng viên chất lượng cao',
  'Giáo trình độc quyền',
  'Luyện thi HSK hiệu quả',
];

export default function AboutSection() {
  const { ref: textRef, visible: textVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: imageRef, visible: imageVisible } = useScrollReveal<HTMLDivElement>();
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="gioi-thieu" className="relative bg-brand-cream py-20 sm:py-28 px-6">
      {/* ─── BLOCK 1: INTRODUCTION ─── */}
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          {/* Left: text content */}
          <div
            ref={textRef}
            className={`${revealTransition} ${revealClass(textVisible)}`}
          >
            <p className="font-sans text-xs tracking-[0.3em] text-[#BA7517] uppercase mb-4">
              Trung tâm tiếng Trung
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-red leading-tight mb-6">
              Giới Thiệu Về ThanhMaiHSK
            </h2>
            <p className="font-sans text-gray-600 leading-relaxed mb-8">
              ThanhMaiHSK là Hệ sinh thái đào tạo năng lực tiếng Trung toàn diện
              tại Việt Nam với 15 năm phát triển, đồng hành cùng 100.000+ học viên
              và mạng lưới 20+ cơ sở trên toàn quốc. Chúng tôi định hướng nâng
              chuẩn đào tạo tiếng Trung toàn diện, tập trung vào hiệu quả thực
              tế và khả năng sử dụng ngôn ngữ trong học tập, công việc và môi
              trường quốc tế.
            </p>

            <div className="space-y-4">
              {features.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <BrushCheck />
                  <span className="font-sans text-base font-semibold text-gray-800">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image with decorative framing */}
          <div
            ref={imageRef}
            className={`relative flex justify-center lg:justify-end ${revealTransition} ${revealClass(imageVisible)}`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="relative w-full max-w-[420px]">
              {/* Offset gold border */}
              <div
                className="absolute inset-0 border-2 border-[#BA7517]/60 rounded-xl translate-x-4 translate-y-4"
                aria-hidden
              />
              {/* Image container */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-black/15">
                <img
                  src="https://res.cloudinary.com/qugyphlv/image/upload/v1789005153/hoat-dong_1.jpg"
                  alt="Hoạt động tại ThanhMaiHSK"
                  className="w-full h-[380px] sm:h-[440px] object-cover"
                />
              </div>
              {/* Red seal stamp accent — bottom-left corner */}
              <img
                src="https://res.cloudinary.com/qugyphlv/image/upload/v1789009070/dau-an-removebg-preview.png"
                alt="Ấn triện ThanhMaiHSK"
                className="absolute -bottom-4 -left-4 w-[80px] h-[80px] object-contain rotate-[-12deg] drop-shadow-lg z-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─── BLOCK 2: DIFFERENTIATORS & STATS ─── */}
      <div ref={statsRef} className="max-w-4xl mx-auto mt-24 sm:mt-32">
        <GoldDivider />

        <div className="text-center">
          <p className="font-sans text-xs tracking-[0.3em] text-[#BA7517] uppercase mb-4">
            Khác biệt trong đào tạo tiếng Trung
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-brand-red leading-tight mb-5">
            <span className="font-sans font-extrabold tracking-tight">10</span>{' '}
            Lý Do Nên Chọn Tiếng Trung ThanhMaiHSK
          </h2>
          <p className="font-sans text-gray-600 max-w-2xl mx-auto leading-relaxed mb-14">
            ThanhMaiHSK xây dựng hệ sinh thái học tiếng Trung toàn diện, kết hợp
            giảng viên chất lượng, giáo trình chuẩn và nền tảng học tập hiện đại.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
          <StatCard
            target={15}
            suffix="+"
            label="năm phát triển"
            start={statsVisible}
            duration={1800}
            delay={0}
          />
          <StatCard
            target={100}
            suffix="K+"
            label="học viên đồng hành"
            start={statsVisible}
            duration={2000}
            delay={100}
          />
          <StatCard
            target={20}
            suffix="+"
            label="cơ sở toàn quốc"
            start={statsVisible}
            duration={1800}
            delay={200}
          />
        </div>
      </div>
    </section>
  );
}
