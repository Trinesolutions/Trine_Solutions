import { useState } from 'react';
import axios from 'axios';
import { MapPin, Phone, Mail, Send, Clock, Users, Target, Star } from 'lucide-react';
import { toast } from 'sonner';
import SEO, { pageSEO, structuredDataSchemas } from '@/components/SEO';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

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
      await axios.post(`${API}/contact`, formData);
      toast.success('Thank you! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const features = [
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'We typically respond within 24 business hours',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Get direct access to our senior consultants',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Target,
      title: 'Focused Solutions',
      description: 'Tailored strategies for your specific needs',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Star,
      title: 'Premium Support',
      description: 'Dedicated account management and support',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/20 dark:from-gray-900 dark:via-blue-950/30 dark:to-cyan-950/20" data-testid="contact-page">
      <SEO 
        {...pageSEO.contact}
        canonicalUrl="https://trinesolutions.com/contact"
        structuredData={structuredDataSchemas.localBusiness}
        breadcrumbs={[
          { name: 'Home', url: 'https://trinesolutions.com/' },
          { name: 'Contact Us', url: 'https://trinesolutions.com/contact' }
        ]}
      />
      {/* Enhanced Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-12 lg:pb-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/10 to-black/20"></div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left text-white">
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-8 animate-fade-in-up bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent" data-testid="contact-hero-title">
                Let's Build
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Something Great</span>
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto lg:mx-0 mb-12 opacity-90 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Ready to transform your business? Let's discuss how our expertise can drive your digital transformation journey.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <button 
                  onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold hover:bg-cyan-50 transform hover:scale-105 transition-all duration-300 shadow-2xl"
                >
                  Send Message
                </button>
                <a 
                  href="tel:+14252025165"
                  className="w-full sm:w-auto px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-bold backdrop-blur-sm hover:bg-white/10 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  Call Now
                </a>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative block mt-12 lg:mt-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
               <div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
                 <img 
                   src="/contact-img.svg" 
                   alt="Contact Us" 
                   className="w-full h-full object-contain drop-shadow-2xl transform scale-125"
                 />
               </div>
            </div>
          </div>
        </div>

      </section>

      {/* Features Section */}
      <section className="py-12 lg:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100/50 to-gray-200/30 dark:via-gray-800/50 dark:to-gray-900/30"></div>
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-8 text-center hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Icon */}
                  <div className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                    {feature.description}
                  </p>

                  {/* Hover Effect Border */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}>
                    <div className="absolute inset-[2px] rounded-3xl bg-white dark:bg-gray-800"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section id="contact-form" className="py-12 lg:py-20 relative bg-white dark:bg-gray-900">
        {/* Background overlay for better contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-green-500/10"></div>
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Enhanced Form */}
            <div className="relative group">
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-10 shadow-2xl border border-gray-200/50 dark:border-gray-700/50" data-testid="contact-form">
                <div className="text-center mb-8">
                  <h2 className="text-3xl lg:text-4xl font-black mb-4 bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text text-transparent">
                    Send Message
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Fill out the form below and we'll get back to you within 24 hours
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        data-testid="contact-name-input"
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-300"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        data-testid="contact-email-input"
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-300"
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      data-testid="contact-company-input"
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-300"
                      placeholder="Your company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      data-testid="contact-message-input"
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-300 resize-none"
                      placeholder="Tell us about your project or inquiry..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={submitting}
                    data-testid="contact-submit-btn"
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    {submitting ? (
                      <span>Processing...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Enhanced Contact Info */}
            <div className="space-y-8">
              {/* Single Location Card */}
              <div className="relative group">
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-10 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                  <h2 className="text-3xl lg:text-4xl font-black mb-8 bg-gradient-to-r from-green-500 to-orange-500 bg-clip-text text-transparent">
                    Our Office
                  </h2>
                  
                  <div className="space-y-8">
                    {/* Address */}
                    <div className="group/item flex items-start space-x-6 p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 cursor-pointer border border-transparent hover:border-orange-500/20">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-green-500/20 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                        <MapPin className="w-7 h-7 text-orange-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Headquarters</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          14042 NE 8th Street, #201C<br />
                          Bellevue, WA 98007
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="group/item flex items-center space-x-6 p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 cursor-pointer border border-transparent hover:border-green-500/20">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-orange-500/20 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                        <Phone className="w-7 h-7 text-green-500 group-hover/item:rotate-12 transition-all duration-300" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Phone</h3>
                        <a 
                          href="tel:+14252025165" 
                          className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors text-lg font-semibold"
                        >
                          +1 (425) 202-5165
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="group/item flex items-center space-x-6 p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 cursor-pointer border border-transparent hover:border-orange-500/20">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-green-500/20 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                        <Mail className="w-7 h-7 text-orange-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Email</h3>
                        <a 
                          href="mailto:trine@trinesolutions.com" 
                          className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors text-lg font-semibold"
                        >
                          trine@trinesolutions.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-700 dark:to-gray-800 border border-gray-200/50 dark:border-gray-600/50">
                    <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-white flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange-500" />
                      Office Hours
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span className="font-semibold">9:00 AM - 6:00 PM PST</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span className="font-semibold">10:00 AM - 2:00 PM PST</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span className="font-semibold text-gray-900 dark:text-white">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="tel:+14252025165"
                  className="group relative p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
                >
                  <Phone className="w-5 h-5 inline-block mr-2" />
                  Call Now
                </a>
                <a 
                  href="mailto:trine@trinesolutions.com"
                  className="group relative p-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-cyan-700 text-white text-center font-semibold hover:shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300"
                >
                  <Mail className="w-5 h-5 inline-block mr-2" />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Contact;