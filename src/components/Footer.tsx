import { useState } from 'react';
import { Phone, Mail, MessageCircle, Plus } from 'lucide-react';
import { useScrollReveal, revealClass } from '@/hooks/useScrollReveal';

const hanoiBranches = [
  'Đống Đa: Số 9 ngõ 49 Huỳnh Thúc Kháng, Đống Đa',
  'Hà Đông: Số 139K Chiến Thắng, Hà Đông',
  'Hai Bà Trưng: Số 311 Trần Đại Nghĩa, Hai Bà Trưng',
  'Times City: Số 458 Minh Khai, Hai Bà Trưng',
  'Cầu Giấy 1: Số 8 ngõ 72 Dương Khuê, Cầu Giấy',
  'Cầu Giấy 2: Số 25 Phạm Tuần Tài, Cầu Giấy',
  'Mỹ Đình: Số 46 Nguyễn Hoàng, Mỹ Đình',
  'Bách Khoa: Trung tâm Khảo thí ngoại ngữ và Trao đổi văn hóa (CLC), Tầng 1, tòa nhà C3B, Đại học Bách Khoa Hà Nội, số 1 Đại Cồ Việt, Hai Bà Trưng Hà Nội',
  'Gia Lâm: Hải Âu 16, SP16-79, Ocean Park, Gia Lâm',
  'Smart City: Lô A36.9, KĐT Geleximco A, Lê Trọng Tấn, Hoài Đức',
  'Đông Anh: 22 đường Phúc Lộc, Xã Đông Anh',
];

const hcmBranches = [
  'Quận 1: 345/84 Trần Hưng Đạo, Phường Cầu Kho, Quận 1',
  'Tân Bình: 67 Nguyễn Thái Bình, Phường 4, Quận Tân Bình',
  'Bình Thạnh: 168/19 đường Nguyễn Gia Trí, Phường 25, Quận Bình Thạnh',
  'Thuận An (Bình Dương Cũ): 262/3A đường Thủ Khoa Huân, khu phố Thạnh Hòa B, phường Thuận An',
];

const otherBranches = [
  'Bắc Ninh 1: Tòa nhà ParkView City 125 Huyền Quang, Phường Võ Cường',
  'Bắc Ninh 2: H48 Kinh Bắc Golden Gate, Từ Sơn, Bắc Ninh',
  'Thái Bình 1: 114 Nguyễn Văn Năng, TP Thái Bình',
  'Thái Bình 2: Diêm Điền, Thái Thụy, Thái Bình',
  'Ecopark Hưng Yên: Số 36 Grand Marina, Thủy Nguyên, KĐT Ecopark, Phụng Công',
  'Nghệ An: 45A An Dương Vương, phường Trường Vinh',
  'Hải Dương: 136 - 138 Bạch Năng Thi, phường Tân Hưng',
];

const legalLinks = [
  { label: 'Chính Sách Thanh Toán', href: 'https://zalo.me/0398519485' },
  { label: 'Chính Sách Xử Lý Khiếu Nại', href: 'https://zalo.me/0398519485' },
  { label: 'Chính Sách Bảo Mật Thông Tin', href: 'https://zalo.me/0398519485' },
];

function HeadingDiamond({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className="h-2 w-2 rotate-45 bg-brand-gold" aria-hidden="true" />
      <h3 className="font-sans text-sm font-bold uppercase tracking-[0.18em] text-brand-gold">{children}</h3>
    </div>
  );
}

function AccordionSection({ title, items }: { title: string; items: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:mb-0">
      {/* Desktop: always visible heading; Mobile: accordion toggle */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between lg:cursor-default"
        aria-expanded={open}
      >
        <HeadingDiamond>{title}</HeadingDiamond>
        <span className="lg:hidden">
          <Plus
            className={`h-4 w-4 text-brand-gold transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
          />
        </span>
      </button>
      {/* Desktop: always show; Mobile: CSS grid accordion */}
      <div
        className="grid transition-all duration-300 lg:grid-rows-[1fr]"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden lg:overflow-visible">
          <ul className="space-y-2 pl-4 lg:pl-0">
            {items.map((item) => (
              <li
                key={item}
                className="font-sans text-[13px] leading-relaxed text-white/70"
              >
                <span className="mr-1.5 text-brand-gold/60">·</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <footer
      ref={ref}
      className={`relative overflow-hidden border-t border-brand-gold/30 bg-[#3D0C0C] px-6 pt-16 pb-8 sm:px-10 transition-all duration-500 ease-out ${revealClass(visible)}`}
    >
      <div className="pointer-events-none absolute -right-20 bottom-0 font-display text-[16rem] leading-none text-brand-gold/[0.03]" aria-hidden="true">優</div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Main columns */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Column 1: Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <img
                src="https://res.cloudinary.com/qugyphlv/image/upload/v1789008137/logo-removebg-preview.png"
                alt="ThanhMai HSK Logo"
                className="h-10 w-10 object-contain"
              />
              <span className="font-display text-lg font-bold text-brand-ivory">THANHMAIHSK</span>
            </div>
            <p className="mb-2 font-sans text-[13px] leading-relaxed text-white/70">
              CÔNG TY TNHH PHÁT TRIỂN GIÁO DỤC VÀ HỢP TÁC QUỐC TẾ THANHMAIHSK
            </p>
            <p className="mb-2 font-sans text-[13px] leading-relaxed text-white/60">
              Số ĐKKD 0106852149 do Sở KHĐT Tp.Hà Nội cấp ngày 25/05/2015
            </p>
            <p className="mb-5 font-sans text-[13px] leading-relaxed text-white/60">
              Địa chỉ: Số 9 ngõ 49 Huỳnh Thúc Kháng, Phường Láng Hạ, Quận Đống Đa, Thành phố Hà Nội, Việt Nam
            </p>

            <p className="mb-2 font-sans text-sm font-semibold text-brand-gold">Thời Gian Mở Cửa</p>
            <p className="font-sans text-[13px] leading-relaxed text-white/70">Từ 8:00 sáng đến 5:00 chiều.</p>
            <p className="font-sans text-[13px] leading-relaxed text-white/70">Mở cửa các ngày trong tuần từ thứ Hai đến Chủ Nhật.</p>
            <p className="font-sans text-[13px] leading-relaxed text-white/60">Lưu ý: Mở cửa cả ngày lễ.</p>
          </div>

          {/* Column 2: Contact */}
          <div>
            <HeadingDiamond>Liên Hệ</HeadingDiamond>
            <ul className="space-y-3">
              <li>
                <a href="tel:0398519485" className="font-sans text-[13px] leading-relaxed text-white/80 transition-colors hover:text-brand-gold">
                  Điện thoại: 0398519485
                </a>
              </li>
              <li>
                <a href="mailto:ledai6502@gmail.com" className="font-sans text-[13px] leading-relaxed text-white/80 transition-colors hover:text-brand-gold">
                  Email: ledai6502@gmail.com
                </a>
              </li>
              <li className="font-sans text-[13px] leading-relaxed text-white/60">
                Mọi thắc mắc và ý kiến đóng góp, xin vui lòng gửi về địa chỉ hòm thư: ledai6502@gmail.com
              </li>
            </ul>
            {/* Social icons */}
            <div className="mt-5 flex gap-3">
              <a
                href="tel:0398519485"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/50 text-brand-gold transition-colors hover:bg-brand-gold hover:text-brand-brown"
                aria-label="Gọi điện"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href="mailto:ledai6502@gmail.com"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/50 text-brand-gold transition-colors hover:bg-brand-gold hover:text-brand-brown"
                aria-label="Gửi email"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://zalo.me/0398519485"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/50 text-brand-gold transition-colors hover:bg-brand-gold hover:text-brand-brown"
                aria-label="Liên hệ qua Zalo"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 3: Hanoi branches (accordion on mobile) */}
          <div>
            <AccordionSection title="Cơ Sở Tại Hà Nội" items={hanoiBranches} />
          </div>

          {/* Column 4: HCM + Other branches */}
          <div className="space-y-8">
            <AccordionSection title="Cơ Sở Tại Hồ Chí Minh" items={hcmBranches} />
            <AccordionSection title="Cơ Sở Khác" items={otherBranches} />
          </div>

          {/* Column 5: Legal links */}
          <div>
            <HeadingDiamond>Thông Tin</HeadingDiamond>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[13px] leading-relaxed text-brand-gold transition-colors hover:text-brand-gold-light hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gold divider */}
        <div className="mt-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-gold/30 to-brand-gold/30" />
          <div className="h-2 w-2 rotate-45 border border-brand-gold/50 bg-brand-gold/20" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-brand-gold/30 to-brand-gold/30" />
        </div>

        {/* Bottom bar */}
        <p className="mt-6 text-center font-sans text-[13px] text-white/50">
          Copyright 2026 © THANHMAIHSK
        </p>
      </div>
    </footer>
  );
}
