import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowRight, Zap, Shield,
  Sparkles, TrendingUp, Award, Users, Globe, Rocket, ChevronRight,
  Target, Lightbulb, Star, Heart, Briefcase, MessageSquare, Layers, Cpu, CheckCircle2
} from 'lucide-react';
import TestimonialSlider from '@/components/TestimonialSlider';
import { iconMap, getIconByName } from '@/utils/serviceIcons';
import { defaultServices, getSimplifiedServices } from '@/constants/defaultServices';
import { staticClients } from '@/constants/defaultClients';
import SEO, { pageSEO, structuredDataSchemas } from '@/components/SEO';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
const API = `${BACKEND_URL}/api`;

// Hero background video path
const HERO_VIDEO_PATH = '/HERObGvideo.mp4';

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
  const [partners, setPartners] = useState(staticClients);
  
  // State for scroll-based auto-hover on service sections
  const [servicesInView, setServicesInView] = useState(false);
  const [consultingInView, setConsultingInView] = useState(false);
  
  // Refs for service sections
  const servicesRef = useRef(null);
  const consultingRef = useRef(null);
  
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
        
        // Fetch partners - combine static clients with dynamic ones from API
        try {
          console.log('Fetching partners from:', `${API}/partners`);
          const partnersRes = await axios.get(`${API}/partners`);
          console.log('Partners data received:', partnersRes.data);
          console.log('Number of dynamic partners:', partnersRes.data.length);
          // Combine static clients (always first) with dynamic clients from API
          // Filter out any dynamic partners that might have the same name as static ones
          // to avoid showing duplicate entries in the carousel (case-insensitive match)
          const uniqueDynamicPartners = partnersRes.data.filter(
            p => !staticClients.some(sc => sc.name.toLowerCase() === p.name.toLowerCase())
          );
          const combinedPartners = [...staticClients, ...uniqueDynamicPartners];
          setPartners(combinedPartners);
          console.log('Combined partners (static + dynamic):', combinedPartners);
        } catch (error) {
          console.error('Error fetching partners:', error);
          console.error('Error details:', error.response?.data);
          // On error, keep showing static clients
          setPartners(staticClients);
        }
      } catch (error) {
        console.error('General error fetching data:', error);
        // On error, keep showing static clients
        setPartners(staticClients);
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
    
    // IntersectionObserver for scroll-based auto-hover on service sections
    const observerOptions = {
      threshold: 0.4,
      rootMargin: '0px'
    };
    
    // Capture refs at setup time to avoid stale closure issues
    const servicesElement = servicesRef.current;
    const consultingElement = consultingRef.current;
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (servicesElement && entry.target === servicesElement) {
          setServicesInView(entry.isIntersecting);
        } else if (consultingElement && entry.target === consultingElement) {
          setConsultingInView(entry.isIntersecting);
        }
      });
    }, observerOptions);
    
    if (servicesElement) {
      sectionObserver.observe(servicesElement);
    }
    
    if (consultingElement) {
      sectionObserver.observe(consultingElement);
    }
    
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
      sectionObserver.disconnect();
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
      <source src={"3130182-uhd_3840_2160_30fps.mp4"} type="video/mp4" />
    </video>
    {/* Overlay for better text readability */}
    <div className="absolute inset-0 bg-black/60"></div>
  </div>

  {/* Centered Content */}
  <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center">
    <div className="max-w-5xl mx-auto">
      <h1
        id="hero-title"
        className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight pb-2"
      >
        <span className="block text-white">Transforming Ideas Into</span>
        <span className="block bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent mt-4 pb-2 animate-pulse">
          Intelligent Digital Solutions
        </span>
      </h1>

      <p className="text-xl lg:text-2xl mb-12 leading-relaxed text-white/90 font-light max-w-4xl mx-auto">
        Empowering businesses with scalable IT services, cloud solutions, and expert consulting to accelerate innovation and growth.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
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
              Our Clients
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

      {/* IMAGE Larger Height + More Top/Bottom Breathing Space */}
      <div className="animate-on-scroll opacity-0">
        <div className="relative group">

          <div className="absolute -inset-4 bg-gradient-to-r from-trine-orange/20 via-trine-lightblue/20 to-trine-green/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>

          <div className="relative overflow-hidden rounded-2xl shadow-lg">

            <img
              src="https://infomach.io/wp-content/uploads/2024/03/power-genrative-ia-aws-infomach-usa-1024x575.jpg"
              alt="Modern office workspace showcasing innovation"
              className="
                w-full 
                h-[400px]        /* Increased height */
                md:h-[480px]     /* Larger on medium screens */
                lg:h-[520px]     /* Even larger on large screens */
                xl:h-[560px]     /* Hero-like height on XL screens */
                object-cover 
                transform 
                group-hover:scale-105 
                transition-transform 
                duration-500
              "
              data-testid="about-image"
            />

          </div>
        </div>
      </div>

      {/* TEXT CONTENT */}
      <div className="animate-on-scroll opacity-0">

        <h2 className="text-4xl font-bold mb-6" data-testid="about-title">
          <span className="text-trine-black dark:text-white">Transforming</span>
          <br />
          <span className="bg-gradient-to-r from-trine-orange to-trine-lightblue bg-clip-text text-transparent">
            Vision Into Reality
          </span>
        </h2>

        <p className="text-lg mb-8 text-gray-600 dark:text-gray-300 leading-relaxed">
          Trine Solutions is a <span className="font-semibold text-trine-black dark:text-white">global leader</span> 
          {" "}in enterprise technology consulting, delivering innovative solutions that transform businesses 
          and drive <span className="font-semibold text-trine-orange">measurable results</span>.
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



{/* Services Preview Section - Ultra Premium (No Images) */}
<section
  className="relative py-28 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800"
  aria-labelledby="services-title"
>

  {/* Premium Animated Background */}
  <div className="absolute inset-0 pointer-events-none">

    {/* Gradient Glows */}
    <div className="absolute top-10 left-20 w-[28rem] h-[28rem] bg-trine-orange/20 rounded-full blur-[200px] opacity-30 animate-pulse"></div>
    <div className="absolute bottom-24 right-20 w-[26rem] h-[26rem] bg-trine-lightblue/20 rounded-full blur-[220px] opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
    <div className="absolute top-1/2 left-1/2 w-[32rem] h-[32rem] bg-trine-green/20 rounded-full blur-[230px] opacity-25 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '4s' }}></div>

    {/* Modern Grid Pattern */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,black,transparent)]"></div>
  </div>

  <div className="container relative z-10">

    {/* Section Header */}
    <div className="text-center mb-24">
      <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-md shadow-black/20 mb-8">
        <Layers className="w-4 h-4 text-trine-orange" />
        <span className="text-sm tracking-[0.2em] text-white font-semibold uppercase">
          Our Services
        </span>
      </div>

      <h2
        id="services-title"
        className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6"
      >
        <span className="text-white">Future-Ready </span>
        <span className="bg-gradient-to-r from-trine-orange via-trine-lightblue to-trine-green bg-clip-text text-transparent">
          Digital Solutions
        </span>
      </h2>

      <p className="text-lg max-w-2xl mx-auto text-slate-300 leading-relaxed">
        Scalable, secure, and high-performance services engineered to accelerate your business transformation.
      </p>
    </div>

    {/* Services Grid */}
    <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">

      {/* IT Services Card */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-trine-orange/15 to-trine-lightblue/15 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>

        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-800/90 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/30 p-8 transition-all duration-500 group-hover:border-trine-orange/30 group-hover:shadow-trine-orange/20 group-hover:scale-[1.02] min-h-[520px] flex flex-col">

          <div className="flex flex-col space-y-7 flex-grow">

            {/* Icon Header */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-trine-orange to-orange-600 flex items-center justify-center shadow-xl shadow-orange-500/30">
                <Cpu className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-white text-2xl font-bold">IT Services</h3>
                <p className="text-gray-400 text-sm">Technology Engineering</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-[15px] leading-relaxed">
              Enterprise technology services across development, cloud, automation, AI/ML,
              system integration, and cybersecurity built for scale & performance.
            </p>

            {/* List */}
            <div className="space-y-3 flex-grow">
              {defaultServices.slice(0, 4).map((service, index) => (
                <div
                  key={service.id}
                  className="flex items-center gap-3 group/item transition-all hover:translate-x-1"
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-trine-orange to-orange-500 shadow-sm shadow-orange-500/40"></div>
                  <span className="text-white text-sm font-medium tracking-wide">{service.title}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link to="/services" className="mt-auto">
              <button className="w-full px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-trine-orange/20 hover:border-trine-orange/40 transition-all duration-300 shadow-lg hover:shadow-orange-500/20 flex items-center justify-center gap-2">
                Explore Services
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

          </div>
        </div>
      </div>

      {/* Consulting Card */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-trine-green/15 to-trine-orange/15 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>

        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-800/90 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/30 p-8 transition-all duration-500 group-hover:border-trine-green/30 group-hover:shadow-trine-green/20 group-hover:scale-[1.02] min-h-[520px] flex flex-col">

          <div className="flex flex-col space-y-7 flex-grow">

            {/* Icon Header */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-trine-green to-green-600 flex items-center justify-center shadow-xl shadow-green-500/30">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-white text-2xl font-bold">Consulting</h3>
                <p className="text-gray-400 text-sm">Strategic Advisory</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-[15px] leading-relaxed">
              Specialized consulting across talent acquisition, contract staffing,
              digital transformation, operational excellence, and enterprise growth strategy.
            </p>

            {/* List */}
            <div className="space-y-3 flex-grow">
              {[
                "Contingent Staffing",
                "Permanent Hiring",
                "Contract to Hire",
                "Managed Services",
              ].map((service, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 group/item hover:translate-x-1 transition-all"
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-trine-green to-green-500 shadow-sm shadow-green-500/40"></div>
                  <span className="text-white text-sm font-medium tracking-wide">
                    {service}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link to="/consulting" className="mt-auto">
              <button className="w-full px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-trine-green/20 hover:border-trine-green/40 transition-all duration-300 shadow-lg hover:shadow-green-500/20 flex items-center justify-center gap-2">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>


{/* Why Choose Us Section */}
<section className="py-24 relative overflow-hidden bg-gradient-to-br from-white/60 via-trine-lightblue/5 to-white/70 dark:from-gray-900 dark:via-purple-900/5" aria-labelledby="why-choose-us-title">
  {/* Decorative colorful orbs */}
  <div className="absolute -right-40 -top-20 w-72 h-72 bg-gradient-to-br from-trine-orange/30 via-trine-lightblue/20 to-transparent rounded-full blur-3xl opacity-90 pointer-events-none"></div>
  <div className="absolute -left-36 top-28 w-64 h-64 bg-gradient-to-br from-trine-green/30 via-trine-lightblue/10 to-transparent rounded-full blur-3xl opacity-90 pointer-events-none"></div>
  <div className="absolute right-10 bottom-10 w-56 h-56 bg-gradient-to-br from-purple-400/20 via-pink-300/10 to-transparent rounded-full blur-2xl opacity-80 pointer-events-none"></div>

  <div className="container relative z-10">
    {/* Section Header */}
    <div className="text-center mb-16 animate-on-scroll opacity-0">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-trine-orange/25 to-trine-lightblue/25 border border-trine-orange/30 mb-6 backdrop-blur-sm">
        <Star className="w-4 h-4 text-trine-orange" />
        <span className="text-sm font-semibold text-trine-orange uppercase tracking-wider">Our Advantage</span>
      </div>
      <h2 id="why-choose-us-title" className="text-4xl md:text-5xl font-bold mb-4">
        <span className="text-trine-black dark:text-white">Why Choose </span>
        <span className="bg-gradient-to-r from-trine-orange via-trine-lightblue to-trine-green bg-clip-text text-transparent">Trine Solutions</span>
      </h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
        Partner with a team that combines deep expertise, innovative thinking, and proven delivery excellence.
      </p>
    </div>

    {/* Features Grid (more vivid colors) */}
    <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
      {/* Feature 1 */}
      <div className="group relative animate-on-scroll opacity-0">
        <div className="relative overflow-hidden rounded-2xl p-6 border border-transparent bg-gradient-to-br from-orange-50/80 via-trine-orange/30 to-orange-100 shadow-lg hover:shadow-2xl transition-all duration-500 min-h-[340px] flex flex-col">
          <div className="absolute -right-8 -top-8 w-36 h-36 bg-gradient-to-br from-trine-orange/30 to-orange-300/10 rounded-full blur-3xl opacity-90"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-trine-orange to-orange-500 shadow-xl flex items-center justify-center mb-6 transform group-hover:scale-105 transition-all duration-300">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-trine-black dark:text-white mb-4">
              Expert-Led Technology Consulting
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Our senior architects, engineers, and consultants bring deep industry experience to every project. We provide strategic guidance and technical expertise to help you solve complex business challenges with precision and confidence.
            </p>
          </div>
        </div>
      </div>

      {/* Feature 2 */}
      <div className="group relative animate-on-scroll opacity-0" style={{ animationDelay: '0.1s' }}>
        <div className="relative overflow-hidden rounded-2xl p-6 border border-transparent bg-gradient-to-br from-cyan-50/80 via-trine-lightblue/30 to-cyan-100 shadow-lg hover:shadow-2xl transition-all duration-500 min-h-[340px] flex flex-col">
          <div className="absolute -right-6 -top-6 w-36 h-36 bg-gradient-to-br from-trine-lightblue/25 to-cyan-300/10 rounded-full blur-3xl opacity-90"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-trine-lightblue to-cyan-500 shadow-xl flex items-center justify-center mb-6 transform group-hover:scale-105 transition-all duration-300">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-trine-black dark:text-white mb-4">
              Scalable, Future-Ready Solutions
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We design technology solutions that grow with your business. Our architectures ensure long-term stability, seamless scalability, and continuous innovation so your organization stays ahead in a fast-changing digital world.
            </p>
          </div>
        </div>
      </div>

      {/* Feature 3 */}
      <div className="group relative animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
        <div className="relative overflow-hidden rounded-2xl p-6 border border-transparent bg-gradient-to-br from-emerald-50/80 via-trine-green/30 to-emerald-100 shadow-lg hover:shadow-2xl transition-all duration-500 min-h-[340px] flex flex-col">
          <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-gradient-to-br from-trine-green/25 to-emerald-300/10 rounded-full blur-3xl opacity-90"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-trine-green to-emerald-500 shadow-xl flex items-center justify-center mb-6 transform group-hover:scale-105 transition-all duration-300">
              <Award className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-trine-black dark:text-white mb-4">
              Proven Delivery Excellence
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Quality, transparency, and reliability define our approach. We follow robust delivery frameworks and communicate openly throughout every phase, ensuring your projects are completed on time and exceed expectations.
            </p>
          </div>
        </div>
      </div>

      {/* Feature 4 */}
      <div className="group relative animate-on-scroll opacity-0" style={{ animationDelay: '0.3s' }}>
        <div className="relative overflow-hidden rounded-2xl p-6 border border-transparent bg-gradient-to-br from-pink-50/80 via-purple-50/30 to-pink-100 shadow-lg hover:shadow-2xl transition-all duration-500 min-h-[340px] flex flex-col">
          <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-gradient-to-br from-purple-400/25 to-pink-300/10 rounded-full blur-3xl opacity-90"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 shadow-xl flex items-center justify-center mb-6 transform group-hover:scale-105 transition-all duration-300">
              <Lightbulb className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-trine-black dark:text-white mb-4">
              Innovation at the Core
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We leverage AI, machine learning, cloud automation, and emerging technologies to build intelligent solutions that transform operations and drive competitive advantage for modern enterprises.
            </p>
          </div>
        </div>
      </div>
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
              { value: '92%', label: 'Success Rate', icon: Heart },
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

      {/* Engagement Models Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/10" aria-labelledby="engagement-models-title">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-trine-orange/10 via-trine-lightblue/10 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-trine-green/10 via-purple-400/10 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        
        <div className="container relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-trine-orange/20 to-trine-lightblue/20 dark:from-trine-orange/30 dark:to-trine-lightblue/30 border border-trine-orange/30 dark:border-trine-orange/40 mb-6 backdrop-blur-sm">
              <Briefcase className="w-4 h-4 text-trine-orange dark:text-trine-orange" />
              <span className="text-sm font-semibold text-trine-orange dark:text-trine-orange uppercase tracking-wider">Partnership Models</span>
            </div>
            <h2 id="engagement-models-title" className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-trine-black dark:text-white">Engagement </span>
              <span className="bg-gradient-to-r from-trine-orange via-trine-lightblue to-trine-green bg-clip-text text-transparent">Models</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Flexible ways to partner with us. Choose the model that best fits your project needs and business goals.
            </p>
          </div>

          {/* Engagement Models Grid */}
          <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            
            {/* Model 1: Dedicated Engineering Teams */}
            <div className="group relative animate-on-scroll opacity-0">
              <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-orange-50/90 via-white to-orange-50/50 dark:from-gray-800 dark:via-gray-800/90 dark:to-orange-900/20 border border-orange-200/50 dark:border-orange-700/30 hover:border-trine-orange/60 dark:hover:border-trine-orange/50 shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 dark:hover:shadow-orange-500/10 transition-all duration-500 hover:scale-[1.02] min-h-[400px] flex flex-col">
                {/* Decorative gradient orb */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-trine-orange/30 to-orange-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-trine-orange to-orange-600 shadow-lg shadow-orange-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-trine-black dark:text-white mb-3 leading-tight">
                    Dedicated Engineering Teams
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    Scale your digital capabilities with fully managed, long-term engineering teams. Our dedicated experts integrate seamlessly into your workflow, delivering consistent value, innovation, and technical excellence.
                  </p>
                  
                  {/* Key Features */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-trine-orange" />
                      <span>Long-term collaboration</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-trine-orange" />
                      <span>Full team integration</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Model 2: Fixed-Price Projects */}
            <div className="group relative animate-on-scroll opacity-0" style={{ animationDelay: '0.1s' }}>
              <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-cyan-50/90 via-white to-cyan-50/50 dark:from-gray-800 dark:via-gray-800/90 dark:to-cyan-900/20 border border-cyan-200/50 dark:border-cyan-700/30 hover:border-trine-lightblue/60 dark:hover:border-trine-lightblue/50 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 dark:hover:shadow-cyan-500/10 transition-all duration-500 hover:scale-[1.02] min-h-[400px] flex flex-col">
                {/* Decorative gradient orb */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-trine-lightblue/30 to-cyan-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-trine-lightblue to-cyan-600 shadow-lg shadow-cyan-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-trine-black dark:text-white mb-3 leading-tight">
                    Fixed-Price Projects
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    Ideal for well-defined requirements, this model ensures clear scope, predictable timelines, and guaranteed deliverables. You get full transparency and a high-quality solution delivered on schedule and within budget.
                  </p>
                  
                  {/* Key Features */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-trine-lightblue" />
                      <span>Predictable budgets</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-trine-lightblue" />
                      <span>Clear deliverables</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Model 3: Staff Augmentation */}
            <div className="group relative animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
              <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-green-50/90 via-white to-emerald-50/50 dark:from-gray-800 dark:via-gray-800/90 dark:to-green-900/20 border border-green-200/50 dark:border-green-700/30 hover:border-trine-green/60 dark:hover:border-trine-green/50 shadow-lg hover:shadow-2xl hover:shadow-green-500/20 dark:hover:shadow-green-500/10 transition-all duration-500 hover:scale-[1.02] min-h-[400px] flex flex-col">
                {/* Decorative gradient orb */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-trine-green/30 to-emerald-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-trine-green to-emerald-600 shadow-lg shadow-green-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-trine-black dark:text-white mb-3 leading-tight">
                    Staff Augmentation
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    Strengthen your existing team with specialized engineers, developers, or consultants. Our skilled professionals help you accelerate development, meet deadlines, and enhance technical capacity without long-term hiring overhead.
                  </p>
                  
                  {/* Key Features */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-trine-green" />
                      <span>Expert specialists</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-trine-green" />
                      <span>Flexible scaling</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Model 4: End-to-End Solution Delivery */}
            <div className="group relative animate-on-scroll opacity-0" style={{ animationDelay: '0.3s' }}>
              <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-purple-50/90 via-white to-pink-50/50 dark:from-gray-800 dark:via-gray-800/90 dark:to-purple-900/20 border border-purple-200/50 dark:border-purple-700/30 hover:border-purple-500/60 dark:hover:border-purple-500/50 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 dark:hover:shadow-purple-500/10 transition-all duration-500 hover:scale-[1.02] min-h-[400px] flex flex-col">
                {/* Decorative gradient orb */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-pink-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Rocket className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-trine-black dark:text-white mb-3 leading-tight">
                    End-to-End Solution Delivery
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    From concept to deployment, we handle the complete lifecycle of your project. Our team manages strategy, design, development, testing, and support, ensuring a seamless experience and measurable business outcomes.
                  </p>
                  
                  {/* Key Features */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                      <span>Complete lifecycle</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                      <span>Turnkey solutions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12 animate-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
            <Link to="/contact" className="group inline-flex">
              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-trine-orange/10 to-trine-green/10 hover:from-trine-orange/20 hover:to-trine-green/20 border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm">
                <span className="flex items-center gap-3 text-trine-black dark:text-white font-semibold">
                  Discuss Your Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </Link>
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
