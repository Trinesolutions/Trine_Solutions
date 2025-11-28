import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ArrowRight, CheckCircle2, Mail, Phone, Send, User, Building, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { getIconByName } from '@/utils/serviceIcons';
import { getDefaultServiceImage, defaultServices } from '@/constants/defaultServices';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Consulting form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`${API}/services/${id}`);
        setService(response.data);
      } catch (err) {
        console.error('Error fetching service:', err);
        // Try to find the service in default services as fallback
        const defaultService = defaultServices.find(s => s.id === id);
        if (defaultService) {
          setService(defaultService);
        } else {
          setError('Service not found');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Include service name in the message for context
      const payload = {
        ...formData,
        message: `[Service Inquiry: ${service?.title}]\n\n${formData.message}`,
      };
      await axios.post(`${API}/contact`, payload);
      toast.success(`Thank you! We'll get back to you soon about ${service?.title}.`);
      setFormData({ name: '', email: '', company: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-trine-orange"></div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4 text-trine-black dark:text-white">Service Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">The service you're looking for doesn't exist.</p>
        <Link
          to="/services"
          className="btn-primary flex items-center space-x-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Services</span>
        </Link>
      </div>
    );
  }

  const Icon = getIconByName(service.icon);
  const serviceImage = service.image || getDefaultServiceImage(parseInt(id, 10) || 0);

  return (
    <div className="min-h-screen" data-testid="service-detail-page">
      {/* Hero Section with Service Image Background */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${serviceImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-trine-black/80 via-trine-black/70 to-trine-orange/40"></div>
        
        {/* Animated Decorative Elements */}
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-20 left-20 w-72 h-72 bg-trine-orange rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-trine-green rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Hero Content */}
        <div className="container relative z-10 text-center text-white">
          <Link
            to="/services"
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Services</span>
          </Link>
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-trine-orange to-trine-green backdrop-blur-sm flex items-center justify-center mx-auto mb-8 shadow-2xl transform hover:scale-110 transition-all duration-300">
            <Icon className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 animate-fade-in-up" data-testid="service-detail-title">
            {service.title}
          </h1>
          <p className="text-xl lg:text-2xl max-w-4xl mx-auto opacity-95 animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
            {service.description}
          </p>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Service Content */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Service Image */}
            <div className="glass-card p-4 rounded-3xl hover:border-trine-orange/30 transition-all duration-300 hover:scale-105 transform">
              <img
                src={serviceImage}
                alt={service.title}
                className="rounded-2xl w-full h-[400px] object-cover"
              />
            </div>

            {/* Service Details */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-trine-black dark:text-white">
                About This Service
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {service.fullDescription || service.description}
              </p>

              {/* Capabilities */}
              {service.capabilities && service.capabilities.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-trine-black dark:text-white flex items-center gap-2">
                    <span className="w-2 h-8 bg-gradient-to-b from-trine-orange to-trine-green rounded-full"></span>
                    Key Capabilities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.capabilities.map((capability, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-3 p-4 rounded-2xl bg-trine-green/5 border border-trine-green/20 hover:border-trine-green/40 hover:bg-trine-green/10 transition-all duration-300 hover:scale-105 transform"
                      >
                        <CheckCircle2 className="w-5 h-5 text-trine-green flex-shrink-0" />
                        <span className="text-trine-black dark:text-white font-medium">{capability}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools & Technologies */}
              {service.tools && service.tools.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-trine-black dark:text-white flex items-center gap-2">
                    <span className="w-2 h-8 bg-gradient-to-b from-trine-orange to-trine-lightblue rounded-full"></span>
                    Technologies & Tools
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {service.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-5 py-2.5 rounded-full bg-trine-orange/10 text-trine-orange border border-trine-orange/20 text-sm font-semibold hover:bg-trine-orange hover:text-white transition-all duration-300 hover:scale-105 transform cursor-default"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Consulting Form Section */}
      <section className="py-20 bg-gradient-to-br from-trine-black via-gray-900 to-trine-black relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-10 right-10 w-64 h-64 bg-trine-orange rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-trine-green rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-trine-orange/30 to-trine-green/30 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 animate-fade-in-up">
              <span className="inline-block px-4 py-2 rounded-full bg-trine-orange/10 border border-trine-orange/20 text-trine-orange text-sm font-medium mb-6">
                Let's Connect
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
                Ready to Get Started with{' '}
                <span className="bg-gradient-to-r from-trine-orange to-trine-green bg-clip-text text-transparent">
                  {service.title}
                </span>
                ?
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Tell us about your project and our experts will reach out to discuss how we can help transform your business.
              </p>
            </div>

            {/* Consulting Form */}
            <div className="glass-card bg-white/5 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/10 hover:border-trine-orange/40 transition-all duration-500 shadow-2xl shadow-trine-black/50 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {/* Service Context Header */}
              <div className="flex items-center gap-4 mb-10 p-5 rounded-2xl bg-gradient-to-r from-trine-orange/10 to-trine-green/5 border border-trine-orange/20 hover:border-trine-orange/40 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-trine-orange to-trine-green flex items-center justify-center shadow-lg shadow-trine-orange/20 group-hover:shadow-trine-orange/40 group-hover:scale-105 transition-all duration-300">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/60 font-medium">Service Inquiry</p>
                  <p className="text-xl font-bold text-white">{service.title}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-semibold mb-3 text-white/80 flex items-center gap-2 group-focus-within:text-trine-orange transition-colors duration-300">
                      <User className="w-4 h-4" />
                      Name <span className="text-trine-orange">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        className="w-full px-5 py-4 rounded-xl bg-white/5 border-2 border-white/10 text-white placeholder-white/40 outline-none focus:border-trine-orange focus:bg-white/10 focus:shadow-lg focus:shadow-trine-orange/10 hover:border-white/20 transition-all duration-300"
                        placeholder="Your full name"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-trine-orange to-trine-green opacity-0 group-focus-within:opacity-10 pointer-events-none transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-semibold mb-3 text-white/80 flex items-center gap-2 group-focus-within:text-trine-orange transition-colors duration-300">
                      <Mail className="w-4 h-4" />
                      Email <span className="text-trine-orange">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        className="w-full px-5 py-4 rounded-xl bg-white/5 border-2 border-white/10 text-white placeholder-white/40 outline-none focus:border-trine-orange focus:bg-white/10 focus:shadow-lg focus:shadow-trine-orange/10 hover:border-white/20 transition-all duration-300"
                        placeholder="your.email@company.com"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-trine-orange to-trine-green opacity-0 group-focus-within:opacity-10 pointer-events-none transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Company */}
                  <div className="group">
                    <label htmlFor="company" className="block text-sm font-semibold mb-3 text-white/80 flex items-center gap-2 group-focus-within:text-trine-green transition-colors duration-300">
                      <Building className="w-4 h-4" />
                      Company <span className="text-white/40 text-xs font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-5 py-4 rounded-xl bg-white/5 border-2 border-white/10 text-white placeholder-white/40 outline-none focus:border-trine-green focus:bg-white/10 focus:shadow-lg focus:shadow-trine-green/10 hover:border-white/20 transition-all duration-300"
                        placeholder="Your company name"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-trine-green to-trine-orange opacity-0 group-focus-within:opacity-10 pointer-events-none transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div className="group">
                    <label htmlFor="phone" className="block text-sm font-semibold mb-3 text-white/80 flex items-center gap-2 group-focus-within:text-trine-green transition-colors duration-300">
                      <Phone className="w-4 h-4" />
                      Phone <span className="text-white/40 text-xs font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-5 py-4 rounded-xl bg-white/5 border-2 border-white/10 text-white placeholder-white/40 outline-none focus:border-trine-green focus:bg-white/10 focus:shadow-lg focus:shadow-trine-green/10 hover:border-white/20 transition-all duration-300"
                        placeholder="+1 (555) 000-0000"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-trine-green to-trine-orange opacity-0 group-focus-within:opacity-10 pointer-events-none transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="group">
                  <label htmlFor="message" className="block text-sm font-semibold mb-3 text-white/80 flex items-center gap-2 group-focus-within:text-trine-orange transition-colors duration-300">
                    <MessageSquare className="w-4 h-4" />
                    Message <span className="text-trine-orange">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      rows={5}
                      className="w-full px-5 py-4 rounded-xl bg-white/5 border-2 border-white/10 text-white placeholder-white/40 outline-none focus:border-trine-orange focus:bg-white/10 focus:shadow-lg focus:shadow-trine-orange/10 hover:border-white/20 transition-all duration-300 resize-none"
                      placeholder={`Tell us about your ${service?.title?.toLowerCase() || 'service'} needs and goals...`}
                    ></textarea>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-trine-orange to-trine-green opacity-0 group-focus-within:opacity-10 pointer-events-none transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full relative px-8 py-5 bg-gradient-to-r from-trine-orange to-trine-green text-white rounded-xl font-bold text-lg overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 hover:shadow-2xl hover:shadow-trine-orange/30"
                  >
                    {/* Button Background Animation */}
                    <span className="absolute inset-0 bg-gradient-to-r from-trine-green to-trine-orange opacity-0 group-hover:opacity-100 group-disabled:opacity-0 transition-opacity duration-500"></span>
                    {/* Button Glow Effect */}
                    <span className="absolute -inset-1 bg-gradient-to-r from-trine-orange via-trine-green to-trine-orange opacity-0 group-hover:opacity-30 group-disabled:opacity-0 blur-xl transition-opacity duration-500"></span>
                    {/* Button Content */}
                    <span className="relative flex items-center justify-center gap-3">
                      {submitting ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Inquiry</span>
                          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                  </button>
                </div>

                {/* Privacy Notice */}
                <p className="text-center text-white/40 text-sm pt-2">
                  By submitting this form, you agree to our{' '}
                  <Link to="/privacy" className="text-trine-orange hover:text-trine-green transition-colors duration-300">Privacy Policy</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-trine-orange via-trine-orange/90 to-trine-green">
        <div className="container text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Explore Our Other Services
          </h2>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
            Discover how our comprehensive suite of solutions can help transform your entire business ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="btn-primary flex items-center space-x-2 bg-white text-trine-orange hover:bg-gray-100 hover:scale-105 transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
              <span>Contact Us</span>
            </Link>
            <Link
              to="/services"
              className="btn-secondary flex items-center space-x-2 bg-white/20 text-white border-white hover:bg-white/30 hover:scale-105 transition-all duration-300"
            >
              <span>View All Services</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
