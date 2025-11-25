import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowRight, Zap, Shield, Cloud, BarChart3, FileCheck, Wrench,
  Sparkles, TrendingUp, Award, Users, Globe, Rocket, ChevronRight,
  Target, Lightbulb, Star, Heart
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const iconMap = {
  Zap,
  Shield,
  Cloud,
  BarChart3,
  FileCheck,
  Wrench,
};

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

const partners = [
  { name: 'AWS', logo: '🅰' },
  { name: 'Microsoft', logo: 'Ⓜ' },
  { name: 'Google Cloud', logo: 'Ⓖ' },
  { name: 'IBM', logo: 'Ⓘ' },
  { name: 'Oracle', logo: 'Ⓞ' },
  { name: 'Salesforce', logo: 'Ⓢ' }
];

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
    name: 'Sarah Chen',
    role: 'CTO, Global Finance Corp',
    content: 'Trine Solutions transformed our digital infrastructure, resulting in 40% cost savings and unprecedented scalability.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    rating: 5
  },
  {
    name: 'Marcus Johnson',
    role: 'CEO, TechInnovate Inc',
    content: 'Their cybersecurity implementation protected us from a major breach. The ROI was immediate and substantial.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    rating: 5
  },
  {
    name: 'Elena Rodriguez',
    role: 'Digital Director, Retail Giant',
    content: 'The e-commerce platform they built increased our conversion rate by 65%. Exceptional work from start to finish.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    rating: 5
  }
];

const Home = () => {
  const [services, setServices] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, casesRes, blogRes] = await Promise.all([
          axios.get(`${API}/services`),
          axios.get(`${API}/case-studies`),
          axios.get(`${API}/blog`),
        ]);
        setServices(servicesRes.data);
        setCaseStudies(casesRes.data.slice(0, 3));
        setBlogPosts(blogRes.data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
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
      <Star key={i} className="w-4 h-4 text-orange-500 fill-orange-500" />
    ));
  };

  return (
    <main className="min-h-screen bg-white" data-testid="home-page" role="main">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-green-50 pt-20" aria-labelledby="hero-title">
        <div className="container text-center px-6">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 border border-orange-200 mb-8">
              <span className="text-sm font-semibold text-orange-800">
                Digital Innovation & Excellence
              </span>
            </div>
            
            <h1 id="hero-title" className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight" data-testid="hero-title">
              <span className="block text-black">
                Transform
              </span>
              <span className="block text-orange-600 mt-2">
                Your Future
              </span>
            </h1>
            
            <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed text-gray-600" data-testid="hero-subtitle">
              Enterprise solutions in <span className="font-semibold text-black">consulting, cybersecurity,</span> and <span className="font-semibold text-orange-600">digital transformation</span> that drive measurable business growth.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link to="/services" data-testid="explore-services-btn" className="group">
                <button className="px-8 py-4 rounded-lg bg-orange-600 text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:bg-orange-700 hover:shadow-lg">
                  <span className="flex items-center gap-2">
                    Explore Services
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </Link>
              
              <Link to="/contact" data-testid="get-consultation-btn" className="group">
                <button className="px-8 py-4 rounded-lg bg-white border-2 border-orange-600 text-orange-600 font-semibold text-lg hover:bg-orange-50 transition-all duration-300 flex items-center gap-2">
                  Get Started
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white" aria-labelledby="partners-title">
        <div className="container">
          <div className="text-center mb-12">
            <h2 id="partners-title" className="text-3xl font-bold text-black mb-4">
              Trusted Partners
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Collaborating with industry leaders to deliver exceptional results
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="group animate-on-scroll opacity-0"
              >
                <div className="text-3xl font-bold text-gray-400 group-hover:text-orange-600 transition-colors duration-300">
                  {partner.logo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-green-50" aria-labelledby="about-title">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll opacity-0">
              <div className="relative group">
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
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-orange-100 border border-orange-200 mb-6">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">ABOUT US</span>
              </div>
              
              <h2 className="text-4xl font-bold mb-6" data-testid="about-title">
                <span className="text-black">
                  Transforming
                </span>
                <br />
                <span className="text-orange-600">
                  Vision Into Reality
                </span>
              </h2>
              
              <p className="text-lg mb-8 text-gray-600 leading-relaxed">
                Trine Solutions is a <span className="font-semibold text-black">global leader</span> in enterprise technology consulting, delivering innovative solutions that transform businesses and drive <span className="font-semibold text-orange-600">measurable results</span>.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-xl p-4 bg-white border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:shadow-md"
                    >
                      <div className="relative z-10">
                        <IconComponent className="w-8 h-8 text-orange-600 mb-3" />
                        <h3 className="font-semibold text-black mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <Link to="/about" data-testid="learn-more-about-btn" className="group inline-block">
                <button className="px-6 py-3 rounded-lg bg-orange-600 text-white font-semibold transition-all duration-300 hover:bg-orange-700 hover:shadow-lg">
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
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-orange-100 border border-orange-200 mb-6">
              <Zap className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-semibold text-orange-800">OUR SERVICES</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-6" data-testid="services-title">
              <span className="text-black">Solutions That</span>
              <br />
              <span className="text-orange-600">Drive Growth</span>
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions designed to accelerate your digital transformation journey and unlock new possibilities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Zap;
              return (
                <div
                  key={service.id}
                  className="group animate-on-scroll opacity-0 relative overflow-hidden rounded-xl p-6 bg-white border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:shadow-lg"
                  data-testid={`service-card-${index}`}
                >
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-lg bg-orange-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-orange-600" />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-4 text-black group-hover:text-orange-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <Link to="/services" data-testid={`service-learn-more-${index}`} className="inline-block">
                      <button className="group/btn flex items-center gap-2 text-orange-600 font-semibold hover:gap-3 transition-all duration-300">
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
      <section className="py-20 bg-green-50">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-orange-100 border border-orange-200 mb-6">
              <Globe className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-semibold text-orange-800">INDUSTRIES</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-6" data-testid="industries-title">
              <span className="text-black">Expertise Across</span>
              <br />
              <span className="text-orange-600">Every Sector</span>
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Delivering specialized solutions tailored to your industry's unique challenges and opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="group animate-on-scroll opacity-0 relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:shadow-lg cursor-pointer"
                data-testid={`industry-card-${index}`}
              >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={industry.image}
                    alt={`${industry.name} industry solutions`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                </div>
                
                <div className="absolute inset-0 flex items-end p-4">
                  <div className="w-full">
                    <h3 className="text-sm font-semibold text-white mb-2">
                      {industry.name}
                    </h3>
                    <div className="h-1 w-0 bg-orange-500 group-hover:w-full transition-all duration-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-orange-100 border border-orange-200 mb-6">
              <Users className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-semibold text-orange-800">CLIENT TESTIMONIALS</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-black">Trusted by</span>
              <br />
              <span className="text-orange-600">Industry Leaders</span>
            </h2>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`group relative p-6 rounded-xl border transition-all duration-300 ${
                      index === activeTestimonial
                        ? 'bg-orange-50 border-orange-300 shadow-lg'
                        : 'bg-white border-gray-200 hover:border-orange-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex gap-1 mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {testimonial.content}
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-lg border-2 border-orange-200"
                      />
                      <div>
                        <div className="font-semibold text-black">{testimonial.name}</div>
                        <div className="text-orange-600 text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center gap-3 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeTestimonial
                        ? 'bg-orange-600 scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600">
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
              <span className="block text-orange-100 mt-2">
                The Future?
              </span>
            </h2>
            
            <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed text-orange-100">
              Partner with us to transform your business and achieve <span className="font-semibold text-white">exceptional results</span> that drive growth.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/contact" data-testid="cta-contact-btn" className="group">
                <button className="px-8 py-4 rounded-lg bg-white text-orange-600 font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105">
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
    </main>
  );
};

export default Home;