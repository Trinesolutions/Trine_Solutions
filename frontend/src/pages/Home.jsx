import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowRight, Zap, Shield,
  Sparkles, TrendingUp, Award, Users, Globe, Rocket, ChevronRight,
  Target, Lightbulb, Star, Heart
} from 'lucide-react';
import TestimonialSlider from '@/components/TestimonialSlider';
import { iconMap } from '@/utils/serviceIcons';
import { defaultServices, getSimplifiedServices } from '@/constants/defaultServices';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
const API = `${BACKEND_URL}/api`;

// Simplified services for Home page (from shared constants)
const mockServices = getSimplifiedServices(defaultServices);

const industries = [
  {
    name: 'Banking & Finance',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400',
    description: 'Digital banking solutions and fintech innovation'
  },
  {
    name: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400',
    description: 'Healthcare technology and patient care systems'
  },
  {
    name: 'Manufacturing',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
    description: 'Industry 4.0 and smart factory solutions'
  },
  {
    name: 'Retail & E-commerce',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
    description: 'Omnichannel retail and customer experience'
  },
  {
    name: 'Education',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400',
    description: 'EdTech and digital learning platforms'
  },
  {
    name: 'Logistics',
    image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400',
    description: 'Supply chain optimization and logistics tech'
  }
];

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

<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-black pt-20 transition-colors duration-500" aria-labelledby="hero-title">
  
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
          <span className="block text-gray-900 dark:text-white">Transform</span>
          <span className="block bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent mt-4 animate-pulse">
            Your Digital Future
          </span>
        </h1>

        <p className="text-xl lg:text-2xl mb-12 leading-relaxed text-gray-700 dark:text-white/80 font-light">
          Cutting-edge <span className="font-bold text-cyan-500">AI solutions</span>, enterprise
          <span className="font-bold text-blue-500"> cybersecurity</span>, and innovation that accelerates business growth.
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
            <button className="relative px-12 py-6 rounded-2xl bg-black/5 dark:bg-white/10 backdrop-blur-sm border-2 border-black/10 dark:border-white/30 text-gray-900 dark:text-white font-bold text-lg hover:bg-black/10 dark:hover:bg-white/20 transition-all duration-300 flex items-center gap-3 hover:scale-105">
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
                  src="./bg_hero.png" 
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
                    src="https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?w=800"
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

      {/* Services */}
      <section className="py-20 bg-white dark:bg-trine-black">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-trine-lightblue/10 to-trine-green/10 border border-trine-lightblue/20 mb-6">
              <Zap className="w-4 h-4 text-trine-lightblue" />
              <span className="text-sm font-semibold text-trine-lightblue">OUR SERVICES</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-6" data-testid="services-title">
              <span className="text-trine-black dark:text-white">Solutions That</span>
              <br />
              <span className="bg-gradient-to-r from-trine-lightblue to-trine-green bg-clip-text text-transparent">Drive Growth</span>
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions designed to accelerate your digital transformation journey and unlock new possibilities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Zap;
              return (
                <div
                  key={service.id}
                  className="group animate-on-scroll opacity-0 relative overflow-hidden rounded-xl p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-trine-lightblue/30 transition-all duration-300 hover:shadow-xl hover:shadow-trine-lightblue/10"
                  data-testid={`service-card-${index}`}
                >
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-trine-lightblue/10 to-trine-green/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-trine-lightblue" />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-4 text-trine-black dark:text-white group-hover:text-trine-lightblue transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <Link to="/services" data-testid={`service-learn-more-${index}`} className="inline-block">
                      <button className="group/btn flex items-center gap-2 text-trine-orange font-semibold hover:gap-3 transition-all duration-300">
                        <span>Learn More</span>
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-sky-50 dark:from-gray-900 dark:to-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-trine-green/10 to-trine-lightblue/10 border border-trine-green/20 mb-6">
              <Globe className="w-4 h-4 text-trine-green" />
              <span className="text-sm font-semibold text-trine-green">INDUSTRIES</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-6" data-testid="industries-title">
              <span className="text-trine-black dark:text-white">Expertise Across</span>
              <br />
              <span className="bg-gradient-to-r from-trine-green to-trine-lightblue bg-clip-text text-transparent">Every Sector</span>
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Delivering specialized solutions tailored to your industry's unique challenges and opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="group animate-on-scroll opacity-0 relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-trine-green/30 transition-all duration-300 hover:shadow-lg cursor-pointer"
                data-testid={`industry-card-${index}`}
              >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={industry.image}
                    alt={`${industry.name} industry solutions`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-trine-black/70 via-trine-black/30 to-transparent"></div>
                </div>
                
                <div className="absolute inset-0 flex items-end p-4">
                  <div className="w-full">
                    <h3 className="text-sm font-semibold text-white mb-2">
                      {industry.name}
                    </h3>
                    <div className="h-1 w-0 bg-gradient-to-r from-trine-orange to-trine-green group-hover:w-full transition-all duration-500"></div>
                  </div>
                </div>
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