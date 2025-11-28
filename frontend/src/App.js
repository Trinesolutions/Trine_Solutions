import { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Industries from "@/pages/Industries";
import IndustryDetail from "@/pages/IndustryDetail";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import FAQ from "@/pages/FAQ";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminBlog from "@/pages/admin/AdminBlog";
import AdminServices from "@/pages/admin/AdminServices";
import AdminJobs from "@/pages/admin/AdminJobs";
import AdminAnnouncements from "@/pages/admin/AdminAnnouncements";
import AdminContacts from "@/pages/admin/AdminContacts";
import AdminTestimonials from "@/pages/admin/AdminTestimonials";
import AdminPartners from "@/pages/admin/AdminPartners";
import DigitalTransformation from "@/pages/DigitalTransformation";
import CloudSolutions from "@/pages/CloudSolutions";
import AiMl from "@/pages/AiMl";
import Cybersecurity from "@/pages/Cybersecurity";
import Portfolio from "@/pages/Portfolio";
import Insights from "@/pages/Insights";
import CaseStudies from "@/pages/CaseStudies";
import { Toaster } from "@/components/ui/sonner";

// Layout wrapper to conditionally show navbar/footer
const Layout = ({ children, darkMode, setDarkMode, language, setLanguage }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen m-0 p-0">
      {!isAdminRoute && (
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} />
      )}
      <main className="flex-grow m-0 p-0">
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('EN');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="App">
      <BrowserRouter>
        <Layout darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/:slug" element={<IndustryDetail />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/faq" element={<FAQ />} />
            
            {/* Service Detail Routes */}
            <Route path="/services/digital-transformation" element={<DigitalTransformation />} />
            <Route path="/services/cloud-solutions" element={<CloudSolutions />} />
            <Route path="/services/ai-ml" element={<AiMl />} />
            <Route path="/services/cybersecurity" element={<Cybersecurity />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/insights" element={<Insights />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/jobs" element={<AdminJobs />} />
            <Route path="/admin/testimonials" element={<AdminTestimonials />} />
            <Route path="/admin/partners" element={<AdminPartners />} />
            <Route path="/admin/announcements" element={<AdminAnnouncements />} />
            <Route path="/admin/contacts" element={<AdminContacts />} />
          </Routes>
        
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;