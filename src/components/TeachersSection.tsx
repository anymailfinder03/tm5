import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { useScrollReveal, revealClass, revealTransition } from '@/hooks/useScrollReveal';

type Teacher = {
  name: string;
  photo: string;
  education: string[];
  experience: string[];
};

const teachers: Teacher[] = [
  {
    name: 'Ths. Lê Quang Thành',
    photo: 'https://res.cloudinary.com/qugyphlv/image/upload/v1789004660/giang-vien_3.jpg',
    education: [
      'Thạc sĩ Chuyên ngành Ngôn ngữ và Ứng dụng Ngôn ngữ Trung Quốc, Trường Đại học Ngoại ngữ Bắc Kinh (Trung Quốc)',
      'Cử nhân Ngoại ngữ ngành Tiếng Trung Quốc tại trường Đại học Ngoại ngữ, Đại học Quốc gia Hà Nội',
      'Phó tổ trưởng bộ môn Tiếng Trung, Khoa Ngoại ngữ tại Học viện Cảnh sát Nhân dân',
    ],
    experience: [
      'Kinh nghiệm trên 15 năm giảng dạy tiếng Trung Quốc mọi trình độ trực tiếp và trực tuyến, luyện thi HSK, giảng dạy tiếng Trung doanh nghiệp',
      'Giảng viên 5 sao ThanhMaiHSK',
    ],
  },
  {
    name: 'TS. Phạm Huỳnh Sơn',
    photo: 'https://res.cloudinary.com/qugyphlv/image/upload/v1789004661/giang-vien_7.jpg',
    education: ['Tốt nghiệp Thạc sĩ, tiến sĩ Hán Nôm, Đại học Sư phạm Hà Nội', 'Giảng viên khoa Ngoại ngữ, Trường Đại học Phương Đông'],
    experience: ['Trên 10 năm giảng dạy tiếng Trung Quốc, có nhiều lớp đạt thành tích 5 sao tại trung tâm', 'Giảng viên 5 sao ThanhMaiHSK'],
  },
  {
    name: 'Ths. Thái Thị Hà Linh',
    photo: 'https://res.cloudinary.com/qugyphlv/image/upload/v1789004661/giang-vien_5.jpg',
    education: ['Thạc sĩ Sư phạm Hán ngữ Quốc tế, Đại học Sư phạm Thiên Tân, Trung Quốc', 'Cử nhân Đông phương học, Đại học Khoa học Xã hội và Nhân văn', 'Giảng viên thỉnh giảng tại Đại học Khoa học Xã hội và Nhân văn, Đại học FPT'],
    experience: ['Hơn 5 năm kinh nghiệm giảng dạy tiếng Trung cho sinh viên, người đi làm và doanh nhân, đồng thời cung cấp dịch vụ luyện thi HSK và biên phiên dịch', 'Giảng viên 5 sao ThanhMaiHSK'],
  },
  {
    name: 'Ths. Trần Mai Hương',
    photo: 'https://res.cloudinary.com/qugyphlv/image/upload/v1789004660/giang-vien_4.jpg',
    education: ['Thạc sĩ chuyên ngành Giáo dục Hán ngữ Quốc tế, trường Đại học Tây Nam (Trùng Khánh - Trung Quốc)', 'Cử nhân ngôn ngữ Trung Quốc, Đại học Kinh doanh và Công nghệ Hà Nội'],
    experience: ['Trên 10 năm kinh nghiệm giảng dạy tiếng Trung Quốc tổng hợp, luyện thi HSK/HSKK, luyện thi THPT QG, tiếng Trung trẻ em, tiếng Trung doanh nghiệp', 'Giảng viên 5 sao ThanhMaiHSK'],
  },
  {
    name: 'Ths. Nguyễn Thị Thanh Lài',
    photo: 'https://res.cloudinary.com/qugyphlv/image/upload/v1789004657/giang-vien_1.jpg',
    education: ['Thạc sĩ chuyên ngành tiếng Trung Quốc, trường Đại học Ngoại ngữ, Đại học Quốc gia Hà Nội', 'Giảng viên thỉnh giảng trường Đại học Hà Nội'],
    experience: ['Có nhiều năm kinh nghiệm giảng dạy tiếng Trung mọi trình độ, kinh nghiệm nhiều năm luyện thi THPT QG môn tiếng Trung', 'Giảng viên 5 sao ThanhMaiHSK'],
  },
];

function GoldDivider() {
  return (
    <div className="mb-12 flex items-center justify-center gap-4">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-brand-gold-deep/60 sm:w-24" />
      <div className="h-3 w-3 rotate-45 border border-brand-gold-deep/70 bg-brand-gold/30" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-brand-gold-deep/60 sm:w-24" />
    </div>
  );
}

function Stars() {
  return <span className="tracking-[0.12em] text-brand-gold" aria-label="Năm sao">★★★★★</span>;
}

export default function TeachersSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const { ref: headerRef, visible: headerVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: carouselContainerRef, visible: carouselVisible } = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    };
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  useEffect(() => {
    if (!selectedTeacher) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedTeacher(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedTeacher]);

  const pageCount = Math.max(1, teachers.length - visibleCount + 1);

  const scrollToIndex = (index: number) => {
    const carousel = carouselRef.current;
    const firstCard = carousel?.firstElementChild as HTMLElement | null;
    if (!carousel || !firstCard) return;
    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap || getComputedStyle(carousel).gap || '0');
    carousel.scrollTo({ left: index * (firstCard.offsetWidth + gap), behavior: 'smooth' });
    setActiveIndex(index);
  };

  const handleScroll = () => {
    const carousel = carouselRef.current;
    const firstCard = carousel?.firstElementChild as HTMLElement | null;
    if (!carousel || !firstCard) return;
    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap || getComputedStyle(carousel).gap || '0');
    setActiveIndex(Math.min(pageCount - 1, Math.round(carousel.scrollLeft / (firstCard.offsetWidth + gap))));
  };

  return (
    <section id="giang-vien" className="relative overflow-hidden bg-brand-cream px-6 py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-16 top-12 font-display text-[18rem] leading-none text-brand-red/[0.035]" aria-hidden="true">师</div>
      <div className="relative z-10 mx-auto max-w-6xl">
        <div
          ref={headerRef}
          className={`mx-auto max-w-3xl text-center ${revealTransition} ${revealClass(headerVisible)}`}
        >
          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand-gold-deep/60 sm:w-20" />
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold-deep">Đội ngũ giảng viên</p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand-gold-deep/60 sm:w-20" />
          </div>
          <h2 className="font-display text-3xl leading-tight text-brand-red sm:text-4xl lg:text-5xl">Giảng Viên Chất Lượng Cao Tại ThanhMaiHSK</h2>
          <p className="mx-auto mt-5 max-w-2xl font-sans leading-relaxed text-gray-600">Đội ngũ giảng viên giàu kinh nghiệm, trình độ chuyên môn cao, đồng hành cùng học viên trên hành trình chinh phục tiếng Trung.</p>
        </div>

        <div className="mt-10"><GoldDivider /></div>

        <div
          ref={carouselContainerRef}
          className={`relative px-0 sm:px-10 ${revealTransition} ${revealClass(carouselVisible)}`}
          style={{ transitionDelay: '150ms' }}
        >
          <button type="button" onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))} disabled={activeIndex === 0} aria-label="Giảng viên trước" className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-brand-gold-deep bg-brand-cream text-brand-gold-deep shadow-md transition-colors hover:bg-brand-gold hover:text-brand-brown disabled:pointer-events-none disabled:opacity-30 sm:h-11 sm:w-11">
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <div ref={carouselRef} onScroll={handleScroll} className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-8">
            {teachers.map((teacher) => (
              <article key={teacher.name} className="group min-w-0 shrink-0 basis-full snap-start overflow-hidden rounded-2xl border border-brand-gold-light/70 bg-white p-3 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl sm:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-2rem)/2)]">
                <div className="relative overflow-visible">
                  <div className="overflow-hidden rounded-xl border border-brand-gold/60 bg-brand-red">
                    <img src={teacher.photo} alt={teacher.name} className="block h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]" />
                  </div>
                  <div className="absolute -bottom-3 left-4 rounded-full bg-brand-gold px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-wide text-brand-brown shadow-md">
                    Giảng Viên 5 Sao <Stars />
                  </div>
                </div>
                <div className="flex min-h-[178px] flex-col px-3 pb-3 pt-7">
                  <h3 className="font-display text-xl text-brand-red">{teacher.name}</h3>
                  <p className="mt-3 line-clamp-1 font-sans text-sm leading-relaxed text-gray-600" title={teacher.education[0]}>{teacher.education[0]}</p>
                  <button type="button" onClick={() => setSelectedTeacher(teacher)} className="mt-auto inline-flex items-center gap-1.5 self-start pt-5 font-sans text-sm font-semibold text-brand-gold-deep transition-colors hover:text-brand-red hover:underline">Xem Chi Tiết <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button>
                </div>
              </article>
            ))}
          </div>
          <button type="button" onClick={() => scrollToIndex(Math.min(pageCount - 1, activeIndex + 1))} disabled={activeIndex === pageCount - 1} aria-label="Giảng viên tiếp theo" className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-brand-gold-deep bg-brand-cream text-brand-gold-deep shadow-md transition-colors hover:bg-brand-gold hover:text-brand-brown disabled:pointer-events-none disabled:opacity-30 sm:h-11 sm:w-11">
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        <div className="mt-7 flex justify-center gap-2" role="tablist" aria-label="Chọn nhóm giảng viên">
          {Array.from({ length: pageCount }, (_, index) => (
            <button key={index} type="button" onClick={() => scrollToIndex(index)} aria-label={`Đến nhóm giảng viên ${index + 1}`} aria-selected={activeIndex === index} className={`h-2.5 rounded-full transition-all ${activeIndex === index ? 'w-7 bg-brand-gold-deep' : 'w-2.5 border border-gray-300 bg-white hover:border-brand-gold-deep'}`} />
          ))}
        </div>
      </div>

      {selectedTeacher && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={selectedTeacher.name} onClick={() => setSelectedTeacher(null)}>
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-brand-cream shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setSelectedTeacher(null)} aria-label="Đóng" className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 text-gray-700 shadow-md transition-colors hover:bg-brand-red hover:text-white"><X className="h-5 w-5" /></button>
            <div className="grid md:grid-cols-[0.8fr_1.2fr]">
              <div className="relative min-h-[320px] md:min-h-0"><img src={selectedTeacher.photo} alt={selectedTeacher.name} className="h-full w-full object-cover" /></div>
              <div className="p-6 sm:p-9">
                <div className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-wide text-brand-brown">Giảng Viên 5 Sao <Stars /></div>
                <h3 className="mt-4 font-display text-3xl text-brand-red">{selectedTeacher.name}</h3>
                <div className="mt-7"><h4 className="font-sans text-sm font-bold uppercase tracking-[0.18em] text-brand-gold-deep">Trình Độ</h4><ul className="mt-3 list-disc space-y-2 pl-5 font-sans text-sm leading-relaxed text-gray-700">{selectedTeacher.education.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div className="mt-7"><h4 className="font-sans text-sm font-bold uppercase tracking-[0.18em] text-brand-gold-deep">Kinh Nghiệm &amp; Thành Tích</h4><ul className="mt-3 list-disc space-y-2 pl-5 font-sans text-sm leading-relaxed text-gray-700">{selectedTeacher.experience.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <a href="https://zalo.me/0398519485" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-[48px] items-center rounded-full bg-brand-gold px-6 py-3 font-sans text-sm font-bold text-brand-brown shadow-lg transition-all hover:-translate-y-0.5 hover:bg-brand-gold-deep hover:text-white">Đăng Ký Học Thử Với Giảng Viên Này</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
