import Hero from '@/components/Hero';
import Medallion from '@/components/Medallion';
import AboutSection from '@/components/AboutSection';
import RoadmapSection from '@/components/RoadmapSection';
import CoursesSection from '@/components/CoursesSection';
import CtaSection from '@/components/CtaSection';
import TeachersSection from '@/components/TeachersSection';
import FeaturedStudentsSection from '@/components/FeaturedStudentsSection';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="relative w-full">
      <Hero />
      <AboutSection />
      <RoadmapSection />
      <CoursesSection />
      <CtaSection />
      <TeachersSection />
      <FeaturedStudentsSection />
      <FaqSection />
      <Footer />
      {/* Circular calligraphy medallion straddling the boundary between hero and about section */}
      <div className="absolute left-1/2 top-[100vh] -translate-x-1/2 -translate-y-1/2 z-50">
        <Medallion />
      </div>
    </div>
  );
}
