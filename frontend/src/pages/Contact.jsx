import { useState } from 'react';
import axios from 'axios';
import { MapPin, Phone, Mail, Send, Clock, Users, Target, Star } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
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
      description: 'We typically respond within 2 business hours',
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
      {/* Enhanced Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
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

        <div className="container relative z-10 text-center text-white">
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
          
          <h1 className="text-6xl lg:text-8xl font-black mb-8 animate-fade-in-up bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent" data-testid="contact-hero-title">
            Let's Build
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Something Great</span>
          </h1>
          
          <p className="text-xl lg:text-2xl max-w-4xl mx-auto mb-12 opacity-90 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Ready to transform your business? Let's discuss how our expertise can drive your digital transformation journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button 
              onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold hover:bg-cyan-50 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Send Message
            </button>
            <a 
              href="tel:+14252025165"
              className="px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-bold backdrop-blur-sm hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
            >
              Call Now
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100/50 to-gray-200/30 dark:via-gray-800/50 dark:to-gray-900/30"></div>
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
      <section id="contact-form" className="py-20 relative">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Enhanced Form */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-2xl border border-gray-200/50 dark:border-gray-700/50" data-testid="contact-form">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Send Message
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Fill out the form below and we'll get back to you within 2 hours
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        data-testid="contact-name-input"
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
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
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
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
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
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
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                      placeholder="Tell us about your project or inquiry..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={submitting}
                    data-testid="contact-submit-btn"
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 flex items-center justify-center space-x-3"
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
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                  <h2 className="text-4xl font-black mb-8 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    Our Office
                  </h2>
                  
                  <div className="space-y-8">
                    {/* Address */}
                    <div className="group/item flex items-start space-x-6 p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 cursor-pointer border border-transparent hover:border-cyan-500/20">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                        <MapPin className="w-7 h-7 text-cyan-500" />
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
                    <div className="group/item flex items-center space-x-6 p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 cursor-pointer border border-transparent hover:border-blue-500/20">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                        <Phone className="w-7 h-7 text-blue-500 group-hover/item:rotate-12 transition-all duration-300" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Phone</h3>
                        <a 
                          href="tel:+14252025165" 
                          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-lg font-semibold"
                        >
                          +1 (425) 202-5165
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="group/item flex items-center space-x-6 p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 cursor-pointer border border-transparent hover:border-purple-500/20">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                        <Mail className="w-7 h-7 text-purple-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Email</h3>
                        <a 
                          href="mailto:trine@trinesolutions.com" 
                          className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-lg font-semibold"
                        >
                          trine@trinesolutions.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700/50 dark:to-blue-900/20 border border-gray-200/50 dark:border-gray-600/50">
                    <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-white flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-500" />
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
                        <span className="font-semibold text-red-500">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="tel:+14252025165"
                  className="group relative p-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center font-semibold hover:shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300"
                >
                  <Phone className="w-5 h-5 inline-block mr-2" />
                  Call Now
                </a>
                <a 
                  href="mailto:trine@trinesolutions.com"
                  className="group relative p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
                >
                  <Mail className="w-5 h-5 inline-block mr-2" />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50/50 to-purple-50/30 dark:from-cyan-950/20 dark:via-blue-950/10 dark:to-purple-950/20"></div>
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl lg:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Visit Our Office
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Located in the heart of Bellevue's tech corridor, our office is designed for collaboration and innovation.
            </p>
          </div>

          {/* Enhanced Map Placeholder */}
          <div className="relative group rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20 z-10"></div>
            <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center relative">
              {/* Map Grid Pattern */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0" style={{
                  backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
                                   linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }}></div>
              </div>
              
              {/* Map Center Marker */}
              <div className="relative z-20 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mx-auto mb-4 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <div className="text-white bg-black/50 backdrop-blur-sm rounded-2xl p-6 inline-block">
                  <div className="text-2xl font-black mb-2">Trine Solutions</div>
                  <div className="text-sm opacity-90">14042 NE 8th Street, #201C</div>
                  <div className="text-sm opacity-90">Bellevue, WA 98007</div>
                </div>
              </div>

              {/* Interactive Map Elements */}
              <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;