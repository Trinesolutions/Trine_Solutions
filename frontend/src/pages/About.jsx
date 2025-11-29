import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Target, Eye, Award, Users, Globe2, TrendingUp, Star, Zap, Heart, Shield, Clock, Code2, Cloud, Database, Cpu, Network, ArrowRight } from 'lucide-react';
import SEO, { pageSEO } from '@/components/SEO';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
const API = `${BACKEND_URL}/api`;

// Enhanced mock team data
const mockTeam = [
  {
    id: 1,
    name: 'James Mitchell',
    position: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    bio: 'Visionary leader with 20+ years in enterprise technology transformation.',
    expertise: ['AI Strategy', 'Digital Transformation', 'Leadership']
  },
  {
    id: 2,
    name: 'Sarah Williams',
    position: 'Chief Technology Officer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    bio: 'Expert in cloud architecture and AI-driven solutions.',
    expertise: ['Cloud Computing', 'Machine Learning', 'System Architecture']
  },
  {
    id: 3,
    name: 'Michael Chen',
    position: 'Chief Operations Officer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    bio: 'Streamlining operations for global enterprises since 2010.',
    expertise: ['Operations', 'Process Optimization', 'Global Delivery']
  },
  {
    id: 4,
    name: 'Emily Rodriguez',
    position: 'Chief Marketing Officer',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    bio: 'Building brand excellence through innovative marketing strategies.',
    expertise: ['Digital Marketing', 'Brand Strategy', 'Growth Hacking']
  }
];

const About = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(`${API}/team`);
        setTeam(response.data.length > 0 ? response.data : mockTeam);
      } catch (error) {
        console.error('Error fetching team:', error);
        setTeam(mockTeam);
      }
    };
    fetchTeam();
  }, []);

  const expertiseAreas = [
    { icon: Cloud, title: 'Cloud Solutions', description: 'End-to-end cloud migration and optimization', color: 'from-blue-500 to-cyan-500' },
    { icon: Cpu, title: 'AI & Machine Learning', description: 'Intelligent automation and predictive analytics', color: 'from-purple-500 to-pink-500' },
    { icon: Shield, title: 'Cyber Security', description: 'Enterprise-grade security and compliance', color: 'from-green-500 to-emerald-500' },
    { icon: Database, title: 'Data Engineering', description: 'Scalable data pipelines and analytics', color: 'from-orange-500 to-red-500' },
    { icon: Code2, title: 'Software Development', description: 'Custom applications and digital products', color: 'from-indigo-500 to-blue-500' },
    { icon: Network, title: 'Digital Transformation', description: 'Strategic technology modernization', color: 'from-cyan-500 to-teal-500' },
  ];

  const values = [
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We push boundaries and embrace emerging technologies to deliver cutting-edge solutions.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Heart,
      title: 'Excellence',
      description: 'Quality is at the core of everything we do, from code to customer experience.',
      gradient: 'from-red-500 to-orange-500'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and diverse perspectives to solve complex challenges.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: 'Impact',
      description: 'Our solutions drive measurable business outcomes and create lasting value.',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const timeline = [
    { 
      year: '2015', 
      event: 'Started Our Journey', 
      description: 'Started with a mission to deliver impactful digital transformation solutions.',
      milestone: 'Secured our first enterprise technology engagement'
    },
    { 
      year: '2017', 
      event: 'Presence', 
      description: 'Expanded delivery capabilities across North America',
      milestone: 'Built a high-performance technology consulting team'
    },
    { 
      year: '2019', 
      event: 'Cloud-First Acceleration', 
      description: 'Scaled cloud modernization and DevOps practices for enterprise clients.',
      milestone: 'Completed 10+ cloud transformation and modernization projects'
    },
    { 
      year: '2021', 
      event: 'Data & AI Excellence', 
      description: 'Introduced advanced analytics, automation, and AI-driven engineering services.',
      milestone: 'Launched enterprise-ready AI and data intelligence frameworks'
    },
    { 
      year: '2023', 
      event: 'Secure & Sustainable Tech', 
      description: 'Strengthened cybersecurity offerings and adopted sustainable IT practices.',
      milestone: 'Achieved recognition for secure, scalable, and energy-efficient solutions'
    },
    { 
      year: '2025', 
      event: 'Next-Gen Innovation', 
      description: 'Pioneering solutions in Quantum Computing, Edge AI, and Intelligent Platforms.',
      milestone: 'Established a dedicated innovation lab for emerging technologies'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/20 dark:from-gray-900 dark:via-blue-950/30 dark:to-cyan-950/20" data-testid="about-page">
      <SEO 
        {...pageSEO.about}
        canonicalUrl="https://trinesolutions.com/about"
        breadcrumbs={[
          { name: 'Home', url: 'https://trinesolutions.com/' },
          { name: 'About Us', url: 'https://trinesolutions.com/about' }
        ]}
      />
      
      {/* Hero Section with Right Side Transparent Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-12 lg:pb-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/20"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                <Star className="w-4 h-4 text-cyan-300" />
                <span className="text-sm font-medium text-white">Trusted by Fortune 500 Companies</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-black mb-8 bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent" data-testid="about-hero-title">
                Digital
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Transformation</span>
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl mb-12 opacity-90 leading-relaxed text-white">
                We architect the future of enterprise technology through innovative solutions, 
                cutting-edge expertise, and a passion for digital excellence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Link to="/contact" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold hover:bg-cyan-50 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                    Schedule Consultation
                  </button>
                </Link>
                <Link to="/services" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-bold backdrop-blur-sm hover:bg-white/10 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                    Explore Services
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative block mt-12 lg:mt-0">
              <div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
                 <img 
                   src="./career.svg" 
                   alt="About Us Hero" 
                   className="w-full h-full object-contain drop-shadow-2xl transform scale-110"
                 />
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Enhanced Vision & Mission */}
      <section className="py-12 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/50 to-cyan-50/30 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-cyan-950/20"></div>
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Vision */}
            <div className="relative group" data-testid="vision-card">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Our Vision
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  To be the world's most trusted partner in enterprise digital transformation, 
                  empowering organizations to achieve sustainable growth through innovative 
                  technology solutions that shape the future of business.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Zap className="w-4 h-4" />
                  <span>Driving innovation since 2015</span>
                </div>
              </div>
            </div>

            {/* Mission */}
            <div className="relative group" data-testid="mission-card">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  To deliver cutting-edge solutions that drive operational excellence, 
                  enhance security, and accelerate innovation while maintaining the 
                  highest standards of quality, integrity, and sustainable practices.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Target className="w-4 h-4" />
                  <span>Excellence in every delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Timeline */}
      <section className="py-12 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-gray-100/30 dark:via-gray-800/50 dark:to-gray-900/30"></div>
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-center mb-12 lg:mb-20" data-testid="timeline-title">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Our Journey
            </span>
          </h2>
          
          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 hidden lg:block rounded-full shadow-2xl"></div>
            
            <div className="space-y-12 lg:space-y-24">
              {timeline.map((item, index) => (
                <div key={index} className={`flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`} data-testid={`timeline-item-${index}`}>
                  {/* Content */}
                  <div className="w-full lg:flex-1 lg:px-12">
                    <div className="relative group">
                      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
                      <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 group-hover:shadow-2xl transition-all duration-300">
                        <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                          {item.year}
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
                          {item.event}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-semibold">
                          <Star className="w-4 h-4" />
                          <span>{item.milestone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 border-4 border-white dark:border-gray-900 z-10 hidden lg:flex items-center justify-center shadow-2xl">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>

                  {/* Year Marker */}
                  <div className="flex-1 lg:px-12 hidden lg:block">
                    <div className={`text-6xl font-black opacity-10 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      {item.year}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50/50 to-cyan-50/30 dark:from-purple-950/20 dark:via-blue-950/10 dark:to-cyan-950/20"></div>
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Our Values
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The principles that guide our work and define our culture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-8 text-center hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className={`relative z-10 w-20 h-20 rounded-3xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {value.description}
                </p>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}>
                  <div className="absolute inset-[2px] rounded-3xl bg-white dark:bg-gray-800"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Culture Section */}
      <section className="py-12 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50/50 to-purple-50/30 dark:from-cyan-950/20 dark:via-blue-950/10 dark:to-purple-950/20"></div>
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-center mb-12 lg:mb-20" data-testid="culture-title">
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Culture
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div 
              className="group relative overflow-hidden rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-8 hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
              data-testid="culture-innovation"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400 group-hover:text-white transition-colors duration-300">
                  Innovation First
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                  We foster a culture of continuous learning and experimentation, 
                  encouraging our team to push boundaries and explore new technologies 
                  that shape the future of enterprise solutions.
                </p>
              </div>
            </div>
            
            <div 
              className="group relative overflow-hidden rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-8 hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
              data-testid="culture-collaboration"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300">
                  Collaborative Spirit
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                  Our success is built on teamwork, diversity, and the collective 
                  expertise of professionals from around the world working together 
                  to solve complex challenges.
                </p>
              </div>
            </div>
            
            <div 
              className="group relative overflow-hidden rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-8 hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
              data-testid="culture-impact"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400 group-hover:text-white transition-colors duration-300">
                  Meaningful Impact
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                  We're committed to delivering solutions that create lasting value 
                  for our clients and contribute to a sustainable future through 
                  responsible technology practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/20"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-black mb-8">
            Ready to Transform
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-200 bg-clip-text text-transparent">
              Your Business?
            </span>
          </h2>
          
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 opacity-90 leading-relaxed">
            Let's discuss how our expertise can drive your digital transformation journey 
            and create lasting impact for your organization.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/contact">
              <button className="px-12 py-5 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:bg-cyan-50 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                Schedule Consultation
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;