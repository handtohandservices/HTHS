import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Directors from '@/components/Directors';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Certifications from '@/components/Certifications';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Certifications />
        <Services />
        <WhyChooseUs />
        <Directors />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
