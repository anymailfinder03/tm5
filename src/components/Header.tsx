import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';

const navLinks = [
  { label: 'Giới Thiệu', href: '#gioi-thieu' },
  { label: 'Khóa Học', href: '#khoa-hoc' },
  { label: 'Chi Nhánh', href: '#chi-nhanh' },
  { label: 'Thư Viện', href: '#thu-vien' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-brand-red/95 shadow-lg shadow-black/20 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="px-4 py-3 sm:px-8 sm:py-4 lg:px-16">
        <div className="flex items-center justify-between gap-3 md:grid md:grid-cols-[1fr_auto_1fr]">
          <div className="flex min-w-0 items-center gap-2 justify-self-start sm:gap-3">
            <img
              src="https://res.cloudinary.com/qugyphlv/image/upload/v1789008137/logo-removebg-preview.png"
              alt="ThanhMai HSK Logo"
              className="h-9 w-9 shrink-0 object-contain drop-shadow-lg sm:h-12 sm:w-12"
            />
            <div className="flex min-w-0 flex-col leading-none">
              <span className="whitespace-nowrap font-display text-base font-bold tracking-wide text-brand-ivory sm:text-xl">
                ThanhMai HSK
              </span>
              <span className="hidden font-script text-xs italic tracking-wide text-brand-gold sm:block sm:text-sm">
                Trung tâm tiếng Trung
              </span>
            </div>
          </div>

          <nav className="hidden items-center justify-self-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative font-sans text-sm text-white transition-colors duration-200 hover:text-brand-gold focus:text-brand-gold"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-brand-gold transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden items-center justify-self-end gap-4 md:flex">
            <a
              href="tel:0398519485"
              className="flex items-center gap-2 font-sans text-sm text-white transition-colors duration-200 hover:text-brand-gold focus:text-brand-gold"
            >
              <Phone className="h-4 w-4" />
              <span className="font-medium">0398519485</span>
            </a>
            <a
              href="https://zalo.me/0398519485"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-brand-gold px-5 py-2.5 font-sans text-sm font-semibold text-brand-brown shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-gold-deep hover:text-white"
            >
              Học Thử Miễn Phí
            </a>
          </div>

          <div className="flex shrink-0 items-center gap-3 md:hidden">
            <a
              href="tel:0398519485"
              className="flex items-center gap-1.5 font-sans text-[11px] font-medium text-white transition-colors hover:text-brand-gold focus:text-brand-gold sm:text-xs"
              aria-label="Gọi 0398519485"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" />
              <span>0398519485</span>
            </a>
            <button
              type="button"
              className="rounded-md p-1 text-brand-gold transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="mt-3 flex flex-col gap-1 rounded-2xl border border-white/10 bg-black/50 px-6 py-4 backdrop-blur-md animate-fade-in md:hidden">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/5 py-2.5 font-sans text-sm text-white transition-colors duration-200 last:border-0 hover:text-brand-gold focus:text-brand-gold"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://zalo.me/0398519485"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-full bg-brand-gold px-5 py-2.5 text-center font-sans text-sm font-semibold text-brand-brown transition-all duration-300 hover:bg-brand-gold-deep hover:text-white"
            >
              Học Thử Miễn Phí
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
