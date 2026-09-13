import { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { useScrollReveal, revealClass, revealTransition } from '@/hooks/useScrollReveal';

type Course = {
  title: string;
  description: string;
  image: string;
};

const courses: Course[] = [
  {
    title: 'Khóa Luyện Thi HSK/HSKK',
    description:
      'Lộ trình luyện thi chinh phục HSK sau 1 khóa học, HSKK cao cấp với số điểm cao 70+ điểm.',
    image: 'https://res.cloudinary.com/qugyphlv/image/upload/v1789256928/khoa-hoc-hsk.webp',
  },
  {
    title: 'Khóa Doanh Nghiệp',
    description:
      'Khóa tiếng Trung với lộ trình học thiết kế riêng theo nhu cầu của Doanh nghiệp.',
    image:
      'https://res.cloudinary.com/qugyphlv/image/upload/v1789256930/khoa-hoc-doanh-nghiep.webp',
  },
  {
    title: 'Hán Ngữ Tích Hợp 3.0 Trực Tuyến',
    description:
      'Học trực tuyến từ xa trên nền tảng Google Meet, cam kết đầu ra như các lớp Offline.',
    image:
      'https://res.cloudinary.com/qugyphlv/image/upload/v1789256929/khoa-hoc-truc-tuyen.webp',
  },
  {
    title: 'Khóa Tiếng Trung Trẻ Em',
    description:
      'Lộ trình bám sát chương trình phổ thông hiện hành, phù hợp cho trẻ từ 8-14 tuổi.',
    image:
      'https://res.cloudinary.com/qugyphlv/image/upload/v1789256928/khoa-hoc-tre-em.webp',
  },
];

function GoldDivider() {
  return (
    <div className="mb-12 flex items-center justify-center gap-4">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#BA7517]/50 sm:w-24" />
      <div className="h-3 w-3 rotate-45 border border-[#BA7517]/60 bg-[#FAC775]/30" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#BA7517]/50 sm:w-24" />
    </div>
  );
}

export default function CoursesSection() {
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [modalClosing, setModalClosing] = useState(false);
  const { ref: headerRef, visible: headerVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: gridRef, visible: gridVisible } = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    if (!activeCourse) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeCourse]);

  const openModal = (course: Course) => {
    setModalClosing(false);
    setActiveCourse(course);
  };

  const closeModal = () => {
    setModalClosing(true);
    window.setTimeout(() => {
      setActiveCourse(null);
      setModalClosing(false);
    }, 220);
  };

  return (
    <section id="khoa-hoc-list" className="relative overflow-hidden bg-brand-cream px-6 py-20 sm:py-28">
      {/* Faint background watermark */}
      <div
        className="pointer-events-none absolute -left-10 top-10 select-none font-display text-[16rem] leading-none text-brand-red/[0.04] sm:text-[20rem]"
        aria-hidden="true"
      >
        课
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mx-auto max-w-3xl text-center ${revealTransition} ${revealClass(headerVisible)}`}
        >
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-[#BA7517]">
            Chương trình đào tạo
          </p>
          <h2 className="font-display text-3xl leading-tight text-brand-red sm:text-4xl lg:text-5xl">
            Các Khóa Học Tại ThanhMaiHSK
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-sans leading-relaxed text-gray-600">
            Đa dạng chương trình học phù hợp với từng mục tiêu và độ tuổi, từ luyện
            thi chứng chỉ đến nhu cầu công việc và doanh nghiệp.
          </p>
        </div>

        <GoldDivider />

        {/* Course cards grid */}
        <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {courses.map((course, index) => (
            <article
              key={course.title}
              className={`group flex flex-col overflow-hidden rounded-xl border border-[#BA7517]/30 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-[#BA7517]/60 hover:shadow-lg ${revealTransition} ${revealClass(gridVisible)}`}
              style={{ transitionDelay: gridVisible ? `${index * 100}ms` : '0ms' }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gold accent bar overlapping image bottom */}
                <div className="absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r from-[#FAC775] via-[#FDE4B0] to-[#FAC775]" />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl text-brand-red sm:text-2xl">
                  {course.title}
                </h3>
                <p className="mt-3 line-clamp-3 font-sans text-sm leading-relaxed text-gray-600">
                  {course.description}
                </p>
                <button
                  type="button"
                  onClick={() => openModal(course)}
                  className="mt-5 inline-flex items-center gap-1.5 self-start font-sans text-sm font-semibold text-[#BA7517] transition-colors hover:text-brand-red hover:underline focus:outline-none focus-visible:underline"
                >
                  Xem Thêm
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Course detail modal */}
      {activeCourse && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 transition-opacity duration-200 sm:p-8 ${
            modalClosing ? 'opacity-0' : 'opacity-100'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label={activeCourse.title}
          onClick={closeModal}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-gray-700 shadow-md transition-colors hover:bg-brand-red hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
              aria-label="Đóng"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="aspect-[16/9] w-full overflow-hidden rounded-t-2xl">
              <img
                src={activeCourse.image}
                alt={activeCourse.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="font-display text-2xl text-brand-red sm:text-3xl">
                {activeCourse.title}
              </h3>
              <p className="mt-4 font-sans leading-relaxed text-gray-700">
                {activeCourse.description}
              </p>

              <a
                href="https://zalo.me/0398519485"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center rounded-full bg-brand-gold px-6 py-3 font-sans text-sm font-semibold text-brand-brown shadow-lg shadow-black/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-gold-deep hover:text-white"
              >
                Đăng Ký Tư Vấn
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
