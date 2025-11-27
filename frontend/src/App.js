import { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Industries from "@/pages/Industries";
import Insights from "@/pages/Insights";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminBlog from "@/pages/admin/AdminBlog";
import AdminCaseStudies from "@/pages/admin/AdminCaseStudies";
import AdminServices from "@/pages/admin/AdminServices";
import AdminTeam from "@/pages/admin/AdminTeam";
import AdminAnnouncements from "@/pages/admin/AdminAnnouncements";
import AdminContacts from "@/pages/admin/AdminContacts";
import AdminTestimonials from "@/pages/admin/AdminTestimonials";
import AdminPartners from "@/pages/admin/AdminPartners";
import { Toaster } from "@/components/ui/sonner";

// Layout wrapper to conditionally show navbar/footer
const Layout = ({ children, darkMode, setDarkMode, language, setLanguage }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && (
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} />
      )}
      <main className="flex-grow">
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
            <Route path="/industries" element={<Industries />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/admin/case-studies" element={<AdminCaseStudies />} />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/team" element={<AdminTeam />} />
            <Route path="/admin/testimonials" element={<AdminTestimonials />} />
            <Route path="/admin/partners" element={<AdminPartners />} />
            <Route path="/admin/announcements" element={<AdminAnnouncements />} />
            <Route path="/admin/contacts" element={<AdminContacts />} />
          </Routes>
        </Layout>
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;