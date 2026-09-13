import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: 'ThanhMaiHSK có những khóa học nào?',
    answer:
      'ThanhMaiHSK cung cấp đa dạng khóa học: luyện thi HSK/HSKK, tiếng Trung doanh nghiệp, Hán ngữ tích hợp trực tuyến, và tiếng Trung trẻ em, phù hợp với nhiều độ tuổi và mục tiêu học tập khác nhau.',
  },
  {
    question: 'Học viên mất bao lâu để đạt trình độ HSK4?',
    answer:
      'Tùy vào nền tảng ban đầu, thông thường học viên mất khoảng 4-6 tháng để hoàn thành lộ trình từ 0 đến HSK4 tại ThanhMaiHSK, với cam kết đầu ra rõ ràng theo từng khóa học.',
  },
  {
    question: 'Tôi có thể học thử miễn phí trước khi đăng ký không?',
    answer:
      'Có. ThanhMaiHSK luôn có chính sách học thử miễn phí để học viên trải nghiệm phương pháp giảng dạy trước khi quyết định đăng ký khóa học chính thức.',
  },
  {
    question: 'Trung tâm có lớp học online không?',
    answer:
      'Có. Khóa Hán Ngữ Tích Hợp 3.0 Trực Tuyến của ThanhMaiHSK được giảng dạy qua nền tảng Google Meet, cam kết đầu ra tương đương các lớp học Offline.',
  },
  {
    question: 'ThanhMaiHSK có bao nhiêu cơ sở và ở đâu?',
    answer:
      'ThanhMaiHSK hiện có hơn 20 cơ sở trên toàn quốc, tập trung tại Hà Nội, Thành phố Hồ Chí Minh và một số tỉnh thành khác như Bắc Ninh, Thái Bình, Nghệ An, Hải Dương và Hưng Yên.',
  },
];

function GoldDivider() {
  return (
    <div className="mb-10 flex items-center justify-center gap-4" aria-hidden="true">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-brand-gold-deep/60 sm:w-24" />
      <div className="h-3 w-3 rotate-45 border border-brand-gold-deep/70 bg-brand-gold/30" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-brand-gold-deep/60 sm:w-24" />
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="cau-hoi-thuong-gap" className="relative overflow-hidden bg-brand-cream px-6 py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-16 top-8 font-display text-[18rem] leading-none text-brand-red/[0.035]" aria-hidden="true">
        問
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand-gold-deep/60 sm:w-20" />
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold-deep">Giải đáp thắc mắc</p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand-gold-deep/60 sm:w-20" />
          </div>
          <h2 className="font-display text-3xl leading-tight text-brand-red sm:text-4xl lg:text-5xl">Câu Hỏi Thường Gặp</h2>
          <p className="mx-auto mt-5 max-w-2xl font-sans leading-relaxed text-gray-600">
            Một số câu hỏi phổ biến về khóa học và lộ trình học tại ThanhMaiHSK.
          </p>
        </div>

        <div className="mt-10">
          <GoldDivider />
          <div className="border-t border-brand-gold-deep/25">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={item.question} className="border-b border-brand-gold-deep/25">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-sans text-base font-semibold text-brand-red transition-colors hover:text-brand-gold-deep focus:outline-none focus-visible:text-brand-gold-deep sm:text-lg"
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-brand-gold-deep transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className="grid transition-[grid-template-rows] duration-300" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-10 font-sans leading-relaxed text-gray-600">{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-10 text-center font-sans text-sm leading-relaxed text-gray-600">
          Bạn còn thắc mắc khác? Liên hệ ngay với chúng tôi qua{' '}
          <a href="https://zalo.me/0398519485" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-gold-deep underline decoration-brand-gold-deep/40 underline-offset-4 transition-colors hover:text-brand-red">
            Zalo
          </a>
          .
        </p>
      </div>
    </section>
  );
}
