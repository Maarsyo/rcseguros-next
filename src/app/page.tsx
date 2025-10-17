import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustSection from '@/components/TrustSection';
import Services from '@/components/Services';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Partners from '@/components/Partners';

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <TrustSection />
      <Services />
      <About />
      <Testimonials />
    </div>
  );
}
