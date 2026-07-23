import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutShort from '@/components/AboutShort';
import Certifications from '@/components/Certifications';
import WhyChooseUs from '@/components/WhyChooseUs';
import Directors from '@/components/Directors';
import ContactBanner from '@/components/ContactBanner';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutShort />
        <Certifications />
        <WhyChooseUs />
        <Directors />
        <ContactBanner />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

