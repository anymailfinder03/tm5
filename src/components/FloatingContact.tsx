import { Phone } from 'lucide-react';

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current sm:h-6 sm:w-6" aria-hidden="true">
      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
    </svg>
  );
}

function ZaloIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-6 w-6 fill-current sm:h-7 sm:w-7" aria-hidden="true">
      <path d="M24 4C12.95 4 4 11.61 4 21c0 5.14 2.94 9.76 7.58 12.82L10 44l9.45-5.27c1.47.18 2.99.27 4.55.27 11.05 0 20-7.61 20-17S35.05 4 24 4Zm-6.2 22.38h-5.1l5.64-7.2h-5.29v-3.17h9.75v2.8l-5.56 7.57h5.76v3.17H17.8v-3.17Zm13.64 0h-2.86v-1.18c-.72.9-1.72 1.45-2.98 1.45-2.44 0-4.34-2.28-4.34-5.4 0-3.08 1.9-5.35 4.34-5.35 1.26 0 2.26.54 2.98 1.44v-1.17h2.86v10.21Zm-4.99-7.59c-1.25 0-2.15 1-2.15 2.46 0 1.48.9 2.49 2.15 2.49 1.24 0 2.13-1.01 2.13-2.49 0-1.46-.89-2.46-2.13-2.46Z" />
    </svg>
  );
}

function FloatingLink({
  href,
  label,
  className,
  children,
  external = false,
}: {
  href: string;
  label: string;
  className: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg shadow-black/20 transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 sm:h-14 sm:w-14 ${className}`}
    >
      {children}
    </a>
  );
}

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-5 z-[60] flex flex-col gap-3 sm:bottom-8 sm:right-6">
      <div className="relative">
        <span className="pointer-events-none absolute inset-0 animate-pulse-ring rounded-full bg-[#0068FF]" aria-hidden="true" />
        <FloatingLink
          href="https://zalo.me/0398519485"
          label="Zalo"
          className="relative bg-[#0068FF]"
          external
        >
          <ZaloIcon />
        </FloatingLink>
      </div>
      <FloatingLink
        href="https://www.facebook.com/kaynguyen1512"
        label="Facebook"
        className="bg-[#1877F2]"
        external
      >
        <FacebookIcon />
      </FloatingLink>
      <FloatingLink href="tel:0398519485" label="Gọi điện thoại" className="bg-brand-red">
        <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
      </FloatingLink>
    </div>
  );
}
