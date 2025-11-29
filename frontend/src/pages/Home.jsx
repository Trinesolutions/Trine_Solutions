import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowRight, Zap, Shield,
  Sparkles, TrendingUp, Award, Users, Globe, Rocket, ChevronRight,
  Target, Lightbulb, Star, Heart, Briefcase, MessageSquare, Layers, Cpu
} from 'lucide-react';
import TestimonialSlider from '@/components/TestimonialSlider';
import { iconMap, getIconByName } from '@/utils/serviceIcons';
import { defaultServices, getSimplifiedServices } from '@/constants/defaultServices';
import SEO, { pageSEO, structuredDataSchemas } from '@/components/SEO';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
const API = `${BACKEND_URL}/api`;

// Simplified services for Home page (from shared constants)
const mockServices = getSimplifiedServices(defaultServices);

const industries = [
  {
    name: 'Banking & Finance',
    slug: 'banking-finance',
    image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800',
    description: 'Digital banking solutions, risk management, regulatory compliance, and fraud detection systems. We help financial institutions modernize their infrastructure with cutting-edge technology.'
  },
  {
    name: 'Healthcare',
    slug: 'healthcare',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
    description: 'Patient care optimization, electronic health records, telemedicine platforms, and medical IoT solutions. Transform healthcare delivery with our innovative digital health solutions.'
  },
  {
    name: 'Telecommunications',
    slug: 'telecommunications',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800',
    description: '5G network optimization, IoT connectivity, cloud communications, and next-generation infrastructure solutions. Power the future of connectivity with our telecom expertise.'
  },
  {
    name: 'Manufacturing',
    slug: 'manufacturing',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
    description: 'Smart factory solutions, predictive maintenance, supply chain optimization, and quality control systems. Embrace Industry 4.0 with our manufacturing technology solutions.'
  },
  {
    name: 'Retail & E-Commerce',
    slug: 'retail-ecommerce',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    description: 'Omnichannel commerce, inventory management, customer analytics, and personalized shopping experiences. Revolutionize retail with our comprehensive e-commerce solutions.'
  },
  {
    name: 'Education',
    slug: 'education',
    image: 'https://img.freepik.com/free-vector/modern-hand-drawn-education-concept_23-2147906438.jpg?semt=ais_hybrid&w=740&q=80',
    description: 'Learning management systems, virtual classrooms, student analytics, and educational content platforms. Transform education with our innovative EdTech solutions.'
  }
];

// Max characters for industry description preview
const INDUSTRY_DESCRIPTION_MAX_LENGTH = 100;

// Remove the static partners array as we'll fetch from the backend

const features = [
  {
    icon: Target,
    title: 'Strategic Excellence',
    desc: 'Data-driven strategies that deliver measurable ROI and business impact'
  },
  {
    icon: Lightbulb,
    title: 'Innovation First',
    desc: 'Cutting-edge solutions powered by AI, ML, and emerging technologies'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    desc: 'Bank-grade security protocols and compliance frameworks'
  },
  {
    icon: TrendingUp,
    title: 'Scalable Growth',
    desc: 'Future-proof solutions that scale with your business ambitions'
  }
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'Global Finance Corp',
    content: 'Trine Solutions transformed our digital infrastructure, resulting in 40% cost savings and unprecedented scalability. Their team understood our complex requirements from day one.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800',
    rating: 5
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'CEO',
    company: 'TechInnovate Inc',
    content: 'Their cybersecurity implementation protected us from a major breach. The ROI was immediate and substantial. I cannot recommend Trine Solutions highly enough.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    rating: 5
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Digital Director',
    company: 'Retail Giant Ltd',
    content: 'The e-commerce platform they built increased our conversion rate by 65%. Exceptional work from start to finish. Their attention to detail is unmatched.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    rating: 5
  },
  {
    id: 4,
    name: 'David Park',
    role: 'VP Engineering',
    company: 'HealthTech Solutions',
    content: 'Working with Trine Solutions on our healthcare platform was transformative. They delivered a HIPAA-compliant solution that exceeded all our expectations.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800',
    rating: 5
  }
];

const Home = () => {
  const [services, setServices] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [dynamicTestimonials, setDynamicTestimonials] = useState(testimonials);
  const [partners, setPartners] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Starting to fetch data...');
        
        // Fetch services
        try {
          const servicesRes = await axios.get(`${API}/services`);
          console.log('Services data:', servicesRes.data);
          setServices(servicesRes.data.length > 0 ? servicesRes.data : mockServices);
        } catch (error) {
          console.error('Error fetching services:', error);
          setServices(mockServices);
        }
        
        // Fetch case studies
        try {
          const casesRes = await axios.get(`${API}/case-studies`);
          console.log('Case studies data:', casesRes.data);
          setCaseStudies(casesRes.data.slice(0, 3));
        } catch (error) {
          console.error('Error fetching case studies:', error);
        }
        
        // Fetch blog posts
        try {
          const blogRes = await axios.get(`${API}/blog`);
          console.log('Blog data:', blogRes.data);
          setBlogPosts(blogRes.data.slice(0, 4));
        } catch (error) {
          console.error('Error fetching blog:', error);
        }
        
        // Fetch partners - only show actual data from API
        try {
          console.log('Fetching partners from:', `${API}/partners`);
          const partnersRes = await axios.get(`${API}/partners`);
          console.log('Partners data received:', partnersRes.data);
          console.log('Number of partners:', partnersRes.data.length);
          setPartners(partnersRes.data);
          console.log('Partners state updated with:', partnersRes.data);
        } catch (error) {
          console.error('Error fetching partners:', error);
          console.error('Error details:', error.response?.data);
          // Even on error, set partners to empty array rather than mock data
          setPartners([]);
        }
      } catch (error) {
        console.error('General error fetching data:', error);
        // Even on error, set partners to empty array rather than mock data
        setPartners([]);
        // Use mock data only for services when API fails
        setServices(mockServices);
      }
    };

    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${API}/testimonials`);
        if (response.data && response.data.length > 0) {
          setDynamicTestimonials(response.data);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Keep using mock testimonials
      }
    };

    fetchData();
    fetchTestimonials();
    
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        if (isVisible) {
          el.classList.add('animated');
        }
      });
    };

    handleScroll();
    setIsVisible(true);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderStars = (count) => {
    return Array.from({ length: count }, (_, i) => (
      <Star key={i} className="w-4 h-4 text-trine-orange fill-trine-orange" />
    ));
  };

  return (
    <>
      <SEO 
        {...pageSEO.home}
        canonicalUrl="https://trinesolutions.com/"
        structuredData={structuredDataSchemas.organization}
        breadcrumbs={[
          { name: 'Home', url: 'https://trinesolutions.com/' }
        ]}
      />

<section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 transition-colors duration-500" aria-labelledby="hero-title">
  
  {/* Video Background */}
  <div className="absolute inset-0 z-0">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    >
      <source src="/vecteezy_black-geometric-shapes-repeating-3d-rending_43199429.mp4" type="video/mp4" />
    </video>
    {/* Overlay for better text readability */}
    <div className="absolute inset-0 bg-black/60"></div>
  </div>

  {/* Left-side Content */}
  <div className="container mx-auto px-6 relative z-10">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      
      {/* Left Column - Text Content */}
      <div className="text-left">
<br/>
<br/>
<br/>
<br/>


        <h1
          id="hero-title"
          className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight"
        >
          <span className="block text-white">Transforming</span>
          <span className="block bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent mt-4 animate-pulse">
            Vision Into Reality
          </span>
        </h1>

        <p className="text-xl lg:text-2xl mb-12 leading-relaxed text-white/90 font-light">
          IT Services, Consulting, <span className="font-bold text-cyan-400">AI solutions</span>, enterprise
          <span className="font-bold text-blue-400"> cybersecurity</span>, and innovation that accelerates business growth.
        </p>

        <div className="flex flex-col sm:flex-row items-start gap-6 mb-16">
          <Link to="/services" className="group relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-all duration-300"></div>
            <button className="relative px-12 py-6 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <span className="flex items-center gap-3">
                Explore Solutions
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </button>
          </Link>

          <Link to="/contact" className="group relative">
            <button className="relative px-12 py-6 rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-3 hover:scale-105">
              Get Started
              <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </Link>
        </div>
      </div>

      {/* Right Column - MacBook M4 Laptop Showcase */}
      <div className="relative">
        {/* MacBook M4 Laptop Container */}
        <div className="relative w-full max-w-lg mx-auto">
          {/* Laptop Screen */}
          <div className="relative mx-auto w-[90%]">
            {/* Screen Bezel */}
            <div className="relative rounded-t-[20px] bg-gray-900 p-3 shadow-2xl border border-gray-800">
              {/* Camera Notch */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-black rounded-b-lg z-10"></div>
              
              {/* Screen Area - Replace the image source with your own */}
              <div className="aspect-[16/10] rounded-t-[12px] overflow-hidden bg-gray-800 relative">
                {/* Your image goes here */}
                <img 
                  src="./unnamed.jpg" 
                  alt="Dashboard Preview" 
                  className="w-full h-full object-cover"
                />
                
          
              </div>
            </div>
            
            {/* Laptop Body */}
            <div className="relative h-6 bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 rounded-b-[18px] shadow-2xl mx-auto w-[99%]">
              {/* Keyboard Area */}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-[85%] h-2 bg-gray-200 dark:bg-gray-600 rounded-b-md"></div>
              
              {/* Trackpad Indentation */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
            </div>
            
            {/* Laptop Base Shadow */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-[110%] h-4 bg-black/20 rounded-full blur-md"></div>
          </div>

         
          {/* Connection Lines Animation */}
          <div className="absolute -inset-4 pointer-events-none">
            <div className="absolute top-1/2 left-0 w-4 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent animate-pulse"></div>
            <div className="absolute top-1/4 right-0 w-4 h-0.5 bg-gradient-to-l from-purple-500 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Background Orbs for Laptop Area */}
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96">
          <div className="absolute top-0 left-0 w-full h-full bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </div>
  </div>

  {/* Background Elements */}
  <div className="absolute inset-0 opacity-30 pointer-events-none">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(180deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }}
    ></div>
  </div>

  {/* Gradient Orbs */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-20 -left-20 w-96 h-96 bg-cyan-400/20 dark:bg-cyan-500/10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl"></div>
  </div>

  {/* CSS Animations */}
  <style jsx>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(5deg); }
    }
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
  `}</style>
</section>
      {/* Partners */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900" aria-labelledby="partners-title">
        <div className="container">
          <div className="text-center mb-12">
            <h2 id="partners-title" className="text-3xl font-bold text-trine-orange dark:text-trine-orange mb-4">
              Trusted Partners
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Collaborating with industry leaders to deliver exceptional results
            </p>
          </div>
          
          {/* Continuous sliding animation container */}
          <div className="overflow-hidden">
            <div className="flex animate-slide">
              {/* First set of partners */}
              {partners.map((partner) => (
                <div key={partner.id} className="flex-shrink-0 mx-8 flex flex-col items-center">
                  <a
                    href={partner.website || '#'}
                    target={partner.website ? "_blank" : "_self"}
                    rel={partner.website ? "noopener noreferrer" : ""}
                    className="flex flex-col items-center group"
                  >
                    <div className="mb-2 transition-all duration-300 group-hover:scale-110">
                      {partner.logo_url ? (
                        <img 
                          src={partner.logo_url} 
                          alt={partner.name} 
                          className="h-12 object-contain transition-all duration-300"
                        />
                      ) : (
                        <div className="text-2xl font-bold text-gray-400 group-hover:text-trine-orange transition-colors duration-300">
                          {partner.name.substring(0, 3).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-trine-orange transition-colors duration-300">
                      {partner.name}
                    </div>
                  </a>
                </div>
              ))}
              
              {/* Duplicate set of partners for seamless looping */}
              {partners.map((partner) => (
                <div key={`${partner.id}-duplicate`} className="flex-shrink-0 mx-8 flex flex-col items-center">
                  <a
                    href={partner.website || '#'}
                    target={partner.website ? "_blank" : "_self"}
                    rel={partner.website ? "noopener noreferrer" : ""}
                    className="flex flex-col items-center group"
                  >
                    <div className="mb-2 transition-all duration-300 group-hover:scale-110">
                      {partner.logo_url ? (
                        <img 
                          src={partner.logo_url} 
                          alt={partner.name} 
                          className="h-12 object-contain transition-all duration-300"
                        />
                      ) : (
                        <div className="text-2xl font-bold text-gray-400 group-hover:text-trine-orange transition-colors duration-300">
                          {partner.name.substring(0, 3).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-trine-orange transition-colors duration-300">
                      {partner.name}
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-sky-50 to-green-50 dark:from-gray-900 dark:to-gray-900" aria-labelledby="about-title">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll opacity-0">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-trine-orange/20 via-trine-lightblue/20 to-trine-green/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src="./sample-contact-graphoc.svg"
                    alt="Modern office workspace showcasing innovation"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    data-testid="about-image"
                  />
                </div>
              </div>
            </div>
            
            <div className="animate-on-scroll opacity-0">
              
              
              <h2 className="text-4xl font-bold mb-6" data-testid="about-title">
                <span className="text-trine-black dark:text-white">
                  Transforming
                </span>
                <br />
                <span className="bg-gradient-to-r from-trine-orange to-trine-lightblue bg-clip-text text-transparent">
                  Vision Into Reality
                </span>
              </h2>
              
              <p className="text-lg mb-8 text-gray-600 dark:text-gray-300 leading-relaxed">
                Trine Solutions is a <span className="font-semibold text-trine-black dark:text-white">global leader</span> in enterprise technology consulting, delivering innovative solutions that transform businesses and drive <span className="font-semibold text-trine-orange">measurable results</span>.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-xl p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-trine-orange/30 transition-all duration-300 hover:shadow-lg hover:shadow-trine-orange/10"
                    >
                      <div className="relative z-10">
                        <IconComponent className="w-8 h-8 text-trine-orange mb-3" />
                        <h3 className="font-semibold text-trine-black dark:text-white mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <Link to="/about" data-testid="learn-more-about-btn" className="group inline-block">
                <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-trine-orange to-trine-lightblue text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-trine-orange/30 hover:scale-105">
                  <span className="flex items-center gap-2">
                    Discover Our Story
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section - Innovative Split Layout */}
      <section className="py-24 relative overflow-hidden bg-trine-black" aria-labelledby="services-preview-title">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-trine-orange/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-trine-lightblue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-trine-green/5 rounded-full blur-3xl"></div>
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(90deg, #fff 1px, transparent 1px), linear-gradient(180deg, #fff 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>

        <div className="container relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
              <Layers className="w-4 h-4 text-trine-orange" />
              <span className="text-sm font-semibold text-white uppercase tracking-wider">What We Offer</span>
            </div>
            <h2 id="services-preview-title" className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Comprehensive </span>
              <span className="bg-gradient-to-r from-trine-orange via-trine-lightblue to-trine-green bg-clip-text text-transparent">Solutions</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              From cutting-edge technology services to strategic consulting, we deliver end-to-end solutions that transform your business
            </p>
          </div>

          {/* Innovative Vertical Split Layout */}
          <div className="flex flex-col gap-8 lg:gap-10">
            
            {/* TOP PART - Services Section with Right-to-Left Hover Animation */}
            <div className="group relative animate-on-scroll opacity-0">
              <div className="relative w-full min-h-[320px] bg-gradient-to-br from-gray-900/90 to-gray-900/60 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
                {/* Header Accent - Orange Gradient */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-trine-orange via-trine-orange to-trine-lightblue"></div>
                
                {/* Main Content Container */}
                <div className="relative h-full flex">
                  {/* Left Side - Always Visible Content */}
                  <div className="w-full lg:w-1/2 p-8 lg:p-10 flex flex-col justify-center transition-all duration-500 ease-out">
                    {/* Icon Grid */}
                    <div className="flex gap-3 mb-6">
                      {[
                        { icon: Cpu, color: 'from-trine-orange to-orange-600' },
                        { icon: Shield, color: 'from-trine-lightblue to-trine-lightblue' },
                        { icon: Globe, color: 'from-trine-green to-green-600' },
                        { icon: Zap, color: 'from-trine-orange to-trine-lightblue' }
                      ].map((item, idx) => (
                        <div 
                          key={idx}
                          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center transform hover:scale-110 transition-all duration-300`}
                        >
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                      ))}
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                      Our Services
                    </h3>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed max-w-xl">
                      We deliver innovative technology solutions across software development, cloud infrastructure, AI & machine learning, and cybersecurity—empowering businesses to thrive in the digital age.
                    </p>

                    {/* CTA Button */}
                    <Link to="/services" className="group/btn inline-flex w-fit">
                      <button className="relative px-8 py-4 rounded-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-trine-orange to-trine-lightblue transition-all duration-300 group-hover/btn:scale-105"></div>
                        <span className="relative flex items-center gap-2 text-white font-semibold">
                          View Services
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                        </span>
                      </button>
                    </Link>

                    {/* Mobile Service Items (visible only on small screens) */}
                    <div className="mt-6 grid grid-cols-2 gap-3 lg:hidden">
                      {[
                        { name: 'Custom Software Development', icon: Cpu },
                        { name: 'Cloud & DevOps Solutions', icon: Globe },
                        { name: 'AI & Machine Learning', icon: Zap },
                        { name: 'Cybersecurity Services', icon: Shield }
                      ].map((service, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10"
                        >
                          <service.icon className="w-4 h-4 text-trine-orange flex-shrink-0" />
                          <span className="text-white text-xs font-medium">{service.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Side - Slide-in Services List (Right-to-Left Animation) */}
                  <div className="hidden lg:flex absolute right-0 top-0 bottom-0 w-1/2 items-center justify-center p-8 translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out bg-gradient-to-l from-trine-orange/10 via-trine-orange/5 to-transparent">
                    <div className="space-y-4 w-full max-w-sm">
                      <p className="text-sm font-semibold text-trine-orange uppercase tracking-wider mb-4">Available Services</p>
                      {[
                        { name: 'Custom Software Development', icon: Cpu },
                        { name: 'Cloud & DevOps Solutions', icon: Globe },
                        { name: 'AI & Machine Learning', icon: Zap },
                        { name: 'Cybersecurity Services', icon: Shield }
                      ].map((service, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-trine-orange/40 hover:bg-white/10 transition-all duration-300"
                          style={{ transitionDelay: `${idx * 50}ms` }}
                        >
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-trine-orange/20 to-trine-lightblue/20 flex items-center justify-center">
                            <service.icon className="w-5 h-5 text-trine-orange" />
                          </div>
                          <span className="text-white font-medium text-sm">{service.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Decorative Corner Element */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-trine-orange/15 to-transparent rounded-tl-full pointer-events-none"></div>
              </div>
            </div>

            {/* BOTTOM PART - Consulting Services Section with Left-to-Right Hover Animation */}
            <div className="group relative animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
              <div className="relative w-full min-h-[320px] bg-gradient-to-br from-gray-900/90 to-gray-900/60 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
                {/* Header Accent - Light Blue/Cyan Gradient */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-trine-lightblue via-trine-lightblue to-trine-green"></div>
                
                {/* Main Content Container */}
                <div className="relative h-full flex">
                  {/* Left Side - Slide-in Consulting Services List (Left-to-Right Animation) */}
                  <div className="hidden lg:flex absolute left-0 top-0 bottom-0 w-1/2 items-center justify-center p-8 -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out bg-gradient-to-r from-trine-lightblue/10 via-trine-lightblue/5 to-transparent">
                    <div className="space-y-3 w-full max-w-sm">
                      <p className="text-sm font-semibold text-trine-lightblue uppercase tracking-wider mb-4">Consulting Services</p>
                      {[
                        { name: 'Contingent Staffing', icon: Users },
                        { name: 'Permanent Hiring', icon: Briefcase },
                        { name: 'Contract to Hire', icon: Target },
                        { name: 'Statement of Work', icon: Layers },
                        { name: 'Managed Services', icon: TrendingUp }
                      ].map((service, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-trine-lightblue/40 hover:bg-white/10 transition-all duration-300"
                          style={{ transitionDelay: `${idx * 50}ms` }}
                        >
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-trine-lightblue/20 to-trine-green/20 flex items-center justify-center">
                            <service.icon className="w-5 h-5 text-trine-lightblue" />
                          </div>
                          <span className="text-white font-medium text-sm">{service.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Side - Always Visible Content */}
                  <div className="w-full lg:w-1/2 lg:ml-auto p-8 lg:p-10 flex flex-col justify-center transition-all duration-500 ease-out">
                    {/* Consulting Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-trine-lightblue/10 border border-trine-lightblue/30 mb-6 w-fit">
                      <Briefcase className="w-4 h-4 text-trine-lightblue" />
                      <span className="text-sm font-semibold text-trine-lightblue">Expert Guidance</span>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                      Consulting Services
                    </h3>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed max-w-xl">
                      Our expert consultants provide strategic guidance to help you navigate complex digital transformations, optimize operations, and unlock new growth opportunities for your business.
                    </p>

                    {/* CTA Button */}
                    <Link to="/consulting" className="group/btn inline-flex w-fit">
                      <button className="relative px-8 py-4 rounded-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-trine-lightblue to-trine-green transition-all duration-300 group-hover/btn:scale-105"></div>
                        <span className="relative flex items-center gap-2 text-white font-semibold">
                          Explore Consulting
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                        </span>
                      </button>
                    </Link>

                    {/* Mobile Consulting Service Items (visible only on small screens) */}
                    <div className="mt-6 grid grid-cols-2 gap-3 lg:hidden">
                      {[
                        { name: 'Contingent Staffing', icon: Users },
                        { name: 'Permanent Hiring', icon: Briefcase },
                        { name: 'Contract to Hire', icon: Target },
                        { name: 'Statement of Work', icon: Layers },
                        { name: 'Managed Services', icon: TrendingUp }
                      ].map((service, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10"
                        >
                          <service.icon className="w-4 h-4 text-trine-lightblue flex-shrink-0" />
                          <span className="text-white text-xs font-medium">{service.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Decorative Corner Element */}
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-trine-lightblue/15 to-transparent rounded-tr-full pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 lg:gap-16 animate-on-scroll opacity-0">
            {[
              { value: '100+', label: 'Services Delivered' },
              { value: '24/7', label: 'Support Available' },
              { value: '15+', label: 'Industry Experts' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-trine-orange via-trine-lightblue to-trine-green bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics / Impact Section */}
      <section className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-trine-black/90 via-trine-black/80 to-trine-green/20"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Award className="w-4 h-4 text-trine-orange" />
              <span className="text-sm font-semibold text-white">OUR IMPACT</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-6 text-white">
              <span className="block">Delivering Measurable</span>
              <span className="block bg-gradient-to-r from-trine-orange to-trine-green bg-clip-text text-transparent mt-2">Results That Matter</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { value: '50+', label: 'Projects Completed', icon: Rocket },
              { value: '92%', label: 'Client Satisfaction', icon: Heart },
              { value: '$1B+', label: 'Client Revenue Generated', icon: TrendingUp },
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center group animate-on-scroll opacity-0"
                data-testid={`stat-${index}`}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-trine-orange/20 to-trine-green/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-trine-orange" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 bg-white dark:bg-gray-900" aria-labelledby="industries-title">
        <div className="container">
          <div className="text-center mb-12">
            <h2 
              id="industries-title" 
              className="text-3xl md:text-4xl font-bold text-[#0A0A0A] dark:text-white mb-4"
              data-testid="industries-title"
            >
              Industries We Serve
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Delivering tailored solutions across diverse sectors.
            </p>
          </div>

          {/* Horizontal Industry Cards Row */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="group relative w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(16.666%-20px)] min-w-[160px] max-w-[200px]"
                data-testid={`industry-card-${index}`}
              >
                {/* Card Container */}
                <div className="relative overflow-hidden rounded-xl bg-[#0A0A0A] aspect-[3/4] cursor-pointer transition-all duration-300 ease-out hover:shadow-xl hover:shadow-[#F78B1F]/20 hover:scale-[1.02]">
                  {/* Background Image */}
                  <img
                    src={industry.image}
                    alt={`${industry.name} industry`}
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-30 transition-opacity duration-300"
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent"></div>
                  
                  {/* Default Content (Title) */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-2">
                    <h3 className="text-white font-semibold text-sm md:text-base leading-tight">
                      {industry.name}
                    </h3>
                  </div>
                  
                  {/* Hover Content (Description + Read More) */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                    <h3 className="text-white font-semibold text-sm mb-2">
                      {industry.name}
                    </h3>
                    <p className="text-gray-300 text-xs leading-relaxed mb-3 line-clamp-3">
                      {industry.description.length > INDUSTRY_DESCRIPTION_MAX_LENGTH 
                        ? `${industry.description.substring(0, INDUSTRY_DESCRIPTION_MAX_LENGTH)}...` 
                        : industry.description
                      }
                    </p>
                    <Link
                      to={`/industries/${industry.slug}`}
                      className="inline-flex items-center gap-1 text-[#F78B1F] hover:text-[#22C55E] font-medium text-xs transition-colors duration-200"
                    >
                      Read More
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                  
                  {/* Orange accent border on hover */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#F78B1F]/50 transition-colors duration-300 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-trine-orange via-trine-orange to-trine-lightblue">
        <div className="container text-center text-white px-6">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8">
              <Rocket className="w-5 h-5 text-white" />
              <span className="text-sm font-semibold text-white">
                Let's Transform Your Business Together
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold mb-8 leading-tight" data-testid="cta-title">
              <span className="block text-white">
                Ready to Build
              </span>
              <span className="block text-white/90 mt-2">
                The Future?
              </span>
            </h2>
            
            <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed text-white/90">
              Partner with us to transform your business and achieve <span className="font-semibold text-white">exceptional results</span> that drive growth.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/contact" data-testid="cta-contact-btn" className="group">
                <button className="px-8 py-4 rounded-lg bg-white text-trine-orange font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <span className="flex items-center gap-2">
                    Get Started Now
                    <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </Link>
              
              <Link to="/services" className="group">
                <button className="px-8 py-4 rounded-lg bg-white/20 backdrop-blur-sm border-2 border-white text-white font-semibold text-lg hover:bg-white/30 transition-all duration-300 flex items-center gap-2">
                  Explore Solutions
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .animate-on-scroll {
          transition: all 0.6s ease-out;
          opacity: 0;
          transform: translateY(30px);
        }
        
        .animate-on-scroll.animated {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </>
  );
};

export default Home;
