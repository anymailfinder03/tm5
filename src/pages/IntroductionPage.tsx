import IntroHero from '@/components/IntroHero';
import Footer from '@/components/Footer';

const placeholders = [
  { id: 've-chung-toi', title: 'Về Chúng Tôi' },
  { id: 'giang-vien', title: 'Giảng Viên' },
  { id: 'thanh-tich-hoc-vien', title: 'Thành Tích Học Viên' },
  { id: 'hoat-dong-ngoai-khoa', title: 'Hoạt Động Ngoại Khóa' },
  { id: 'cta', title: 'CTA' },
];

function PlaceholderSection({ id, title, index }: { id: string; title: string; index: number }) {
  return (
    <section
      id={id}
      className={`flex min-h-[400px] items-center justify-center px-6 py-20 ${index % 2 === 0 ? 'bg-brand-cream' : 'bg-brand-ivory'}`}
      style={{ scrollMarginTop: '88px' }}
    >
      <div className="text-center">
        <p className="mb-3 font-sans text-xs uppercase tracking-[0.3em] text-brand-gold-deep">
          ThanhMaiHSK
        </p>
        <h2 className="font-display text-2xl text-brand-red sm:text-3xl">
          {title} — Nội dung sẽ được cập nhật
        </h2>
      </div>
    </section>
  );
}

export default function IntroductionPage() {
  return (
    <div className="relative w-full">
      <IntroHero />
      <div className="h-[130px] bg-brand-cream sm:h-[170px] md:h-[200px]" aria-hidden="true" />
      {placeholders.map((section, index) => (
        <PlaceholderSection key={section.id} {...section} index={index} />
      ))}
      <Footer />
    </div>
  );
}
