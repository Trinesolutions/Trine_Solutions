import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ArrowRight, CheckCircle2, Mail, Phone } from 'lucide-react';
import { getIconByName } from '@/utils/serviceIcons';
import { getDefaultServiceImage } from '@/constants/defaultServices';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`${API}/services/${id}`);
        setService(response.data);
      } catch (err) {
        console.error('Error fetching service:', err);
        setError('Service not found');
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

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

  return (
    <div className="min-h-screen" data-testid="service-detail-page">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-trine-orange via-trine-orange/80 to-trine-lightblue"></div>
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-trine-green rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="container relative z-10 text-center text-white">
          <Link
            to="/services"
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Services</span>
          </Link>
          <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
            <Icon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in-up" data-testid="service-detail-title">
            {service.title}
          </h1>
          <p className="text-lg lg:text-xl max-w-3xl mx-auto opacity-95 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {service.description}
          </p>
        </div>
      </section>

      {/* Service Content */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Service Image */}
            <div className="glass-card p-4 rounded-3xl hover:border-trine-orange/30 transition-all duration-300">
              <img
                src={service.image || getDefaultServiceImage(parseInt(id, 10) || 0)}
                alt={service.title}
                className="rounded-2xl w-full h-[400px] object-cover"
              />
            </div>

            {/* Service Details */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-trine-black dark:text-white">
                About This Service
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {service.fullDescription || service.description}
              </p>

              {/* Capabilities */}
              {service.capabilities && service.capabilities.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-trine-black dark:text-white">
                    Key Capabilities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.capabilities.map((capability, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-3 p-3 rounded-xl bg-trine-green/5 border border-trine-green/20 hover:border-trine-green/40 transition-all duration-300"
                      >
                        <CheckCircle2 className="w-5 h-5 text-trine-green flex-shrink-0" />
                        <span className="text-trine-black dark:text-white">{capability}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools & Technologies */}
              {service.tools && service.tools.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-trine-black dark:text-white">
                    Technologies & Tools
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {service.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 rounded-full bg-trine-orange/10 text-trine-orange border border-trine-orange/20 text-sm font-medium hover:bg-trine-orange/20 transition-all duration-300"
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-trine-lightblue to-trine-green">
        <div className="container text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
            Let's discuss how our {service.title} services can help transform your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="btn-primary flex items-center space-x-2 bg-white text-trine-lightblue hover:bg-gray-100"
            >
              <Mail className="w-5 h-5" />
              <span>Contact Us</span>
            </Link>
            <Link
              to="/services"
              className="btn-secondary flex items-center space-x-2 bg-white/20 text-white border-white hover:bg-white/30"
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
