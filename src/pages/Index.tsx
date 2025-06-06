
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import LocationSection from '@/components/LocationSection';
import DevelopmentsSection from '@/components/DevelopmentsSection';
import EnquiryForm from '@/components/EnquiryForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <LocationSection />
      <DevelopmentsSection />
      <EnquiryForm />
      <Footer />
    </div>
  );
};

export default Index;
