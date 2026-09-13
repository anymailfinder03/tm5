import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-triggered fade-in-up reveal using IntersectionObserver.
 * Fires once per page load. Respects prefers-reduced-motion.
 *
 * Returns a ref to attach to the target element and a boolean `visible`.
 * When `visible` is false the element should start at opacity-0 + translateY;
 * when true it animates to opacity-100 + translateY-0 via CSS transition.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: {
    threshold?: number;
    rootMargin?: string;
  /** If true, observe the element's children with stagger instead of the element itself. */
  }
): { ref: React.RefObject<T>; visible: boolean } {
  const { threshold = 0.15, rootMargin = '0px 0px -50px 0px' } = options ?? {};
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect reduced motion: show immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, visible };
}

/**
 * CSS class string for fade-in-up reveal. Apply to the element that
 * has the ref from useScrollReveal. Pair with inline transitionDelay
 * for staggered children.
 */
export const revealClass = (visible: boolean) =>
  visible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-8';

export const revealTransition = 'transition-all duration-700 ease-out';
