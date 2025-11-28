import { useState, useEffect } from 'react';
import axios from 'axios';
import { Briefcase, MapPin, Clock, DollarSign, Users, Heart, Zap, Award, X, Upload, Loader2, Check, FileText, Link as LinkIcon, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    cover_letter: '',
    linkedin_url: '',
    portfolio_url: '',
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/jobs`);
      setJobs(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load job postings');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a PDF or DOC file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      setFormData({ ...formData, resume: file });
    }
  };

  const openApplicationModal = (job) => {
    setSelectedJob(job);
    setUploadProgress(0);
    setFormData({
      name: '',
      email: '',
      phone: '',
      resume: null,
      cover_letter: '',
      linkedin_url: '',
      portfolio_url: '',
    });
    setShowApplicationModal(true);
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    
    if (!formData.resume) {
      toast.error('Please upload your resume');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const submitData = new FormData();
      submitData.append('job_id', selectedJob.id);
      submitData.append('job_title', selectedJob.title);
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('resume', formData.resume);
      if (formData.cover_letter) submitData.append('cover_letter', formData.cover_letter);
      if (formData.linkedin_url) submitData.append('linkedin_url', formData.linkedin_url);
      if (formData.portfolio_url) submitData.append('portfolio_url', formData.portfolio_url);

      await axios.post(`${BACKEND_URL}/api/jobs/apply`, submitData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total && progressEvent.total > 0) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        },
      });

      setShowApplicationModal(false);
      setSelectedJob(null);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      const errorMessage = error.response?.data?.detail;
      toast.error(errorMessage || 'Failed to submit application. Please try again.');
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const departments = ['All', ...new Set(jobs.map(job => job.department))];
  const filteredPositions = selectedDepartment === 'All' ? jobs : jobs.filter(job => job.department === selectedDepartment);

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, mental health support, and fitness programs',
    },
    {
      icon: DollarSign,
      title: 'Competitive Compensation',
      description: 'Market-leading salaries, performance bonuses, and equity options',
    },
    {
      icon: Zap,
      title: 'Professional Growth',
      description: 'Continuous learning opportunities, certifications, and career development',
    },
    {
      icon: Award,
      title: 'Work-Life Balance',
      description: 'Flexible schedules, remote work options, and generous PTO',
    },
  ];

  const values = [
    {
      icon: Users,
      title: 'Collaborative Culture',
      description: 'Work with talented teams that value innovation and knowledge sharing',
    },
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'Be at the forefront of technology and digital transformation',
    },
    {
      icon: Heart,
      title: 'Impact Driven',
      description: 'Your work directly impacts Fortune 500 companies and their millions of users',
    },
  ];

  return (
    <div className="careers-page min-h-screen">
      {/* Hero Section - Premium Design */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-trine-black via-gray-900 to-trine-black">
        {/* Animated Background Elements - Respects prefers-reduced-motion */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-trine-orange/20 rounded-full blur-3xl motion-safe:animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-trine-green/15 rounded-full blur-3xl motion-safe:animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-trine-orange/10 to-trine-green/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8 motion-safe:animate-fade-in-down">
              <Sparkles className="w-4 h-4 text-trine-orange" />
              <span className="text-white/90 text-sm font-medium">We're Hiring!</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up" data-testid="careers-hero-title">
              <span className="text-white">Build Your </span>
              <span className="bg-gradient-to-r from-trine-orange via-trine-green to-trine-orange bg-clip-text text-transparent">
                Future
              </span>
              <span className="text-white"> with Us</span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-white/80 mb-10 max-w-3xl mx-auto animate-fade-in-up" data-testid="careers-hero-description" style={{ animationDelay: '0.2s' }}>
              Join a team of innovators shaping the future of digital transformation. 
              Your next career milestone starts here.
            </p>
            
            {/* Stats Row */}
            <div className="flex flex-wrap gap-6 md:gap-12 justify-center text-white animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/10 hover:border-trine-orange/50 transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 rounded-xl bg-trine-orange/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-trine-orange" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold">500+</p>
                  <p className="text-xs text-white/60">Team Members</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/10 hover:border-trine-green/50 transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 rounded-xl bg-trine-green/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-trine-green" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold">Global</p>
                  <p className="text-xs text-white/60">Offices Worldwide</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/10 hover:border-trine-orange/50 transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 rounded-xl bg-trine-orange/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-trine-orange" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold">Top 10</p>
                  <p className="text-xs text-white/60">Best Employer</p>
                </div>
              </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="mt-16 animate-bounce">
              <a href="#positions" className="inline-flex items-center gap-2 text-white/60 hover:text-trine-orange transition-colors">
                <span className="text-sm">Explore Positions</span>
                <ArrowRight className="w-4 h-4 rotate-90" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Premium Cards */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-trine-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-trine-green/5 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-trine-orange/10 text-trine-orange rounded-full text-sm font-semibold mb-4">PERKS & BENEFITS</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="benefits-title">
              <span className="bg-gradient-to-r from-trine-orange to-trine-green bg-clip-text text-transparent">Why Join Us</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Benefits that support your success and well-being</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl p-8 text-center border border-gray-100 hover:border-trine-orange/30 hover:shadow-xl hover:shadow-trine-orange/10 transition-all duration-500 hover:-translate-y-2"
                data-testid={`benefit-${index}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-trine-orange/10 to-trine-green/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-8 h-8 text-trine-orange" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-trine-black">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section - Clean Layout */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-trine-green/10 text-trine-green rounded-full text-sm font-semibold mb-4">OUR CULTURE</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="values-title">
              <span className="bg-gradient-to-r from-trine-green to-trine-orange bg-clip-text text-transparent">Our Values</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">The principles that guide everything we do</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-trine-green/30 hover:shadow-xl hover:shadow-trine-green/10 transition-all duration-500 hover:-translate-y-2"
                data-testid={`value-${index}`}
              >
                <div className="w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br from-trine-green/10 to-trine-orange/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-7 h-7 text-trine-green" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-trine-black">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="positions" className="py-20 md:py-28 bg-white relative">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-trine-orange/10 text-trine-orange rounded-full text-sm font-semibold mb-4">JOIN OUR TEAM</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="positions-title">
              <span className="bg-gradient-to-r from-trine-orange to-trine-green bg-clip-text text-transparent">Open Positions</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Find your next opportunity and take your career to new heights</p>
          </div>

          {/* Department Filter - Premium Pill Design */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                data-testid={`department-${dept.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  selectedDepartment === dept
                    ? 'bg-gradient-to-r from-trine-orange to-trine-green text-white shadow-lg shadow-trine-orange/25'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-trine-black'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Positions List - Premium Job Cards */}
          <div className="max-w-5xl mx-auto space-y-6">
            {loading ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-trine-orange border-t-transparent animate-spin"></div>
                <p className="text-lg text-gray-600">Loading amazing opportunities...</p>
              </div>
            ) : filteredPositions.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-3xl border border-gray-100">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <Briefcase className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No positions available</h3>
                <p className="text-gray-500">Check back soon for new opportunities!</p>
              </div>
            ) : (
              filteredPositions.map((position, index) => (
                <div 
                  key={position.id} 
                  className="group bg-white rounded-2xl p-6 md:p-8 border border-gray-100 hover:border-trine-orange/30 hover:shadow-xl hover:shadow-trine-orange/5 transition-all duration-500"
                  data-testid={`position-${index}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      {/* Job Title & Type Badge */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-xl md:text-2xl font-bold text-trine-black group-hover:text-trine-orange transition-colors">
                          {position.title}
                        </h3>
                        <span className="px-3 py-1 bg-trine-green/10 text-trine-green text-xs font-semibold rounded-full">
                          {position.type}
                        </span>
                      </div>
                      
                      {/* Description */}
                      <p className="text-gray-600 mb-5 line-clamp-2">{position.description}</p>
                      
                      {/* Meta Info Pills */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm">
                          <Briefcase className="w-4 h-4 text-trine-orange" />
                          <span className="text-gray-700">{position.department}</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm">
                          <MapPin className="w-4 h-4 text-trine-green" />
                          <span className="text-gray-700">{position.location}</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm">
                          <DollarSign className="w-4 h-4 text-trine-orange" />
                          <span className="text-gray-700">{position.salary}</span>
                        </div>
                      </div>

                      {/* Requirements & Responsibilities Preview */}
                      {(position.requirements?.length > 0 || position.responsibilities?.length > 0) && (
                        <div className="grid md:grid-cols-2 gap-6 pt-5 border-t border-gray-100">
                          {position.requirements?.length > 0 && (
                            <div>
                              <p className="font-semibold text-sm text-trine-black mb-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-trine-orange rounded-full"></span>
                                Key Requirements
                              </p>
                              <ul className="text-sm text-gray-600 space-y-2">
                                {position.requirements.slice(0, 3).map((req, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-trine-green flex-shrink-0 mt-0.5" />
                                    <span>{req}</span>
                                  </li>
                                ))}
                                {position.requirements.length > 3 && (
                                  <li className="text-xs text-trine-orange font-medium pl-6">
                                    +{position.requirements.length - 3} more requirements
                                  </li>
                                )}
                              </ul>
                            </div>
                          )}
                          {position.responsibilities?.length > 0 && (
                            <div>
                              <p className="font-semibold text-sm text-trine-black mb-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-trine-green rounded-full"></span>
                                Key Responsibilities
                              </p>
                              <ul className="text-sm text-gray-600 space-y-2">
                                {position.responsibilities.slice(0, 3).map((resp, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-trine-orange flex-shrink-0 mt-0.5" />
                                    <span>{resp}</span>
                                  </li>
                                ))}
                                {position.responsibilities.length > 3 && (
                                  <li className="text-xs text-trine-green font-medium pl-6">
                                    +{position.responsibilities.length - 3} more responsibilities
                                  </li>
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Apply Button */}
                    <button 
                      onClick={() => openApplicationModal(position)}
                      className="flex-shrink-0 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-trine-orange to-trine-green text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-trine-orange/25 transition-all duration-300 hover:scale-105 group-hover:translate-x-1" 
                      data-testid={`apply-btn-${index}`}
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {showApplicationModal && selectedJob && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 md:px-8 py-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center z-10">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-trine-black dark:text-white">Apply for Position</h2>
                <p className="text-trine-orange font-medium mt-1">{selectedJob.title}</p>
              </div>
              <button
                onClick={() => setShowApplicationModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                disabled={uploading}
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmitApplication} className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-5 mb-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Full Name <span className="text-trine-orange">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={uploading}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-trine-orange focus:ring-2 focus:ring-trine-orange/20 disabled:opacity-50 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email <span className="text-trine-orange">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={uploading}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-trine-orange focus:ring-2 focus:ring-trine-orange/20 disabled:opacity-50 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                
                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Phone <span className="text-trine-orange">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={uploading}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-trine-orange focus:ring-2 focus:ring-trine-orange/20 disabled:opacity-50 transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                {/* Resume Upload with Progress */}
                <div>
                  <label htmlFor="resume-upload" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Resume <span className="text-trine-orange">*</span>
                    <span className="text-gray-400 font-normal text-xs ml-1">(PDF/DOC, max 5MB)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileChange}
                      disabled={uploading}
                      className="hidden"
                      id="resume-upload"
                      aria-describedby="resume-validation-message"
                    />
                    <label
                      htmlFor="resume-upload"
                      className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
                        formData.resume 
                          ? 'border-trine-green bg-trine-green/5' 
                          : 'border-gray-200 dark:border-gray-600 hover:border-trine-orange hover:bg-trine-orange/5'
                      } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {formData.resume ? (
                        <>
                          <FileText className="w-5 h-5 text-trine-green" />
                          <span className="text-sm text-trine-green font-medium truncate max-w-[180px]">{formData.resume.name}</span>
                          <CheckCircle className="w-4 h-4 text-trine-green ml-auto" />
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-500">Click to upload resume</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>
                
                {/* LinkedIn URL */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    LinkedIn URL <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      name="linkedin_url"
                      value={formData.linkedin_url}
                      onChange={handleChange}
                      disabled={uploading}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-trine-orange focus:ring-2 focus:ring-trine-orange/20 disabled:opacity-50 transition-all"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>
                
                {/* Portfolio URL */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Portfolio URL <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      name="portfolio_url"
                      value={formData.portfolio_url}
                      onChange={handleChange}
                      disabled={uploading}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-trine-orange focus:ring-2 focus:ring-trine-orange/20 disabled:opacity-50 transition-all"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>
                
                {/* Cover Letter */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Cover Letter <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    name="cover_letter"
                    value={formData.cover_letter}
                    onChange={handleChange}
                    disabled={uploading}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-trine-orange focus:ring-2 focus:ring-trine-orange/20 resize-none disabled:opacity-50 transition-all"
                    placeholder="Tell us why you're a great fit for this position..."
                  />
                </div>
              </div>

              {/* Upload Progress Bar */}
              {uploading && (
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Uploading your application...</span>
                    <span className="text-sm font-bold text-trine-orange">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-trine-orange to-trine-green rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Please wait while we process your application</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-700">
                {!formData.resume && !uploading && (
                  <p id="resume-validation-message" role="alert" className="text-xs text-trine-orange self-center mr-auto">Please upload your resume to submit</p>
                )}
                <button
                  type="button"
                  onClick={() => setShowApplicationModal(false)}
                  disabled={uploading}
                  className="px-8 py-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-semibold text-gray-700 dark:text-gray-300 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || !formData.resume}
                  className="px-8 py-3 bg-gradient-to-r from-trine-orange to-trine-green text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-trine-orange/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  title={!formData.resume ? "Please upload your resume first" : "Submit your application"}
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting... {uploadProgress}%</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center animate-scale-in">
            {/* Success Icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-trine-green/20 to-trine-orange/20 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-trine-green to-trine-orange flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            
            {/* Success Message */}
            <h2 className="text-2xl font-bold text-trine-black dark:text-white mb-3">
              Application Submitted!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Thank you for applying! We will review your application and get back to you soon. 
              Keep an eye on your email for updates.
            </p>
            
            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
              <Sparkles className="w-5 h-5 text-trine-orange" />
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            </div>
            
            {/* Additional Info */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-6 text-left">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-trine-black dark:text-white">What's next?</span>
                <br />
                Our hiring team will review your profile and reach out within 5-7 business days if you're a good fit.
              </p>
            </div>
            
            {/* Close Button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full px-8 py-4 bg-gradient-to-r from-trine-orange to-trine-green text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-trine-orange/25 transition-all"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}

      {/* CTA Section - Premium Design */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-trine-black via-gray-900 to-trine-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-trine-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-trine-green/10 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white" data-testid="careers-cta-title">
              Don't See the{' '}
              <span className="bg-gradient-to-r from-trine-orange to-trine-green bg-clip-text text-transparent">Right Role?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for innovation. 
              Send us your resume and let's explore opportunities together.
            </p>
            <a 
              href="mailto:careers@trinesolutions.com" 
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-trine-orange to-trine-green text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-trine-orange/25 transition-all duration-300 hover:scale-105"
              data-testid="careers-cta-btn"
            >
              <span>Contact Our Team</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
